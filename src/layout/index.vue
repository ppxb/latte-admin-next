<script setup lang="ts">
import LaMain from './components/LaMain/index.vue'
import LaSidebar from './components/LaSidebar/index.vue'

defineOptions({
  name: 'Layout',
})
</script>

<template>
  <div class="flex h-screen">
    <LaSidebar />
    <LaMain />
  </div>
</template>
