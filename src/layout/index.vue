<script setup lang="ts">
import { useAppStore } from '~/store'

import LayoutBase from './layout-base.vue'
import LayoutMix from './layout-mix.vue'

defineOptions({
  name: 'Layout',
})

const appStore = useAppStore()
const currentLayout = computed(() => appStore.layout === 'base' ? LayoutBase : LayoutMix)
</script>

<template>
  <component :is="currentLayout" />
</template>
