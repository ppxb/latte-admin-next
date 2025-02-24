import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('~/layout/index.vue')

export const systemRoutes: RouteRecordRaw[] = [
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
    meta: { title: '仪表盘', icon: 'carbon:Dashboard', hidden: false },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        component: () => import('~/views/dashboard/workplace/index.vue'),
        meta: { title: '工作台', icon: 'carbon:DataTable', hidden: false, affix: true },
      },
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        component: () => import('~/views/dashboard/analysis/index.vue'),
        meta: { title: '分析页', icon: 'carbon:ChartLineData', hidden: false },
      },
    ],
  },
  {
    path: '/social/callback',
    component: () => import('~/views/login/social/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/setting/profile',
        name: 'SettingProfile',
        component: () => import('~/views/setting/profile/index.vue'),
        meta: { title: '个人中心', showInTabs: false },
      },
      {
        path: '/setting/message',
        name: 'SettingMessage',
        component: () => import('~/views/setting/message/index.vue'),
        meta: { title: '消息中心', showInTabs: false },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    meta: { title: '关于项目', icon: 'carbon:Notebook', hidden: false, sort: 999 },
    children: [
      {
        path: 'https://github.com/ppxb/latte-starter',
        meta: { title: 'Latte Starter', icon: 'carbon:LogoGithub', hidden: false },
        redirect: '',
      },
      {
        path: 'https://github.com/ppxb/latte-admin',
        meta: { title: 'Latte Admin', icon: 'carbon:LogoGithub', hidden: false },
        redirect: '',
      },
      {
        path: 'https://github.com/ppxb/latte-admin-ui',
        meta: { title: 'Latte Admin UI', icon: 'carbon:LogoGithub', hidden: false },
        redirect: '',
      },
    ],
  },
]

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('~/views/default/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('~/views/default/error/404.vue'),
    meta: { hidden: true },
  },
]
