<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { isMobile } from '~/utils'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div
    v-if="!isMobile()"
    class="text-5 cursor-pointer text-[var(--text-color)]"
    :class="!isFullscreen ? 'i-lucide:maximize' : 'i-lucide:minimize'"
    @click="toggle"
  />
</template>
