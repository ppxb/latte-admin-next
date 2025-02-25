<script setup lang="ts">
import ToggleTheme from '~/components/common/toggle-theme.vue'
import { useAppStore } from '~/store'

import Fullscreen from './components/fullscreen.vue'
import UserDropdown from './components/user-dropdown.vue'
import Search from './components/search.vue'

defineOptions({
  name: 'LayoutHeader',
})

const appStore = useAppStore()

function handleMenuCollapse() {
  appStore.menuCollapse = !appStore.menuCollapse
}
</script>

<template>
  <n-layout-header class="sticky top-0 left-0 flex items-center justify-between px-10 h-20 z-[1000] bg-transparent backdrop-blur-[10px]">
    <div>
      <div class="h-full flex items-center" @click="handleMenuCollapse">
        <div class="i-ic:outline-data-saver-off w-6 h-6 cursor-pointer text-[var(--icon-color)] transition-colors hover:text-[--text-color] dark:hover:text-white" />
      </div>
    </div>
    <div class="flex items-center bg-[var(--bg-sidebar-color)] border border-solid border-[var(--border-color)] rounded-[50px] p-[6px] gap-[14px] ">
      <Search />
      <ToggleLanguage />
      <Fullscreen />
      <ToggleTheme />
      <UserDropdown />
    </div>
  </n-layout-header>
</template>
