<script setup lang="ts">
import { useDevice } from '~/hooks/use-device'
import { useAppStore } from '~/store'

import Logo from './components/logo.vue'
import LayoutSidebarMenu from './components/menu.vue'

defineOptions({
  name: 'LayoutSidebar',
})

const { isDesktop } = useDevice()
const appStore = useAppStore()

const isCollapse = computed(() => appStore.menuCollapse)
</script>

<template>
  <div
    v-if="isDesktop"
    class="h-screen overflow-x-hidden overflow-y-auto bg-[var(--bg-sidebar-color)] z-1001"
  >
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      :collapsed="isCollapse"
      :width="300"
      content-class="bg-[var(--bg-sidebar-color)] h-screen"
    >
      <Logo />
      <LayoutSidebarMenu />
    </n-layout-sider>
  </div>
</template>
