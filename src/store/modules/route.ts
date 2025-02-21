import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep, omit } from 'lodash-es'
import { defineStore } from 'pinia'
import { mapTree, toTreeArray } from 'xe-utils'

import { getUserRoute } from '~/apis'
import { asyncRouteModules } from '~/router/async-modules'
import { constantRoutes, systemRoutes } from '~/router/route'
import { transformPathToName } from '~/utils/transform'

const layoutComponentMap = {
  Layout: () => import('~/layout/index.vue'),
}

function transformComponentView(component: string) {
  return layoutComponentMap[component as keyof typeof layoutComponentMap] || asyncRouteModules[component]
}

function formatAsyncRoutes(menus: Api.RouteItem[]) {
  if (!menus.length){
    return []
  }

  const pathMap = new Map()
  return mapTree(menus, (item) => {
    pathMap.set(item.id, item.path)

    if (item.children?.length) {
      item.children.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0))
    }

    return {
      path: item.path,
      name: item.name ?? transformPathToName(item.path),
      component: transformComponentView(item.component),
      redirect: item.redirect,
      meta: {
        title: item.title,
        hidden: item.isHidden,
        keepAlive: item.isCache,
        icon: item.icon,
        showInTabs: item.showInTabs,
        activeMenu: item.parentId && item.type === 2 && item.permission
          ? pathMap.get(item.parentId)
          : undefined,
      },
    }
  }) as unknown as RouteRecordRaw[]
}

export function isMultipleRoute(route: RouteRecordRaw) {
  return route.children?.some(child => child.children?.length) ?? false
}

export function flatMultiLevelRoutes(routes: RouteRecordRaw[]) {
  return cloneDeep(routes).map(route => {
    if (!isMultipleRoute(route)) {
      return route
    }

    return {
      ...route,
      children: toTreeArray(route.children).map(item => omit(item, 'children')) as RouteRecordRaw[],
    }
  })
}

function routeStore() {
  const routes = ref<RouteRecordRaw[]>([])
  const asyncRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (data: RouteRecordRaw[]) => {
    routes.value = [...constantRoutes, ...systemRoutes]
      .concat(data)
      .sort((a, b) => (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0))
    asyncRoutes.value = data
  }

  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    const { data } = await getUserRoute()
    const asyncRoutes = formatAsyncRoutes(data)
    const flatRoutes = flatMultiLevelRoutes(cloneDeep(asyncRoutes))
    setRoutes(asyncRoutes)
    return flatRoutes
  }

  return {
    routes,
    asyncRoutes,
    generateRoutes,
  }
}

export const useRouteStore = defineStore('route', routeStore, { persist: true })
