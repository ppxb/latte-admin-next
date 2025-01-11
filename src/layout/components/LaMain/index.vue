<script setup lang="ts">
import LaHeader from '~/layout/components/LaHeader/index.vue'

defineOptions({
  name: 'LaMain',
})
</script>

<template>
  <div class="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
    <LaHeader />
    <div class="flex-1 overflow-hidden">
      <router-view class="h-full w-full" />
    </div>
  </div>
</template>
