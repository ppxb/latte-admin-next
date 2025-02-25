<script setup lang="ts">
import {SearchOutline} from '@vicons/ionicons5'

defineOptions({
  name: 'Search',
})
</script>

<template>
  <button class="group bg-[--bg-body-color] text-[--text-color] leading-none flex items-center h-8 rounded-[50px] border-none gap-[10px] cursor-pointer px-2 lg:p-[4px_6px_4px_10px] outline-none">
    <n-icon :size="16" class="op50 transition-opacity group-hover:op100">
      <SearchOutline />
    </n-icon>
    <span class="hidden op50 pr-2px text-sm transition-opacity group-hover:op100 lg:block">搜索</span>
    <code class="hidden lg:flex items-center font-mono text-[10px] gap-1 bg-[--bg-sidebar-color] rounded-[4px_10px_10px_4px] pl-1.5 pr-2 py-1 font-semibold">
      CTRL K
    </code>
  </button>
</template>