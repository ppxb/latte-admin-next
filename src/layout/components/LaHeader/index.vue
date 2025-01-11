<script setup lang="ts">
import { isDark, isFullscreen, toggleDark, toggleFullscreen } from '~/composables'

defineOptions({
  name: 'LaHeader',
})
</script>

<template>
  <div class="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
    <div>123</div>
    <div class="flex items-center">
      <el-button
        circle
        class="!flex items-center justify-center"
        @click="toggleFullscreen"
      >
        <IconifyIconOnline :icon="isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'" width="18" />
      </el-button>
      <el-button
        class="!flex items-center justify-center"
        circle
        @click="toggleDark()"
      >
        <IconifyIconOnline :icon="isDark ? 'ri:sun-line' : 'ri:moon-line'" width="18" />
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-button {
 border: none;
}
</style>
