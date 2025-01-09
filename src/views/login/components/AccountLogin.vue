<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { useUserStore } from '~/store/modules/user'

const userStore = useUserStore()

const thirdPartys = [
  {
    name: '微信登录',
    icon: 'wechat',
  },
  {
    name: '支付宝登录',
    icon: 'alipay',
  },
  {
    name: 'QQ登录',
    icon: 'qq',
  },
]

const form = reactive({
  username: '',
  password: '',
})
const formRef = ref<FormInstance>()
const formRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'trigger' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'trigger' },
  ],
})

const rememberAccount = ref(false)

async function handleSubmit() {
  await formRef.value?.validate((valid, _) => {
    if (valid) {
      console.log(form)
    }
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-4xl font-bold text-gray-900">
      欢迎回来 👏
    </div>
    <div class="text-sm text-muted-foreground">
      请输入您的账户信息以登录系统进行管理
    </div>
    <div class="flex flex-col">
      <el-form ref="formRef" :model="form" :rules="formRules" size="large">
        <el-form-item prop="username">
          <el-input v-model="form.username" clearable placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            clearable
            placeholder="请输入密码"
          />
        </el-form-item>
        <div class="flex justify-between mb-4">
          <el-checkbox v-model="rememberAccount">
            记住账号
          </el-checkbox>
          <el-button type="primary" link :underline="false" @click="userStore.setLoginType('forget')">
            忘记密码？
          </el-button>
        </div>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="handleSubmit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="flex">
        <el-button size="large" class="flex-1" @click="userStore.setLoginType('phone')">
          手机号登录
        </el-button>
        <el-button size="large" class="flex-1" @click="userStore.setLoginType('email')">
          邮箱登录
        </el-button>
      </div>
      <div class="flex flex-col gap-2">
        <el-divider>
          <p class="text-muted-foreground text-xs">
            其他登录方式
          </p>
        </el-divider>
        <div class="w-full flex justify-evenly">
          <el-button v-for="item in thirdPartys" :key="item.name" circle size="large">
            <IconifyIconOnline :icon="`ri:${item.icon}-fill`" width="20" />
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
