<script setup lang="ts">
import type { SelectOption } from 'naive-ui'

defineOptions({
  name: 'ToggleLanguage',
})

type Language = 'zh-cn' | 'en'

const selectedLanguage = ref<Language>('zh-cn')

const LANGUAGE_CONFIG = {
  'zh-cn': {
    label: '中文',
    icon: 'cn',
  },
  'en': {
    label: '英语',
    icon: 'en',
  },
} as const

const options: SelectOption[] = Object.entries(LANGUAGE_CONFIG).map(([value, { label }]) => ({ label, value }))

function renderLabel(option: SelectOption) {
  const icon = LANGUAGE_CONFIG[option.value as Language].icon

  return h('div', {
    class: 'flex items-center gap-2 mr-4',
  }, [
    h('div', {
      class: `i-circle-flags:${icon} text-[14px]`,
    }),
    option.label as string,
  ])
}

function handleLanguageChange() {
  window.$message?.info(selectedLanguage.value)
}
</script>

<template>
  <n-popselect
    v-model:value="selectedLanguage"
    trigger="hover"
    :options="options"
    :render-label="renderLabel"
    @update:value="handleLanguageChange"
  >
    <div class="i-lucide:languages text-5 cursor-pointer text-[var(--text-color)]" />
  </n-popselect>
</template>
