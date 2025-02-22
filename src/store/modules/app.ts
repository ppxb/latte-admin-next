import { defineStore } from 'pinia'

import { listSiteOptionDict } from '~/apis'

const defaultSettings = {
  theme: 'light',
  themeColor: '#165DFF',
  enableTab: true,
  tab: 'card-gutter',
  enableAnimate: false,
  animate: 'zoom-fade',
  menuCollapse: true,
  menuAccordion: true,
  menuDark: false,
  copyrightDisplay: true,
  layout: 'base',
  enableColorWeaknessMode: false,
  enableMourningMode: false,
} as App.Settings

function appStore() {
  const loginType = ref<App.LoginType>('account')
  const siteConfig = ref<App.SiteConfig>()
  const settings = reactive<App.Settings>(defaultSettings)

  const transitionName = computed(() => settings.enableAnimate ? settings.animate : '')

  const setLoginType = (type: App.LoginType) => {
    loginType.value = type
  }

  const initSiteConfig = async () => {
    const { data } = await listSiteOptionDict()
    const config = Object.fromEntries(
      data.map(item => [item.label, item.value]),
    )

    siteConfig.value = {
      SITE_FAVICON: config.SITE_FAVICON,
      SITE_LOGO: config.SITE_LOGO,
      SITE_TITLE: config.SITE_TITLE,
      SITE_COPYRIGHT: config.SITE_COPYRIGHT,
      SITE_BEIAN: config.SITE_BEIAN,
    }

    document.title = config.SITE_TITLE
    const favicon = document.querySelector('link[rel="shortcut icon"]')
    if (favicon) {
      favicon.setAttribute('href', config.SITE_FAVICON || '/favicon.ico')
    }
  }

  const toggleTheme = (dark: boolean) => {
    if (dark) {
      settings.theme = 'dark'
      document.body.setAttribute('theme', 'dark')
    }
    else {
      settings.theme = 'light'
      document.body.removeAttribute('theme')
    }
  }

  const getFavicon = () => {
    return siteConfig.value?.SITE_FAVICON
  }

  const getLogo = () => {
    return siteConfig.value?.SITE_LOGO
  }

  const getTitle = () => {
    return siteConfig.value?.SITE_TITLE
  }

  const getCopyright = () => {
    return siteConfig.value?.SITE_COPYRIGHT
  }

  const getForRecord = () => {
    return siteConfig.value?.SITE_BEIAN
  }

  return {
    loginType,
    ...toRefs(settings),
    siteConfig,
    transitionName,
    setLoginType,
    initSiteConfig,
    getLogo,
    getFavicon,
    getTitle,
    getCopyright,
    getForRecord,
    toggleTheme,
  }
}

export const useAppStore = defineStore('app', appStore, { persist: true })
