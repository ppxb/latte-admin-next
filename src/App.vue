<script setup lang="ts">
import type { WatermarkProps } from 'naive-ui'
import { darkTheme, NWatermark } from 'naive-ui'

import { naiveDateLocales, naiveLocales } from '~/locales/naive'
import { useAppStore, useThemeStore } from '~/store'

const appStore = useAppStore()
const themeStore = useThemeStore()

const naiveDarkTheme = computed(() => themeStore.darkMode ? darkTheme : undefined)

const locale = computed(() => {
  return naiveLocales[appStore.locale]
})

const dateLocale = computed(() => {
  return naiveDateLocales[appStore.locale]
})

const watermarkProps = computed<WatermarkProps>(() => ({
  content: themeStore.watermark.text,
  cross: true,
  fullscreen: true,
  fontSize: 16,
  lineHeight: 16,
  width: 384,
  height: 384,
  xOffset: 12,
  yOffset: 60,
  rotate: -15,
  zIndex: 9999,
}))

onMounted(appStore.initSiteConfig)
</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <AppProvider>
      <RouterView />
      <NWatermark v-if="themeStore.watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>
