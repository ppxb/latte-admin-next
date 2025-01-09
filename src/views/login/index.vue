<script setup lang="ts">
import { useUserStore } from '~/store/modules/user'

import AccountLogin from './components/AccountLogin.vue'
import EmailLogin from './components/EmailLogin.vue'
import ForgetPassword from './components/ForgetPassword.vue'
import Motion from './components/Motion.vue'
import PhoneLogin from './components/PhoneLogin.vue'

defineOptions({
  name: 'Login',
})

const userStore = useUserStore()

const motionKey = computed(() => `login-${userStore.loginType}`)

const loginComponents = {
  account: AccountLogin,
  phone: PhoneLogin,
  email: EmailLogin,
  forget: ForgetPassword,
}
</script>

<template>
  <div class="min-h-screen flex">
    <div class="relative hidden lg:flex lg:w-3/4 flex-col justify-center items-center login-bg">
      <div class="flex flex-col justify-center items-center z-10">
        <h1 class="text-4xl font-bold mb-4">
          开箱即用的大中型后台管理系统
        </h1>
        <p class="text-sm text-muted-foreground">
          工程化、高性能、可扩展
        </p>
      </div>
    </div>

    <div class="relative w-full lg:w-1/4 flex items-center justify-center p-10">
      <div class="max-w-md w-full">
        <Motion :key="motionKey">
          <component :is="loginComponents[userStore.loginType]" />
        </Motion>
      </div>
      <footer class="absolute bottom-6 text-sm text-muted-foreground">
        Copyright © 2024. Built by ppxb
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-bg{
  position: relative;
  background: linear-gradient(154deg, #07070915 30%, hsl(212 100% 45% / 30%) 48%, #07070915 64%);
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(100px);
  }
}
</style>
