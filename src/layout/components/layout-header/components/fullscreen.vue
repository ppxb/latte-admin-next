<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <n-icon :size="19" class="hidden lg:block cursor-pointer" @click="toggle">
    <SvgIcon :icon="!isFullscreen ? 'lucide:maximize' : 'lucide:minimize'" />
  </n-icon>
</template>
