declare namespace Storage{
  interface Session{}

  interface Local{
    lang: I18n.LangType
    token: string
    themeColor: string
    darkMode: boolean
    themeSettings: App.Theme.ThemeSetting
    overrideThemeFlag: string
  }
}
