import type { Component } from 'vue'

import SvgIcon from '~/components/common/svg-icon.vue'

function useSvgIconRender(SvgIcon: Component) {
  interface IconConfig{
    icon?: string
    localIcon?: string
    color?: string
    fontSize?: number
  }

  type IconStyle = Partial<Pick<CSSStyleDeclaration, 'color' | 'fontSize'>>

  const SvgIconVNode = (config: IconConfig) => {
    const { icon, localIcon, color, fontSize } = config
    const style: IconStyle = {}

    if (color) {
      style.color = color
    }
    if (fontSize) {
      style.fontSize = `${fontSize}px`
    }
    if (!icon && !localIcon) {
      return undefined
    }

    return () => h(SvgIcon, { icon, localIcon, style })
  }

  return {
    SvgIconVNode,
  }
}

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon)
  return {
    SvgIconVNode,
  }
}
