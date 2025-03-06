<script setup lang="ts">
import { createTextVNode } from 'vue'

defineOptions({
  name: 'AppProvider',
})

const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup: () => {
    const registerUIUtils = () => {
      window.$loadingBar = useLoadingBar()
      window.$dialog = useDialog()
      window.$message = useMessage()
      window.$notification = useNotification()
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
