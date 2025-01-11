<script setup lang="ts">
import { useRouteStore } from '~/store/modules/route'

defineOptions({
  name: 'LaSidebar',
})

const route = useRoute()
const routeStore = useRouteStore()

// 获取路由数据
const routes = computed(() => routeStore.routes.filter(route => !route.meta?.hidden))

// 当前激活的菜单
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu)
    return meta.activeMenu
  return path
})
</script>

<template>
  <div class="flex flex-col h-screen w-[220px] border-r border-gray-200 transition-[width] dark:border-gray-800">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        unique-opened
        mode="vertical"
        :default-active="activeMenu"
      >
        <template v-for="r in routes" :key="r.path">
          <!-- 没有子路由 -->
          <el-menu-item v-if="!r.children" :index="r.path">
            <el-icon v-if="r.meta?.icon">
              <IconifyIconOnline :icon="`ri:${r.meta?.icon}-fill`" />
            </el-icon>
            <template #title>
              {{ r.meta?.title }}
            </template>
          </el-menu-item>

          <!-- 有子路由 -->
          <template v-else>
            <!-- 只有一个子路由时直接显示 -->
            <el-menu-item
              v-if="r.children.length === 1"
              :index="r.children[0].path"
            >
              <el-icon v-if="r.children[0].meta?.icon">
                <IconifyIconOnline :icon="`ri:${r.children[0].meta?.icon}-fill`" />
              </el-icon>
              <template #title>
                {{ r.children[0].meta?.title }}
              </template>
            </el-menu-item>

            <!-- 多个子路由显示分组 -->
            <el-sub-menu
              v-else
              :index="r.path"
            >
              <template #title>
                <el-icon v-if="r.meta?.icon">
                  <IconifyIconOnline :icon="`ri:${r.meta?.icon}-fill`" />
                </el-icon>
                <span>{{ r.meta?.title }}</span>
              </template>

              <el-menu-item
                v-for="child in r.children"
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

  .el-sub-menu__title {
    color: hsl(240 3.8% 46.1%);

    &:hover {
      color: var(--el-menu-active-color);
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
</style>
