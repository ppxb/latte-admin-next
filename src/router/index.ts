import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { useRouteStore } from '~/store/modules/route'
import { defaultRoutes, staticRoutes } from './routes'
import { setupRouterGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...defaultRoutes, ...staticRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function resetRouter() {
  const { asyncRoutes } = useRouteStore()
  asyncRoutes.forEach(route => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export async function setupRouter(app: App) {
  setupRouterGuard(router)

  app.use(router)

  await router.isReady()
}

export default router
