declare namespace I18n{
  type LangType = 'zh-CN' | 'en-US'

  type Schema = {
    system: {
      title: string
      updateTitle: string
      updateContent: string
      updateConfirm: string
      updateCancel: string
    }
  }

  type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never

  type I18nKey = GetI18nKey<Schema>

  type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>

  interface $T{
    (key: I18nKey): string
    (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string
    (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string
    (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string
    (key: I18nKey, list: unknown[], plural: number): string
    (key: I18nKey, list: unknown[], defaultMsg: string): string
    (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string
    (key: I18nKey, named: Record<string, unknown>, plural: number): string
    (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string
  }
}
