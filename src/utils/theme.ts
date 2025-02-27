import type { GlobalThemeOverrides } from 'naive-ui'
import { generate } from '@ant-design/colors'
import { colord } from 'colord'
import { kebabCase, upperFirst } from 'lodash-es'
import { commonDark, commonLight } from 'naive-ui'

type ColorKey = `${NTheme.ColorType}Color${NTheme.ColorSceneCase}`

type ButtonColorKey = `textColor${NTheme.ButtonColorSceneCase}${NTheme.ColorTypeCase}`

type ThemeColor = Partial<Record<ColorKey, string>>

interface CssObject {
  [key: string]: string
}

interface ColorAction{
  scene: NTheme.ColorSceneCase
  handler: (color: string) => string
}

function getRgbColor(color: string){
  return colord(color).toRgb()
}

export function getGenerateColors(color: string, darkMode: boolean) {
  return darkMode
    ? generate(color, {
        theme: 'dark',
        backgroundColor: commonDark.bodyColor,
      })
    : generate(color)
}

function getOtherColor(config: NTheme.Config, darkMode: boolean) {
  const otherColor: GlobalThemeOverrides = {
    Button: {},
    Checkbox: {
      checkMarkColor: getTextColor(darkMode),
    },
    DatePicker: {
      itemTextColorActive: getTextColor(darkMode),
    },
    Calendar: {
      dateTextColorCurrent: getTextColor(darkMode),
    },
    Switch: {
      buttonColor: getTextColor(darkMode),
    },
  }
  const keys = Object.keys(config) as NTheme.ColorType[]
  const scenes: NTheme.ButtonColorSceneCase[] = [
    '',
    'Hover',
    'Pressed',
    'Focus',
    'Disabled',
  ]
  keys.forEach(key => {
    scenes.forEach(scene => {
      const colorKey = `textColor${scene}${upperFirst(key)}` as ButtonColorKey
      otherColor.Button![colorKey] = getTextColor(darkMode)
    })
  })
  return otherColor
}

export function getThemeColors(config: NTheme.Config, darkMode: boolean) {
  const themeColor: ThemeColor = {}
  const keys = Object.keys(config) as NTheme.ColorType[]
  const colorActions: ColorAction[] = [
    { scene: '', handler: color => getGenerateColors(color, darkMode)[5] },
    {
      scene: 'Hover',
      handler: color => getGenerateColors(color, darkMode)[4],
    },
    {
      scene: 'Suppl',
      handler: color => getGenerateColors(color, darkMode)[4],
    },
    {
      scene: 'Pressed',
      handler: color => getGenerateColors(color, darkMode)[6],
    },
  ]
  keys.forEach(key => {
    colorActions.forEach(action => {
      const color = action.handler(config[key])
      const colorKey = `${key}Color${action.scene}` as ColorKey
      themeColor[colorKey] = color
    })
  })
  return themeColor
}

function getTextColor(darkMode: boolean) {
  return darkMode ? commonDark.textColor2 : commonLight.baseColor
}

export function getThemeOverrides(config: NTheme.Config, darkMode: boolean): GlobalThemeOverrides {
  const themeColors = getThemeColors(config, darkMode)
  addCssVarsToHtml(config, darkMode, themeColors)

  return {
    common: {
      ...themeColors,
    },
    ...getOtherColor(config, darkMode),
  }
}

export function parseCssText(cssText: string): CssObject {
  const cssObj: CssObject = {}
  cssText.split(';').forEach(rule => {
    if (rule){
      const [key, value] = rule.split(':')
      cssObj[key.trim()] = value.trim()
    }
  })
  return cssObj
}

export function addCssVarsToHtml(config: NTheme.Config, darkMode: boolean, themeColors: ThemeColor) {
  const $root = document.documentElement
  const cssText = $root.style.cssText

  const cssObj = parseCssText(cssText)
  const configCssObj: CssObject = {}
  const configEntries = Object.entries(config) as [NTheme.ColorType, string][]
  const themeColorsEntries = Object.entries(themeColors) as [ColorKey, string][]

  for (const [key, value] of themeColorsEntries){
    const { r, g, b } = getRgbColor(value)
    configCssObj[`--n-${kebabCase(key)}`] = `${r},${g},${b}`
  }

  for (const [key, value] of configEntries){
    const generateColors = getGenerateColors(value, darkMode)
    generateColors.forEach((color, index) => {
      const { r, g, b } = getRgbColor(color)
      configCssObj[`--n-${key}-color-${index + 1}`] = `${r},${g},${b}`
    })
  }

  const newCssText = Object.entries({
    ...cssObj,
    ...configCssObj,
  })
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')

  $root.style.cssText = newCssText
}
