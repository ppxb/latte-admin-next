<script setup lang="ts">
import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { createTextVNode } from 'vue'

import { useThemeStore } from '~/store'

defineOptions({
  name: 'AppProvider',
})

const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup: () => {
    const themeStore = useThemeStore()
    const { theme, themeOverrides } = storeToRefs(themeStore)
    const configProviderProps = computed<ConfigProviderProps>(() => {
      return {
        theme: theme.value,
        themeOverrides: themeOverrides.value,
      }
    })

    const { message, dialog, notification, loadingBar } = createDiscreteApi(
      ['message', 'dialog', 'notification', 'loadingBar'],
      { configProviderProps },
    )

    const registerUIUtils = () => {
      window.$loadingBar = loadingBar
      window.$dialog = dialog
      window.$message = message
      window.$notification = notification
    }

    registerUIUtils()

    return () => createTextVNode()
  },
})
</script>

<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <ContextHolder />
          <slot />
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>
