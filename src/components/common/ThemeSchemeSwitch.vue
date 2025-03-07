<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui'

import { $t } from '~/locales'

defineOptions({
  name: 'ThemeSchemeSwitch',
})

const props = withDefaults(defineProps<{
  themeScheme: UnionKey.ThemeScheme
  showTooltip?: boolean
  tooltipPlacement?: PopoverPlacement
}>(), {
  showTooltip: true,
  tooltipPlacement: 'bottom',
})

const emit = defineEmits<{
  (e: 'switch'): void
}>()

function handleSwitch() {
  emit('switch')
}

const icons: Record<UnionKey.ThemeScheme, string> = {
  light: 'lucide:moon',
  dark: 'lucide:sun',
  auto: 'lucide:laptop',
}

const icon = computed(() => icons[props.themeScheme])

const tooltipContent = computed(() => {
  if (!props.showTooltip){
    return ''
  }
  return $t('icon.themeScheme')
})
</script>

<template>
  <NTooltip :placement="tooltipPlacement" trigger="hover">
    <template #trigger>
      <NIcon :size="19" class="cursor-pointer" @click="handleSwitch">
        <SvgIcon :icon="icon" />
      </NIcon>
    </template>
    {{ tooltipContent }}
  </NTooltip>
</template>
