declare namespace UI{
  interface BaseLayoutHeaderConfig{
    headerVisible?: boolean
    headerClass?: string
    headerHeight?: number
  }

  interface BaseLayoutTabConfig{
    tabVisible?: boolean
    tabClass?: string
    tabHeight?: number
  }

  interface BaseLayoutSiderConfig{
    siderVisible?: boolean
    siderClass?: string
    mobileSiderClass?: string
    siderCollapse?: boolean
    siderWidth?: number
    siderCollapsedWidth?: number
  }

  interface BaseLayoutContentConfig{
    contentClass?: string
    fullContent?: boolean
  }

  interface BaseLayoutFooterConfig{
    footerVisible?: boolean
    fixedFooter?: boolean
    footerClass?: string
    footerHeight?: number
    rightFooter?: boolean
  }

  type LayoutMode = 'vertical' | 'horizontal'

  type LayoutScrollMode = 'wrapper' | 'content'

  interface BaseLayoutProps
    extends BaseLayoutHeaderConfig,
    BaseLayoutTabConfig,
    BaseLayoutSiderConfig,
    BaseLayoutContentConfig,
    BaseLayoutFooterConfig{
    mode?: LayoutMode
    isMobile?: boolean
    scrollMode?: LayoutScrollMode
    scrollElId?: string
    scrollElClass?: string
    scrollWrapperClass?: string
    commonClass?: string
    fixedTop?: boolean
    maxZIndex?: number
  }

  type Kebab<S extends string> = S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`

  type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
    ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
    : S

  type Prefix = '--la-'

  type LayoutCssVarsProps = Pick<
    BaseLayoutProps,
    'headerHeight' | 'tabHeight' | 'siderWidth' | 'siderCollapsedWidth' | 'footerHeight'
  > & {
    headerZIndex?: number
    tabZIndex?: number
    siderZIndex?: number
    mobileSiderZIndex?: number
    footerZIndex?: number
  }

  type LayoutCssVars = {
    [K in keyof LayoutCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
  }

  type PageTabMode = 'button' | 'chrome'

  interface PageTabProps{
    darkMode?: boolean
    mode?: PageTabMode
    commonClass?: string
    buttonClass?: string
    chromeClass?: string
    active?: boolean
    activeColor?: string
    closable?: boolean
  }

  type PageTabCssVarsProps = {
    primaryColor: string
    primaryColor1: string
    primaryColor2: string
    primaryColorOpacity1: string
    primaryColorOpacity2: string
    primaryColorOpacity3: string
  }

  type PageTabCssVars = {
    [K in keyof PageTabCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
  }
}
