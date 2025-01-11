import { defineStore } from 'pinia'

import {
  type AccountLoginReq,
  AuthTypeEnum,
  type LoginType,
  type UserInfo,
} from '~/api/auth/type'
import {
  accountLogin as accountLoginApi,
  getUserInfo as getUserInfoApi,
  logout as logoutApi,
} from '~/api/auth'
import { clearToken, getToken, setToken } from '~/utils/auth'
import { resetRouter } from '~/router'
import { resetHasRouteFlag } from '~/router/guard'

export const useUserStore = defineStore('user', () => {
  const loginType = ref<LoginType>('account')
  const userInfo = reactive<UserInfo>({
    id: '',
    username: '',
    nickname: '',
    gender: 0,
    email: '',
    phone: '',
    avatar: '',
    pwdResetTime: '',
    pwdExpired: false,
    registrationDate: '',
    deptName: '',
    roles: [],
    permissions: [],
  })
  const nickname = computed(() => userInfo.nickname)
  const username = computed(() => userInfo.username)
  const avatar = computed(() => userInfo.avatar)

  const token = ref<string>(getToken() || '')
  const pwdExpiredShow = ref<boolean>(true)
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

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

  const getUserInfo = async () => {
    const { data } = await getUserInfoApi()
    Object.assign(userInfo, data)
    roles.value = data.roles || []
    permissions.value = data.permissions || []
  }

  const resetToken = () => {
    token.value = ''
    clearToken()
    resetHasRouteFlag()
  }

  const logoutReset = async () => {
    roles.value = []
    permissions.value = []
    pwdExpiredShow.value = true
    resetToken()
    resetRouter()
  }

  const logout = async () => {
    try {
      await logoutApi()
      await logoutReset()
      return true
    }
    catch (error) {
      console.error('登录错误：', error)
      return false
    }
  }

  return {
    loginType,
    userInfo,
    nickname,
    username,
    avatar,
    token,
    roles,
    permissions,
    pwdExpiredShow,
    setLoginType,
    accountLogin,
    logout,
    logoutReset,
    getUserInfo,
    resetToken,
  }
})
