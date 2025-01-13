<script setup lang="ts">
import {
  isDark,
  isFullscreen,
  toggleDark,
  toggleFullscreen,
} from '~/composables'
import { useAppStore } from '~/store/modules/app'
import UserDropdown from './UserDropdown.vue'

defineOptions({
  name: 'LaHeader',
})

const appStore = useAppStore()

const headerButtons = [
  {
    icon: isFullscreen.value ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line',
    onClick: toggleFullscreen,
  },
  {
    icon: isDark.value ? 'ri:sun-line' : 'ri:moon-line',
    onClick: toggleDark,
  },
]
</script>

<template>
  <header class="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
    <el-button circle @click="appStore.toggleSidebar">
      <IconifyIconOnline icon="ri-menu-fill" width="18" />
    </el-button>
    <div class="flex items-center gap-2">
      <el-button
        v-for="(btn, index) in headerButtons"
        :key="index"
        circle
        @click="() => btn.onClick()"
      >
        <IconifyIconOnline :icon="btn.icon" width="18" />
      </el-button>
      <UserDropdown class="ml-3" />
    </div>
  </header>
</template>
