<script setup lang="ts">
import type { Action } from 'element-plus'
import { isDark, isFullscreen, message, messageBox, toggleDark, toggleFullscreen } from '~/composables'
import { useAppStore } from '~/store/modules/app'
import { useUserStore } from '~/store/modules/user'

defineOptions({
  name: 'LaHeader',
})

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

function handleLogout() {
  messageBox('确认退出登录？', {
    title: '提示',
    showCancelButton: true,
    showClose: true,
    confirmButtonText: '退出登录',
    cancelButtonText: '取消',
    type: 'warning',
    callback: async (action: Action) => {
      if (action === 'confirm') {
        await userStore.logout()
        await router.replace('/login')
        message({ msg: '退出登录成功' })
      }
    },
  })
}
</script>

<template>
  <div class="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
    <el-button circle @click="appStore.toggleSidebar">
      <IconifyIconOnline icon="ri-menu-fill" width="18" />
    </el-button>

    <div class="flex items-center">
      <el-button circle @click="toggleFullscreen">
        <IconifyIconOnline :icon="isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'" width="18" />
      </el-button>
      <el-button circle @click="toggleDark()">
        <IconifyIconOnline :icon="isDark ? 'ri:sun-line' : 'ri:moon-line'" width="18" />
      </el-button>
      <el-dropdown trigger="click" placement="bottom-end">
        <div class="relative inline-block ml-3">
          <el-avatar
            :src="userStore.userInfo.avatar"
            :size="32"
          />
          <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <div class="flex items-center px-4 py-2">
              <div class="relative">
                <el-avatar
                  :src="userStore.userInfo.avatar"
                  :size="48"
                />
                <div class="absolute bottom-1 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div class="flex flex-col ml-3">
                <div class="text-base font-medium text-gray-900">
                  {{ userStore.userInfo.username }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ userStore.userInfo.email }}
                </div>
              </div>
            </div>
            <el-dropdown-item divided>
              锁定屏幕
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-button {
 border: none;
}
</style>
