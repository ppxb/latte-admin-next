<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { naiveDateLocales, naiveLocales } from '~/locales/naive'
import { useAppStore, useThemeStore } from '~/store'

const appStore = useAppStore()
const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)

const naiveDarkTheme = computed(() => themeStore.darkMode ? darkTheme : undefined)

const locale = computed(() => {
  return naiveLocales[appStore.locale]
})

const dateLocale = computed(() => {
  return naiveDateLocales[appStore.locale]
})

onMounted(appStore.initSiteConfig)
</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="naiveDarkTheme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>
