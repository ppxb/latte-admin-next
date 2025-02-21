<script setup lang="ts">
import LayoutContent from './components/layout-content/index.vue'
import LayoutHeader from './components/layout-header/index.vue'

defineOptions({
  name: 'LayoutBase',
})
</script>

<template>
  <n-layout has-sider class="h-screen">
    <n-layout-sider content-style="padding: 24px;">
      海淀桥
    </n-layout-sider>
    <n-layout>
      <div class="relative w-full flex flex-col bg-[var(--bg-body-color)]">
        <LayoutHeader />
        <LayoutContent />
      </div>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
</style>
