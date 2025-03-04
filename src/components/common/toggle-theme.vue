<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import { useAppStore } from '~/store'

defineOptions({
  name: 'ToggleTheme',
})

const appStore = useAppStore()

const isDark = useDark({
  onChanged(dark: boolean) {
    document.documentElement.setAttribute('class', dark ? 'dark' : 'light')
    appStore.toggleTheme(dark)
  },
})

const toggle = useToggle(isDark)

const isAppearanceTransition = typeof document !== 'undefined'
  && 'startViewTransition' in document
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function handleToggleTheme(event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    return toggle()
  }

  const { clientX: x, clientY: y } = event
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = (document as any).startViewTransition(toggle)

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <n-icon :size="19" class="cursor-pointer" @click="handleToggleTheme">
    <SvgIcon :icon="appStore.theme === 'light' ? 'lucide:moon' : 'lucide:sun'" />
  </n-icon>
</template>
