<script setup lang="ts">
import LayoutContent from './components/layout-content/index.vue'
import LayoutHeader from './components/layout-header/index.vue'
import LayoutSidebar from './components/layout-sidebar/index.vue'

defineOptions({
  name: 'LayoutBase',
})
</script>

<template>
  <n-layout has-sider class="h-screen">
    <LayoutSidebar />
    <n-layout>
      <div class="relative w-full flex flex-col bg-[var(--bg-body-color)]">
        <LayoutHeader />
        <LayoutContent />
      </div>
    </n-layout>
  </n-layout>
</template>
