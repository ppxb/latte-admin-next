import { useEventListener, usePreferredColorScheme } from '@vueuse/core'
import { defineStore } from 'pinia'

import { SetupStoreId } from '~/enum'
import { getPaletteColorByNumber } from '~/theme/color'
import { localStg } from '~/utils/storage'
import {
  addThemeVarsToGlobal,
  createThemeToken,
  getNaiveTheme,
  initThemeSettings,
  toggleAuxiliaryColorModes,
  toggleCssDarkMode,
} from './helper'

function themeStore() {
  const scope = effectScope()
  const osTheme = usePreferredColorScheme()

  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings())

  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto'){
      return osTheme.value === 'dark'
    }
    return settings.value.themeScheme === 'dark'
  })

  const grayscaleMode = computed(() => settings.value.grayscale)

  const colorWeaknessMode = computed(() => settings.value.colorWeakness)

  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info,
    }
    return colors
  })

  const naiveTheme = computed(() => getNaiveTheme(themeColors.value, settings.value.recommendColor))

  const settingsJson = computed(() => JSON.stringify(settings.value))

  const resetStore = () => {
    const themeStore = useThemeStore()
    themeStore.$reset()
  }

  const setThemeScheme = (themeScheme: UnionKey.ThemeScheme) => {
    settings.value.themeScheme = themeScheme
  }

  const setGrayscale = (isGrayscale: boolean) => {
    settings.value.grayscale = isGrayscale
  }

  const setColorWeakness = (isColorWeakness: boolean) => {
    settings.value.colorWeakness = isColorWeakness
  }

  const toggleThemeScheme = () => {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto']
    const index = themeSchemes.findIndex(item => item === settings.value.themeScheme)
    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1
    const nextThemeScheme = themeSchemes[nextIndex]

    setThemeScheme(nextThemeScheme)
  }

  const updateThemeColors = (key: App.Theme.ThemeColorKey, color: string) => {
    let colorValue = color

    if (settings.value.recommendColor){
      colorValue = getPaletteColorByNumber(color, 500, true)
    }

    if (key === 'primary'){
      settings.value.themeColor = colorValue
    }
    else {
      settings.value.otherColor[key] = colorValue
    }
  }

  const setThemeLayout = (mode: UnionKey.ThemeLayoutMode) => {
    settings.value.layout.mode = mode
  }

  const setupThemeVarsToGlobal = () => {
    const { themeTokens, darkThemeTokens } = createThemeToken(
      themeColors.value,
      settings.value.tokens,
      settings.value.recommendColor,
    )
    addThemeVarsToGlobal(themeTokens, darkThemeTokens)
  }

  const setLayoutReverseHorizontalMix = (reverse: boolean) => {
    settings.value.layout.reverseHorizontalMix = reverse
  }

  const cacheThemeSettings = () => {
    const isProd = import.meta.env.PROD

    if (!isProd){
      return
    }

    localStg.set('themeSettings', settings.value)
  }

  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings()
  })

  scope.run(() => {
    watch(darkMode, val => {
      toggleCssDarkMode(val)
      localStg.set('darkMode', val)
    }, {
      immediate: true,
    })

    watch([grayscaleMode, colorWeaknessMode], val => {
      toggleAuxiliaryColorModes(val[0], val[1])
    }, {
      immediate: true,
    })

    watch(themeColors, val => {
      setupThemeVarsToGlobal()
      localStg.set('themeColor', val.primary)
    }, {
      immediate: true,
    })
  })

  onScopeDispose(scope.stop)

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    settingsJson,
    setGrayscale,
    setColorWeakness,
    resetStore,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    setThemeLayout,
    setLayoutReverseHorizontalMix,
  }
}

export const useThemeStore = defineStore(SetupStoreId.Theme, themeStore)
