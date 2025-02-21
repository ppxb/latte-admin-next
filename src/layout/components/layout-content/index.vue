<script setup lang="ts">
import { useAppStore } from '~/store'

const appStore = useAppStore()
</script>

<template>
  <n-layout-content class="relative w-full h-full flex flex-col overflow-hidden">
    <router-view v-slot="{ Component, route }">
      <transition :name="appStore.transitionName" mode="out-in" appear>
        <component :is="Component" :key="route.path" class="h-[calc(100vh-80px)] pt-20" />
      </transition>
    </router-view>
    <div class="mt-auto">
      {{ appStore.getCopyright() }}{{ appStore.getForRecord() ? ` · ${appStore.getForRecord()}` : '' }}
    </div>
  </n-layout-content>
</template>
