<script setup lang="ts">
import { useUserStore } from '~/store/modules/user'
import { message, messageBox } from '~/composables'
import type { Action } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

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
  <el-dropdown trigger="click" placement="bottom-end">
    <div class="relative inline-block">
      <el-avatar :src="userStore.userInfo.avatar" :size="32" />
      <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <div class="flex items-center px-4 py-2">
          <div class="relative">
            <el-avatar :src="userStore.userInfo.avatar" :size="48" />
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
</template>
