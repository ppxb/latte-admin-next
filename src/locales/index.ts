import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import { localStg } from '~/utils/storage'
import messages from './locale'

const i18n = createI18n({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false,
})

export function setupI18n(app: App) {
  app.use(i18n)
}

export const $t = i18n.global.t as I18n.$T

export function setLocale(locale: I18n.LangType) {
  i18n.global.locale.value = locale
}
