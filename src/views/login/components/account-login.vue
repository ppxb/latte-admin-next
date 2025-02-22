<script setup lang="ts">
import { useStorage } from '@vueuse/core'

import { getImageCaptcha } from '~/apis'
import { useForm } from '~/hooks/form'
import { useAppStore, useUserStore } from '~/store'
import { encryptByRSA } from '~/utils/encrypt'
import { createFormValidator } from '~/utils/validate'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const loginConfig = useStorage('login-config', {
  username: 'admin',
  password: 'admin123',
  rememberMe: true,
})

interface FormModel{
  username: string
  password: string
  captcha: string
  uuid: string
  expired: boolean
}

const { formRef, validate } = useForm()

const form = reactive<FormModel>({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
  captcha: '',
  uuid: '',
  expired: false,
})

const formRules = {
  username: {
    required: true,
    trigger: 'blur',
    validator: createFormValidator('请输入用户名'),
  },
  password: {
    required: true,
    trigger: 'blur',
    validator: createFormValidator('请输入密码'),
  },
  captcha: {
    required: true,
    trigger: 'blur',
    validator: createFormValidator('请输入验证码'),
  },
} as App.FormRules

const loading = ref(false)
const imageCaptcha = ref('')

async function getCaptcha() {
  const { data: { uuid, img } } = await getImageCaptcha()
  form.uuid = uuid
  imageCaptcha.value = img
}

async function handleLogin() {
  await validate()

  try {
    loading.value = true

    const encryptedPassword = encryptByRSA(form.password) || ''
    await userStore.accountLogin({
      username: form.username,
      password: encryptedPassword,
      captcha: form.captcha,
      uuid: form.uuid,
    })

    const { redirect, ...rest } = route.query
    await router.push({
      path: redirect as string || '/',
      query: { ...rest },
    })
    window.$message?.success('登录成功')
  }
  catch (error) {
    console.log(error)
    await getCaptcha()
  }
  finally {
    loading.value = false
  }
}

onMounted(getCaptcha)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-4xl font-bold ">
      欢迎回来 👏
    </div>
    <div class="text-base text-foreground-muted mb-8">
      请输入您的账户信息以登录系统进行管理
    </div>
    <div class="flex flex-col gap-2">
      <n-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        @keyup.enter="handleLogin"
      >
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="form.username"
            size="large"
            placeholder="请输入用户名"
            clearable
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="form.password"
            show-password-on="click"
            type="password"
            size="large"
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-form-item label="验证码" path="captcha">
          <n-input
            v-model:value="form.captcha"
            size="large"
            placeholder="请输入验证码"
            maxlength="4"
          >
            <template #suffix>
              <img :src="imageCaptcha" class="cursor-pointer w-20 rounded-md object-fill" @click="getCaptcha">
            </template>
          </n-input>
        </n-form-item>
        <n-button
          type="primary"
          size="large"
          block
          :loading="loading"
          :disabled="loading"
          @click="handleLogin"
        >
          登录
        </n-button>
      </n-form>
      <div class="flex flex-col">
        <n-divider class="text-foreground-muted text-sm">
          其他登录方式
        </n-divider>
        <div class="w-full flex flex-col gap-4">
          <n-button size="large" block @click="appStore.setLoginType('phone')">
            手机号登录
          </n-button>
          <n-button size="large" block @click="appStore.setLoginType('email')">
            邮箱登录
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
