<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useAppStore, useThemeStore } from '~/store'

const appStore = useAppStore()
const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)

onMounted(appStore.initSiteConfig)
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>
