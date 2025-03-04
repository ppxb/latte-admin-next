<script setup lang="tsx">
import type { SelectOption } from 'naive-ui'
import { NIcon } from 'naive-ui'

import SvgIcon from '~/components/common/svg-icon.vue'

defineOptions({
  name: 'ToggleLanguage',
})

type Language = 'zh-cn' | 'en'

const selectedLanguage = ref<Language>('zh-cn')

const LANGUAGE_CONFIG = {
  'zh-cn': {
    label: '中文',
    icon: 'circle-flags:cn',
  },
  'en': {
    label: '英语',
    icon: 'circle-flags:en',
  },
} as const

const options: SelectOption[] = Object.entries(LANGUAGE_CONFIG).map(([value, { label }]) => ({ label, value }))

function renderLabel(option: SelectOption) {
  const icon = LANGUAGE_CONFIG[option.value as Language].icon

  return (
    <div class="flex items-center gap-2 mr-4">
      <NIcon size={14}>
        <SvgIcon icon={icon} />
      </NIcon>
      <span>{option.label}</span>
    </div>
  )
}

function handleLanguageChange() {
  window.$message?.info(selectedLanguage.value)
}
</script>

<template>
  <n-popselect
    v-model:value="selectedLanguage"
    trigger="click"
    :options="options"
    :render-label="renderLabel"
    @update:value="handleLanguageChange"
  >
    <NIcon :size="19" class="cursor-pointer">
      <SvgIcon icon="lucide:languages" />
    </NIcon>
  </n-popselect>
</template>
