import { defineStore } from 'pinia'

import { type AccountLoginReq, AuthTypeEnum, type LoginType } from '~/api/auth/type'
import { accountLogin as accountLoginApi } from '~/api/auth'
import { getToken, setToken } from '~/utils/auth'

export const useUserStore = defineStore('user', () => {
  const loginType = ref<LoginType>('account')
  const token = ref<string>(getToken() || '')

  const setLoginType = (type: LoginType) => {
    loginType.value = type
  }

  const accountLogin = async (req: AccountLoginReq) => {
    const { data } = await accountLoginApi({
      ...req,
      clientId: import.meta.env.VITE_CLIENT_ID,
      authType: AuthTypeEnum.ACCOUNT,
    })
    setToken(data.token)
    token.value = data.token
  }

  return {
    loginType,
    token,
    setLoginType,
    accountLogin,
  }
})
