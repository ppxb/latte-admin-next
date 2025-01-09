<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { useUserStore } from '~/store/modules/user'

const userStore = useUserStore()

const countdown = ref(0)
const timer = ref<NodeJS.Timeout>()

const form = reactive({
  phone: '',
  verifyCode: '',
})
const formRef = ref<FormInstance>()
const formRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'trigger' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'trigger' },
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'trigger' },
  ],
})

async function handleGetVerifyCode() {
  await formRef.value?.validateField('phone')
  console.log('发送验证码到：', form.phone)

  countdown.value = 60
  timer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer.value)
    }
  }, 1000)
}

async function handleSubmit() {
  await formRef.value?.validate((valid, _) => {
    if (valid) {
      console.log(form)
    }
  })
}

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-4xl font-bold text-gray-900">
      欢迎回来 📲
    </div>
    <div class="text-sm text-muted-foreground">
      请输入您的手机号码以登录系统进行管理
    </div>
    <div class="flex flex-col">
      <el-form ref="formRef" :model="form" :rules="formRules" size="large">
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            clearable
            maxlength="11"
            placeholder="请输入手机号码"
            @keypress="(e: KeyboardEvent) => {
              if (!/[\d]/.test(e.key)) e.preventDefault()
            }"
          />
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            v-model="form.verifyCode"
            clearable
            maxlength="6"
            placeholder="请输入验证码"
            @keypress="(e:KeyboardEvent) => {
              if (!/[\d]/.test(e.key)) e.preventDefault()
            }"
          >
            <template #append>
              <el-button
                type="primary"
                :disabled="countdown > 0"
                @click="handleGetVerifyCode"
              >
                {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="handleSubmit">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="default" @click="userStore.setLoginType('account')">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
