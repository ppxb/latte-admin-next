<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div
    class="hidden lg:block text-5 cursor-pointer text-[var(--text-color)]"
    :class="!isFullscreen ? 'i-lucide:maximize' : 'i-lucide:minimize'"
    @click="toggle"
  />
</template>
