<script setup lang="ts">
import { useAppStore } from '~/store'

import AccountLogin from './components/account-login.vue'
import EmailLogin from './components/email-login.vue'
import ForgetPass from './components/forget-pass.vue'
import PhoneLogin from './components/phone-login.vue'

defineOptions({
  name: 'Login',
})

const appStore = useAppStore()
const logo = computed(() => appStore.getLogo())

const loginComponents = {
  'account': AccountLogin,
  'email': EmailLogin,
  'phone': PhoneLogin,
  'forget-pass': ForgetPass,
}
</script>

<template>
  <div class="relative min-h-screen flex">
    <div class="lg:basis-1/3 flex flex-col items-center p-[50px]">
      <div class="w-full min-w-64 max-w-96">
        <img :src="logo || '/logo.svg'" alt="logo" class="block max-h-10 my-8 self-start">
        <component :is="loginComponents[appStore.loginType]" />
      </div>
      <footer class="absolute bottom-6 text-foreground-muted">
        {{ appStore.getCopyright() }}{{ appStore.getForRecord() ? ` · ${appStore.getForRecord()}` : '' }}
      </footer>
    </div>

    <div class="login-bg relative hidden bg-[rgb(0,179,122)] lg:flex lg:basis-2/3 flex-col justify-center items-center overflow-hidden" />
  </div>
</template>

<style scoped>
.login-bg::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(/assets/login-bg.png);
  background-size: 500px;
  background-position: center center;
}
</style>
