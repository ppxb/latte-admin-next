<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { useDevice } from '~/hooks/use-device'
import { useAppStore, useRouteStore } from '~/store'
import { renderIcon } from '~/utils'
import { isExternal } from '~/utils/validate'

defineOptions({
  name: 'LayoutSidebarMenu',
})

const props = withDefaults(defineProps<Props>(), {})

interface Props{
  menus?: RouteRecordRaw[]
  menuStyle?: CSSProperties
}

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const { isDesktop } = useDevice()

const selectedKeyRef = ref(route.path)

const sidebarRoutes = computed(() => props.menus ?? routeStore.routes)

function generateOptions(): MenuOption[] {
  const createOptions = (routes: RouteRecordRaw[]): MenuOption[] => {
    return routes.map(route => {
      if (route.meta?.hidden){
        return null
      }
      const options: MenuOption = {
        label: route.meta?.title || route.name,
        key: route.path,
        icon: renderIcon(route.meta?.icon),
      }
      if (route.children) {
        options.children = createOptions(route.children)
      }
      if (options.children?.length === 0){
        delete options.children
      }
      return options
    }).filter(Boolean) as MenuOption[]
  }
  return createOptions(sidebarRoutes.value)
}

function handleMenuClick(key: string) {
  if (isExternal(key)){
    return window.open(key)
  }
  selectedKeyRef.value = key
  router.push({ path: key })
}
</script>

<template>
  <n-scrollbar
    class="max-h-[calc(100vh-80px)] transition-all"
    :class="appStore.menuCollapse ? '' : 'p-2'"
  >
    <n-menu
      :value="selectedKeyRef"
      :collapsed="!isDesktop ? false : appStore.menuCollapse"
      :collapsed-width="64"
      :collapsed-icon-size="24"
      :root-indent="18"
      :options="generateOptions()"
      accordion
      @update:value="handleMenuClick"
    />
  </n-scrollbar>
</template>
