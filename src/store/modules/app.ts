import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref<boolean>(false)

  function toggleSidebar() {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    toggleSidebar,
  }
})
