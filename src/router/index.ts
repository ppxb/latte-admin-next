import { createRouter, createWebHistory } from 'vue-router'

import { systemRoutes } from './route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...systemRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
