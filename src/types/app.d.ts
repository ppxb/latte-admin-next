declare namespace App{
  type ThemeType = 'light' | 'dark'
  type LoginType = 'account' | 'phone' | 'email' | 'forget-pass'
  type LayoutType = 'base' | 'mix'
  type TabType = 'card' | 'card-gutter' | 'rounded'
  type AnimateType = 'zoom-fade' | 'slide-dynamic-origin' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale'

  interface Settings {
    theme: ThemeType
    themeColor: string
    enableTab: boolean
    tab: TabType
    enableAnimate: boolean
    animate: AnimateType
    menuCollapse: boolean
    menuAccordion: boolean
    menuDark: boolean
    copyrightDisplay: boolean
    layout: LayoutType
    enableWatermark?: boolean
    watermark?: string
    enableColorWeaknessMode?: boolean
    enableMourningMode?: boolean
  }

  interface SiteConfig {
    SITE_FAVICON: string
    SITE_LOGO: string
    SITE_TITLE: string
    SITE_COPYRIGHT: string
    SITE_BEIAN: string
  }

  interface DictItem {
    disabled?: boolean
    extra?: string
    label: string
    value: string
  }
}
