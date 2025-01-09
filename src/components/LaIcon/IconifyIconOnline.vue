<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { computed } from 'vue'

defineOptions({
  name: 'IconifyIconOnline',
})

defineProps({
  icon: {
    type: String,
    default: '',
  },
})

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
