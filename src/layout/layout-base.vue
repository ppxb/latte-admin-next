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
    <n-layout class="max-h-screen">
      <LayoutHeader />
      <LayoutContent />
    </n-layout>
  </n-layout>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
