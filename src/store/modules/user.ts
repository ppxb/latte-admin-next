import { defineStore } from 'pinia'

type LoginType = 'account' | 'phone' | 'email' | 'forget'

export const useUserStore = defineStore('user', () => {
  const loginType = ref<LoginType>('account')

  const setLoginType = (type: LoginType) => {
    loginType.value = type
  }

  return {
    loginType,
    setLoginType,
  }
})
