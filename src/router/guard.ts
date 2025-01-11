import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { message } from '~/composables'
import { useRouteStore } from '~/store/modules/route'
import { useUserStore } from '~/store/modules/user'
import { getToken } from '~/utils/auth'
import { isHttp } from '~/utils/validate'

NProgress.configure({
  easing: 'ease',
  showSpinner: false,
  speed: 500,
})

const WHITE_LIST = ['/login', '/social/callback', '/pwdExpired']

const LOGIN_PATH = '/login'

const PWD_EXPIRED_PATH = '/pwdExpired'

let hasInitializedRoutes = false

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    NProgress.start()

    try {
      await resolveRoutes(to, next, router)
    }
    catch (error) {
      console.error('Route error:', error)
      next(LOGIN_PATH)
    }
    finally {
      NProgress.done()
    }
  })
}

async function resolveRoutes(
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router,
) {
  if (WHITE_LIST.includes(to.path)) {
    next()
    return
  }

  const token = getToken()
  if (!token) {
    next(LOGIN_PATH)
    return
  }

  if (to.path === LOGIN_PATH) {
    next()
    return
  }

  if (!hasInitializedRoutes) {
    try {
      const userStore = useUserStore()
      const routeStore = useRouteStore()

      await userStore.getUserInfo()
      if (userStore.userInfo.pwdExpired && to.path !== PWD_EXPIRED_PATH) {
        message({ msg: '密码已过期，请修改密码', type: 'warning' })
        next(PWD_EXPIRED_PATH)
        return
      }

      const accessRoutes = await routeStore.generateRoutes()
      accessRoutes
        .filter(route => !isHttp(route.path))
        .forEach(route => router.addRoute(route))

      hasInitializedRoutes = true
      next({ ...to, replace: true })
      return
    }
    catch (error) {
      console.error('Route generation error:', error)
      next(LOGIN_PATH)
      return
    }
  }
  next()
}

export function resetHasRouteFlag() {
  hasInitializedRoutes = false
}
