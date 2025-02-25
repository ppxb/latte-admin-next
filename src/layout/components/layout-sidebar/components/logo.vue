<script setup lang="ts">
import { useAppStore } from '~/store'

defineOptions({
  name: 'Logo',
})

const appStore = useAppStore()

const title = computed(() => appStore.getTitle())
const logo = computed(() => appStore.getLogo())
const isCollapsed = computed(() => appStore.menuCollapse)
</script>

<template>
  <div class="flex items-center h-20 min-h-20" :class="isCollapsed ? 'px-2' : 'px-7'">
    <div class="flex grow" :class="isCollapsed ? 'justify-center' : ''">
      <div class="flex items-center gap-4">
        <img :src="logo || '/logo.svg'" alt="logo" class="max-h-8 block h-full">
        <span
          v-if="!isCollapsed"
          class="truncate text-xl font-semibold"
        >
          {{ title }}
        </span>
      </div>
    </div>
  </div>
</template>
