import type { RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
]

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('~/views/error/404.vue'),
    meta: {
      hidden: true,
    },
  },
]
