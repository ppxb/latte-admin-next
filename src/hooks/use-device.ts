import { useWindowSize } from '@vueuse/core'

const MOBILE_BREAKPOINT = 768

export function useDevice() {
  const { width } = useWindowSize()

  const isDesktop = computed(() => width.value > MOBILE_BREAKPOINT)
  const isMobile = computed(() => !isDesktop.value)

  return {
    isDesktop,
    isMobile,
  }
}
