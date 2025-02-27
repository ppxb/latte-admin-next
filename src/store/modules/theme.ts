import type { BasicColorSchema } from '@vueuse/core'
import { useColorMode, useCycleList } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { defineStore } from 'pinia'

import { getGenerateColors, getThemeOverrides } from '~/utils/theme'

function themeStore() {
  const defaultMode = ref<BasicColorSchema>('auto')

  const modeList = ref<BasicColorSchema[]>(['dark', 'light', 'auto'])

  const colorMode = useColorMode({
    initialValue: defaultMode.value,
    emitAuto: true,
  })

  const { state, next } = useCycleList(modeList, {
    initialValue: colorMode,
  })

  watch(state, () => {
    if (!modeList.value.includes(state.value)){
      state.value = defaultMode.value
    }
    colorMode.value = state.value
  }, {
    immediate: true,
  })

  const darkMode = computed(() => {
    const { system, store } = colorMode
    if (state.value === 'auto'){
      return system.value === 'dark'
    }
    return store.value === 'dark'
  })

  const themeConfig = ref<NTheme.Config>({
    primary: '#1677ff',
    info: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  })

  const theme = computed(() => darkMode.value ? darkTheme : null)

  const themeOverrides = computed(() => {
    return getThemeOverrides(themeConfig.value, darkMode.value)
  })

  const themeColors = computed(() => {
    const entries = Object.entries(themeConfig.value) as [
      NTheme.ColorType,
      string,
    ][]
    const colors = {} as Record<NTheme.ColorType, string[]>
    entries.forEach(([key, value]) => {
      colors[key] = getGenerateColors(value, darkMode.value)
    })
    return colors
  })

  const toggleDarkMode = () => {
    next()
  }

  const setThemeConfig = (config: NTheme.Config) => {
    themeConfig.value = {
      ...themeConfig.value,
      ...config,
    }
  }

  return {
    darkMode,
    themeConfig,
    theme,
    themeOverrides,
    themeColors,
    modeState: state,
    toggleDarkMode,
    setThemeConfig,
  }
}

export const useThemeStore = defineStore('theme', themeStore, { persist: true })
