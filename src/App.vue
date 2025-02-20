<script setup lang="ts">
import { useAppStore } from '~/store'

const appStore = useAppStore()

onMounted(appStore.initSiteConfig)
</script>

<template>
  <NConfigProvider>
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>
