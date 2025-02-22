<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import { useAppStore } from '~/store'

defineOptions({
  name: 'ToggleTheme',
})

const appStore = useAppStore()

const isHovered = ref(false)

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
  <div
    class="text-5 cursor-pointer text-[var(--text-color)]"
    :class="[
      appStore.theme === 'light' ? (isHovered ? 'i-ic:baseline-dark-mode' : 'i-ic:outline-dark-mode') : (isHovered ? 'i-ic:baseline-light-mode' : 'i-ic:outline-light-mode'),
    ]"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="handleToggleTheme"
  />
</template>
