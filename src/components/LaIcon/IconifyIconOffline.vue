<script setup lang="ts">
import type { IconifyIcon as IconifyIconType } from '@iconify/vue'
import { addIcon, Icon as IconifyIcon } from '@iconify/vue/dist/offline'

defineOptions({
  name: 'IconifyIconOffline',
})

const props = defineProps<{
  icon: string | IconifyIconType
}>()

if (typeof props.icon === 'object') {
  addIcon(props.icon as unknown as string, props.icon)
}

const attrs = useAttrs()

const computedStyle = computed(() => ({
  outline: 'none',
  ...(attrs.style || {}),
}))
</script>

<template>
  <IconifyIcon
    :icon="icon"
    :aria-hidden="false"
    :style="computedStyle"
    v-bind="$attrs"
  />
</template>
