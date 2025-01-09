import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { defaultRoutes, staticRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...defaultRoutes, ...staticRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app: App) {
  app.use(router)

  await router.isReady()
}

export default router
