import { defineStore } from 'pinia'

import {
  accountLogin as accountLoginApi,
  emailLogin as emailLoginApi,
  getUserInfo as getUserInfoApi,
  logout as logoutApi,
  phoneLogin as phoneLoginApi,
  socialLogin as socialLoginApi,
} from '~/apis'
import { AuthTypeEnum } from '~/constants'
import { resetRouter } from '~/router'
import { resetHasInitializedRoutes } from '~/router/guard'
import { clearToken, getToken, setToken } from '~/utils/auth'

const defaultUserInfo: Api.UserInfo = {
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
}

function userStore() {
  const userInfo = reactive<Api.UserInfo>({ ...defaultUserInfo })
  const token = ref(getToken() || '')
  const pwdExpiredShow = ref(false)
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

  const username = computed(() => userInfo.username)
  const nickname = computed(() => userInfo.nickname)
  const avatar = computed(() => userInfo.avatar)

  const resetUserState = () => {
    Object.assign(userInfo, defaultUserInfo)
    roles.value = []
    permissions.value = []
    pwdExpiredShow.value = false
  }

  const resetToken = () => {
    token.value = ''
    resetHasInitializedRoutes()
    clearToken()
  }

  const accountLogin = async (req: Api.AccountLoginReq) => {
    const { data } = await accountLoginApi({
      ...req,
      clientId: import.meta.env.VITE_CLIENT_ID,
      authType: AuthTypeEnum.ACCOUNT,
    })
    setToken(data.token)
    token.value = data.token
  }

  const emailLogin = async (req: Api.EmailLoginReq) => {
    const { data } = await emailLoginApi({
      ...req,
      clientId: import.meta.env.VITE_CLIENT_ID,
      authType: AuthTypeEnum.EMAIL,
    })
    setToken(data.token)
    token.value = data.token
  }

  const phoneLogin = async (req: Api.PhoneLoginReq) => {
    const { data } = await phoneLoginApi({
      ...req,
      clientId: import.meta.env.VITE_CLIENT_ID,
      authType: AuthTypeEnum.PHONE,
    })
    setToken(data.token)
    token.value = data.token
  }

  const socialLogin = async (source: string, req: Record<string, any>) => {
    const { data } = await socialLoginApi({
      ...req,
      source,
      clientId: import.meta.env.VITE_CLIENT_ID,
      authType: AuthTypeEnum.SOCIAL,
    })
    setToken(data.token)
    token.value = data.token
  }

  const getUserInfo = async () => {
    const { data } = await getUserInfoApi()
    const {
      roles: userRoles = [],
      permissions: userPermissions = [],
      ...rest
    } = data
    Object.assign(userInfo, rest)
    roles.value = userRoles
    permissions.value = userPermissions
  }

  const logoutCallBack = () => {
    resetUserState()
    resetToken()
    resetRouter()
  }

  const logout = async () => {
    await logoutApi()
    logoutCallBack()
    window.$message?.success('退出登录成功')
  }

  return {
    userInfo,
    token,
    pwdExpiredShow,
    roles,
    permissions,
    username,
    nickname,
    avatar,
    accountLogin,
    emailLogin,
    phoneLogin,
    socialLogin,
    logout,
    logoutCallBack,
    getUserInfo,
    resetToken,
  }
}

export const useUserStore = defineStore('user', userStore)
