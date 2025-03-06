declare namespace App{

  namespace Theme{
    type ColorPaletteNumber = import('~/theme/color').ColorPaletteNumber

    interface ThemeSetting{
      /** 主题模式 */
      themeScheme: UnionKey.ThemeScheme
      /** 灰度模式 */
      grayscale: boolean
      /** 色弱模式 */
      colorWeakness: boolean
      /** 是否使用推荐算法颜色 */
      recommendColor: boolean
      /** 主题颜色 */
      themeColor: string
      /** 其他颜色 */
      otherColor: OtherColor
      /** 信息色是否跟随主题主色 */
      isInfoFollowPrimary: boolean
      /** 重置缓存策略 */
      resetCacheStrategy: UnionKey.ResetCacheStrategy

      /** 布局 */
      layout: {
        /** 布局模式 */
        mode: UnionKey.ThemeLayoutMode
        /** 滚动模式 TODO: */
        scrollMode: any
        /**
         * 是否反转顶部菜单混合模式
         *
         * 如果为真，则一级菜单与子级菜单位置反转
         */
        reverseHorizontalMix: boolean
      }

      /** 页面 */
      page: {
        /** 是否开启页面切换动画 */
        animate: boolean
        /** 页面切换动画类型 */
        animateMode: UnionKey.ThemePageAnimateMode
      }

      /** 头部 */
      header: {
        /** 头部高度 */
        height: number
        /** 面包屑 */
        breadcrumb: {
          /** 是否显示面包屑 */
          visible: boolean
          /** 是否显示面包屑图标 */
          showIcon: boolean
        }
        /** 多语言 */
        multilingual: {
          /** 是否显示多语言 */
          visible: boolean
        }
      }

      /** 标签栏 */
      tab: {
        /** 是否显示标签栏 */
        visible: boolean
        /**
         * 是否缓存标签栏
         *
         * 如果缓存，则页面刷新时会从本地存储恢复
         */
        cache: boolean
        /** 标签栏高度 */
        height: number
        /** 标签栏模式 TODO: */
        mode: any
      }
      /** 固定头部和标签栏 */
      fixedHeaderAndTab: boolean
      /** 侧边栏 */
      sider: {
        /** 深色侧边栏 */
        inverted: boolean
        /** 侧边栏宽度 */
        width: number
        /** 侧边栏折叠宽度 */
        collapsedWidth: number
        /** 当布局为 `vertical-mix` 或 `horizontal-mix` 时侧边栏宽度 */
        mixWidth: number
        /** 当布局为 `vertical-mix` 或 `horizontal-mix` 时侧边栏折叠宽度 */
        mixCollapsedWidth: number
        /** 当布局为 `vertical-mix` 或 `horizontal-mix` 时子菜单宽度 */
        mixChildMenuWidth: number
      }
      /** 底部 */
      footer: {
        /** 是否显示底部 */
        visible: boolean
        /** 是否固定底部 */
        fixed: boolean
        /** 底部高度 */
        height: number
        /** 混合布局时是否底部居右 */
        right: boolean
      }
      /** 水印 */
      watermark: {
        /** 是否显示水印 */
        visible: boolean
        /** 水印文字 */
        text: string
      }
      /** 主题变量 */
      tokens: {
        light: ThemeSettingToken
        dark?: {
          [K in keyof ThemeSettingToken]?: Partial<ThemeSettingToken[K]>;
        }
      }
    }

    interface OtherColor{
      info: string
      success: string
      warning: string
      error: string
    }

    interface ThemeColor extends OtherColor{
      primary: string
    }

    type ThemeColorKey = keyof ThemeColor

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string
    }

    type BaseToken = Record<string, Record<string, string>>

    interface ThemeSettingTokenColor{
      /** 进度条颜色，如果不设置则为主题色 */
      'nprogress'?: string
      'container': string
      'layout': string
      'inverted': string
      'base-text': string
    }

    interface ThemeSettingTokenBoxShadow{
      header: string
      sider: string
      tab: string
    }

    interface ThemeSettingToken{
      colors: ThemeSettingTokenColor
      boxShadow: ThemeSettingTokenBoxShadow
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor

    type ThemeTokenCSSVars = {
      colors: ThemeTokenColor & { [key: string]: string }
      boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string }
    }
  }

  type ThemeType = 'light' | 'dark'

  type LoginType = 'account' | 'phone' | 'email' | 'forget-pass'

  type LayoutType = 'base' | 'mix'

  type TabType = 'card' | 'card-gutter' | 'rounded'

  type AnimateType = 'zoom-fade' | 'slide-dynamic-origin' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale'

  type FormRules = import('naive-ui').FormRules

  type FormItemRule = import('naive-ui').FormItemRule

  type AppDropdownOption = import('naive-ui').DropdownOption
    | import('naive-ui').DropdownGroupOption
    | import('naive-ui').DropdownDividerOption
    | import('naive-ui').DropdownRenderOption

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
