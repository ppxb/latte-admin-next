<script setup lang="ts">
import { useAppStore } from '~/store'

const appStore = useAppStore()
</script>

<template>
  <n-layout-content>
    <div class="flex flex-col min-h-[calc(100vh-80px)] px-10 overflow-hidden">
      <router-view v-slot="{ Component, route }">
        <transition :name="appStore.transitionName" mode="out-in" appear>
          <component :is="Component" :key="route.path" class="flex-1" />
        </transition>
      </router-view>
      <div class="flex justify-end mt-auto py-4">
        {{ appStore.getCopyright() }}{{ appStore.getForRecord() ? ` · ${appStore.getForRecord()}` : '' }}
      </div>
    </div>
  </n-layout-content>
</template>

<style scoped>
.n-layout-content{
  background-color: var(--bg-body-color);
}
</style>
