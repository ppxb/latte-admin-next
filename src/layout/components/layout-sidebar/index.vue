<script setup lang="ts">
import { useDevice } from '~/hooks/use-device'

import Logo from './components/logo.vue'
import LayoutSidebarMenu from './components/menu.vue'

defineOptions({
  name: 'LayoutSidebar',
})

const { isDesktop } = useDevice()
</script>

<template>
  <div
    v-if="isDesktop"
    class="fixed top-0 left-0 h-screen overflow-x-hidden overflow-y-auto bg-[var(--bg-sidebar-color)] z-1001"
  >
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      :width="300"
      content-class="bg-[var(--bg-sidebar-color)] h-screen"
    >
      <Logo />
      <LayoutSidebarMenu />
    </n-layout-sider>
  </div>
</template>

<style scoped>

</style>
