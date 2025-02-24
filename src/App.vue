<script setup lang="ts">
import { useAppStore, useThemeStore } from '~/store'

const appStore = useAppStore()
const themeStore = useThemeStore()

onMounted(appStore.initSiteConfig)
</script>

<template>
  <NConfigProvider :theme-overrides="themeStore.theme">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>
