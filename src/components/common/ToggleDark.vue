<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import { useAppStore } from '~/store/modules/app'
import { IconifyIconOnline } from '~/components/LaIcon'

const appStore = useAppStore()
const isDark = useDark()
const toggle = useToggle(isDark)

const isAppearanceTransition = typeof document !== 'undefined'
  && 'startViewTransition' in document
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

async function toggleDark(event?: MouseEvent) {
  const handler = () => {
    appStore.toggleDark()
    toggle()
  }

  if (!isAppearanceTransition || !event) {
    return handler()
  }

  const { clientX: x, clientY: y } = event
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = (document as any).startViewTransition(handler)

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
        duration: 400,
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
  <IconifyIconOnline
    class="cursor-pointer"
    :icon="isDark ? 'ic:baseline-dark-mode' : 'ic:baseline-wb-sunny'"
    width="20"
    @click="toggleDark"
  />
</template>
