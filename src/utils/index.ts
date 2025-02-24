import type { Component } from 'vue'
import * as carbon from '@vicons/carbon'
import { NIcon } from 'naive-ui'
import { browse } from 'xe-utils'

interface IconPackage {
  [key: string]: Component
}

const iconPackages: { [key: string]: IconPackage } = {
  carbon,
}

export function isMobile(){
  return browse().isMobile
}

export function hexToRgb(hex: string) {
  const bigint = Number.parseInt(hex.replace('#', ''), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `${r}, ${g}, ${b}`
}

export function renderIcon(name: string = '') {
  const [packageName, iconName] = name.split(':')
  const icons = iconPackages[packageName]
  if (icons) {
    const icon = Object.entries(icons).filter(i => i[0] === iconName)
    if (icon.length > 0) {
      return () => h(NIcon, null, { default: () => h(icon[0][1] as unknown as Component) })
    }
  }
}
