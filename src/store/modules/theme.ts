import type { GlobalThemeOverrides } from 'naive-ui'
import { defineStore } from 'pinia'

function themeStore() {
  const theme = reactive<GlobalThemeOverrides>({
    common: {
      primaryColor: '#00e099',
    },
    Menu: {
      itemColorHover: 'rgba(221, 224, 225, 0.5)',
    },
  })

  const setPrimaryColor = (color: string) => {
    theme.common!.primaryColor = color
  }

  return {
    theme,
    setPrimaryColor,
  }
}

export const useThemeStore = defineStore('theme', themeStore, { persist: true })
