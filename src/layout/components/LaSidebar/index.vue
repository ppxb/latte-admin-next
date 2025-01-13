<script setup lang="ts">
import { useAppStore } from '~/store/modules/app'
import { useRouteStore } from '~/store/modules/route'

defineOptions({
  name: 'LaSidebar',
})

const currentRoute = useRoute()
const routeStore = useRouteStore()
const appStore = useAppStore()

const routes = computed(() => routeStore.routes.filter(route => !route.meta?.hidden))
const sidebarWidth = computed(() => appStore.isCollapse ? '64px' : '220px')
const activeMenu = computed(() => currentRoute.meta?.activeMenu || currentRoute.path)
</script>

<template>
  <div
    :style="{ width: sidebarWidth }"
    class="flex flex-col h-screen border-r border-gray-200 transition-[width] dark:border-gray-800"
  >
    <div class="h-12 flex items-center px-4">
      <img src="/logo.svg" class="h-8">
      <span
        v-if="!appStore.isCollapse"
        class="ml-2 text-lg font-semibold truncate"
      >
        项目管理系统
      </span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        unique-opened
        mode="vertical"
        :default-active="activeMenu"
        :collapse="appStore.isCollapse"
        :collapse-transition="false"
      >
        <template v-for="route in routes" :key="route.path">
          <el-menu-item v-if="!route.children" :index="route.path">
            <el-icon v-if="route.meta?.icon">
              <IconifyIconOnline :icon="`ri:${route.meta?.icon}-fill`" />
            </el-icon>
            <template #title>
              {{ route.meta?.title }}
            </template>
          </el-menu-item>

          <template v-else>
            <el-menu-item
              v-if="route.children.length === 1"
              :index="route.children[0].path"
            >
              <el-icon v-if="route.children[0].meta?.icon">
                <IconifyIconOnline :icon="`ri:${route.children[0].meta?.icon}-fill`" />
              </el-icon>
              <template #title>
                {{ route.children[0].meta?.title }}
              </template>
            </el-menu-item>

            <el-sub-menu v-else :index="route.path">
              <template #title>
                <el-icon v-if="route.meta?.icon">
                  <IconifyIconOnline :icon="`ri:${route.meta?.icon}-fill`" />
                </el-icon>
                <span>{{ route.meta?.title }}</span>
              </template>

              <el-menu-item
                v-for="child in route.children"
                :key="child.path"
                :index="child.path"
              >
                <el-icon v-if="child.meta?.icon">
                  <IconifyIconOnline :icon="`ri:${child.meta?.icon}-fill`" />
                </el-icon>
                <template #title>
                  {{ child.meta?.title }}
                </template>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-menu) {
  border-right: none;

  .el-menu-item {
    color: hsl(240 3.8% 46.1%);

    &:hover {
      color: var(--el-menu-active-color);
      background-color: var(--el-menu-hover-bg-color);
    }

    &.is-active {
      color: var(--el-menu-active-color);
      background-color: var(--el-menu-hover-bg-color);
    }
  }

  .el-sub-menu {
    &.is-active {
      > .el-sub-menu__title {
        color: var(--el-menu-active-color);
      }
    }
  }

  .el-sub-menu__title {
    color: hsl(240 3.8% 46.1%);

    &:hover {
      color: var(--el-menu-active-color);
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
</style>
