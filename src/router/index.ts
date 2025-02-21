import { createRouter, createWebHistory } from 'vue-router'

import { useRouteStore } from '~/store'
import { setupRouterGuard } from './guard'
import { constantRoutes, systemRoutes } from './route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...systemRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupRouterGuard(router)

export function resetRouter() {
  try {
    const routeStore = useRouteStore()
    routeStore.asyncRoutes.forEach(route => {
      const { name } = route
      if (name){
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  }
  catch (error) {
    console.log(error)
    window.location.reload()
  }
}

export default router
