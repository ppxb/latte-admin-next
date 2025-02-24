<script setup lang="ts">
import { useAppStore } from '~/store'

defineOptions({
  name: 'Logo',
})

const appStore = useAppStore()

const title = computed(() => appStore.getTitle())
const logo = computed(() => appStore.getLogo())

function handleCollapse(isCollapsed: boolean) {
  appStore.menuCollapse = isCollapsed
}
</script>

<template>
  <div class="px-7 transition-all">
    <div class="flex items-center justify-between h-20 min-h-20 gap-4">
      <div class="flex grow">
        <div>
          <img :src="logo || '/logo.svg'" alt="logo" class="max-h-8 block h-full">
        </div>
      </div>
      <div class="h-full flex items-center">
        <div class="i-ic:outline-data-saver-off w-6 h-6 cursor-pointer text-[var(--icon-color)] transition-colors hover:text-black dark:hover:text-white" />
      </div>
    </div>
  </div>
</template>
