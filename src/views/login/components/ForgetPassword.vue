<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { useUserStore } from '~/store/modules/user'

const userStore = useUserStore()

const form = reactive({
  email: '',
})
const formRef = ref<FormInstance>()
const formRules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'trigger' },
    {
      pattern: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
      message: '请输入正确的邮箱地址',
      trigger: 'trigger',
    },
  ],
})

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
      忘记密码？🤦🏻‍♂️
    </div>
    <div class="text-sm text-muted-foreground">
      请输入您的电子邮箱，我们将向您发送重置密码的链接
    </div>
    <div class="flex flex-col">
      <el-form ref="formRef" :model="form" :rules="formRules" size="large">
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            clearable
            placeholder="example@example.com"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="handleSubmit">
            发送重置链接
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
