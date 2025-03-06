import type { GlobalThemeOverrides } from 'naive-ui'
import defu from 'defu'

import { DARK_CLASS } from '~/constants/app'
import { addColorAlpha, getColorPalette, getPaletteColorByNumber, getRgb } from '~/theme/color'
import { overrideThemeSettings, themeSettings } from '~/theme/settings'
import { themeVars } from '~/theme/vars'
import { toggleHtmlClass } from '~/utils/common'
import { localStg } from '~/utils/storage'

export function initThemeSettings() {
  const isProd = import.meta.env.PROD

  if (!isProd){
    return themeSettings
  }

  const localSettings = localStg.get('themeSettings')

  let settings = defu(localSettings, themeSettings)

  const isOverride = localStg.get('overrideThemeFlag') === BUILD_TIME

  if (!isOverride){
    settings = defu(overrideThemeSettings, settings)
    localStg.set('overrideThemeFlag', BUILD_TIME)
  }
  return settings
}

export function createThemeToken(
  colors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens'],
  recommended = false,
) {
  const paletteColors = createThemePaletteColors(colors, recommended)
  const { light, dark } = tokens || themeSettings.tokens

  const themeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors,
    },
    boxShadow: {
      ...light.boxShadow,
    },
  }

  const darkThemeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...themeTokens.colors,
      ...dark?.colors,
    },
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark?.boxShadow,
    },
  }

  return {
    themeTokens,
    darkThemeTokens,
  }
}

function createThemePaletteColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[]
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor

  colorKeys.forEach(key => {
    const colorMap = getColorPalette(colors[key], recommended)
    colorPaletteVar[key] = colorMap.get(500)!

    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex
    })
  })
  return colorPaletteVar
}

function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = []

  const removeVarPrefix = (value: string) => {
    return value.replace(/var\((.*?)\)/g, '$1')
  }

  const removeRgbPrefix = (value: string) => {
    return value.replace(/^rgba?\((.*)\)$/, '$1')
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue)
      let cssValue = tokens[key][tokenKey]

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey)
        const { r, g, b } = getRgb(cssValue)
        cssValue = `${r} ${g} ${b}`
      }
      styles.push(`${cssVarsKey}: ${cssValue}`)
    }
  }
  return styles.join(';')
}

export function addThemeVarsToGlobal(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens)
  const darkCssVarStr = getCssVarByTokens(darkTokens)

  const css = `
    :root {
      ${cssVarStr}
    }
  `

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `

  const styleId = 'theme-vars'

  const style = document.querySelector(`#${styleId}`) || document.createElement('style')

  style.id = styleId
  style.textContent = css + darkCss

  document.head.appendChild(style)
}

export function toggleCssDarkMode(darkMode = false) {
  const { add, remove } = toggleHtmlClass(DARK_CLASS)

  if (darkMode) {
    add()
  }
  else {
    remove()
  }
}

export function toggleAuxiliaryColorModes(grayscaleMode = false, colourWeakness = false) {
  const htmlElement = document.documentElement
  htmlElement.style.filter = [grayscaleMode ? 'grayscale(100%)' : '', colourWeakness ? 'invert(80%)' : '']
    .filter(Boolean)
    .join(' ')
}

type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'

type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`

type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>

interface NaiveColorAction{
  scene: NaiveColorScene
  handler: (color: string) => string
}

function getNaiveThemeColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getPaletteColorByNumber(color, 500, recommended) },
    { scene: 'Pressed', handler: color => getPaletteColorByNumber(color, 700, recommended) },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) },
  ]

  const themeColors: NaiveThemeColor = {}
  const colorEntries = Object.entries(colors) as [App.Theme.ThemeColorKey, string][]

  colorEntries.forEach(color => {
    colorActions.forEach(action => {
      const [colorType, colorValue] = color
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorValue)
    })
  })
  return themeColors
}

export function getNaiveTheme(colors: App.Theme.ThemeColor, recommended = false) {
  const { primary: colorLoading } = colors

  const theme: GlobalThemeOverrides = {
    common: {
      ...getNaiveThemeColors(colors, recommended),
      borderRadius: '6px',
    },
    LoadingBar: {
      colorLoading,
    },
    Tag: {
      borderRadius: '6px',
    },
  }
  return theme
}
