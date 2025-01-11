import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('~/layout/index.vue')

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/workplace',
    meta: {
      title: '仪表盘',
      icon: 'dashboard',
      hidden: false,
    },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        component: () => import('~/views/dashboard/workplace/index.vue'),
        meta: {
          title: '工作台',
          icon: 'desktop',
          hidden: false,
          affix: true,
        },
      },
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        component: () => import('~/views/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
          icon: 'insert-chart',
          hidden: false,
        },
      },
    ],
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
