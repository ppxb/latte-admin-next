export const LAYOUT_SCROLL_EL_ID = '__SCROLL_EL_ID__'

export const LAYOUT_MAX_Z_INDEX = 100

function createLayoutCssVarsByCssVarsProps(props: UI.LayoutCssVarsProps) {
  const cssVars: UI.LayoutCssVars = {
    '--la-header-height': `${props.headerHeight}px`,
    '--la-header-z-index': props.headerZIndex,
    '--la-tab-height': `${props.tabHeight}px`,
    '--la-tab-z-index': props.tabZIndex,
    '--la-sider-width': `${props.siderWidth}px`,
    '--la-sider-collapsed-width': `${props.siderCollapsedWidth}px`,
    '--la-sider-z-index': props.siderZIndex,
    '--la-mobile-sider-z-index': props.mobileSiderZIndex,
    '--la-footer-height': `${props.footerHeight}px`,
    '--la-footer-z-index': props.footerZIndex,
  }
  return cssVars
}

export function createLayoutCssVars(props: UI.BaseLayoutProps) {
  const {
    mode,
    isMobile,
    maxZIndex = LAYOUT_MAX_Z_INDEX,
    headerHeight,
    tabHeight,
    siderWidth,
    siderCollapsedWidth,
    footerHeight,
  } = props

  const headerZIndex = maxZIndex - 3
  const tabZIndex = maxZIndex - 5
  const siderZIndex = mode === 'vertical' || isMobile ? maxZIndex - 1 : maxZIndex - 4
  const mobileSiderZIndex = isMobile ? maxZIndex - 2 : 0
  const footerZIndex = maxZIndex - 5

  const cssProps: UI.LayoutCssVarsProps = {
    headerHeight,
    headerZIndex,
    tabHeight,
    tabZIndex,
    siderWidth,
    siderZIndex,
    mobileSiderZIndex,
    siderCollapsedWidth,
    footerHeight,
    footerZIndex,
  }
  return createLayoutCssVarsByCssVarsProps(cssProps)
}
