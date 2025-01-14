import { useDark } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref<boolean>(false)

  const isDark = useDark()

  const toggleDark = () => {
    isDark.value = !isDark.value
  }

  function toggleSidebar() {
    isCollapse.value = !isCollapse.value
  }

  return {
    isDark,
    isCollapse,
    toggleDark,
    toggleSidebar,
  }
})
