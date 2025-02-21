<script setup lang="ts">
import { useAppStore } from '~/store'

const appStore = useAppStore()
</script>

<template>
  <div>{{ appStore.getCopyright() }}{{ appStore.getForRecord() ? ` · ${appStore.getForRecord()}` : '' }}</div>
</template>
