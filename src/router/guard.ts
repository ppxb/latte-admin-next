import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { useTitle } from '@vueuse/core'

import { useAppStore, useRouteStore, useUserStore } from '~/store'
import { getToken } from '~/utils/auth'
import { isHttp } from '~/utils/validate'

const WHITE_LIST = ['/login', '/social/callback', '/pwdExpired']

const DEFAULT_PATH = '/'

const LOGIN_PATH = '/login'

const PWD_EXPIRED_PATH = '/pwdExpired'

let hasInitializedRoutes = false

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    window.$loadingBar?.start()

    const updateDocumentTitle = () => {
      const appStore = useAppStore()
      const title = to.meta.title as string
      const appName = appStore.getTitle()

      useTitle(title ? `${title} - ${appName}` : appName)
    }

    try {
      updateDocumentTitle()
      await resolveRoute(to, next, router)
    }
    catch (error) {
      console.error('Route error:', error)
      next(LOGIN_PATH)
    }
  })

  router.afterEach(() => {
    window.$loadingBar?.finish()
  })
}

async function resolveRoute(to: RouteLocationNormalized, next: NavigationGuardNext, router: Router) {
  if (WHITE_LIST.includes(to.path)) {
    next()
    return
  }

  const token = getToken()

  if (token && to.path === LOGIN_PATH) {
    next(DEFAULT_PATH)
    return
  }

  if (!token) {
    next({ path: LOGIN_PATH, query: { redirect: to.fullPath } })
    return
  }

  if (!hasInitializedRoutes) {
    try {
      const userStore = useUserStore()
      const routeStore = useRouteStore()

      await userStore.getUserInfo()

      if (userStore.userInfo.pwdExpired && to.path !== PWD_EXPIRED_PATH) {
        window.$message?.warning('密码已过期，请修改密码')
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

export function resetHasInitializedRoutes() {
  hasInitializedRoutes = false
}
