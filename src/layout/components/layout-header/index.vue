<script setup lang="ts">
import ToggleTheme from '~/components/common/toggle-theme.vue'
import UserDropdown from './components/user-dropdown.vue'

defineOptions({
  name: 'LayoutHeader',
})
</script>

<template>
  <n-layout-header class="sticky top-0 left-0 flex items-center justify-between px-10 h-20 z-[1000]">
    <div>123</div>
    <div class="flex items-center bg-[var(--bg-sidebar-color)] border border-solid border-[var(--border-color)] rounded-[50px] p-[6px] gap-[14px] ">
      <div>123</div>
      <ToggleTheme />
      <UserDropdown />
    </div>
  </n-layout-header>
</template>

<style scoped>
.n-layout-header {
  background-color: transparent;
  backdrop-filter: blur(10px);
}
</style>
