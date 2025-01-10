export interface UserInfo {
  id: string
  username: string
  nickname: string
  gender: GenderType
  email: string
  phone: string
  avatar: string
  pwdResetTime: string
  pwdExpired: boolean
  registrationDate: string
  deptName: string
  roles: string[]
  permissions: string[]
}

export interface RouteItem {
  id: string
  title: string
  parentId: string
  type: 1 | 2 | 3
  path: string
  name: string
  component: string
  redirect: string
  icon: string
  isExternal: boolean
  isHidden: boolean
  isCache: boolean
  permission: string
  roles: string[]
  sort: number
  status: 0 | 1
  children: RouteItem[]
  activeMenu: string
  alwaysShow: boolean
  breadcrumb: boolean
  showInTabs: boolean
  affix: boolean
}

export type LoginType = 'account' | 'phone' | 'email' | 'forget'

export enum AuthTypeEnum {
  ACCOUNT = 'ACCOUNT',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  SOCIAL = 'SOCIAL',
}
export interface AuthReq {
  clientId?: string
  authType?: string
}

export interface AccountLoginReq extends AuthReq {
  username: string
  password: string
  captcha: string
  uuid: string
}

export interface PhoneLoginReq extends AuthReq {
  phone: string
  captcha: string
}

export interface EmailLoginReq extends AuthReq {
  email: string
  captcha: string
}

export interface LoginResp {
  token: string
}

export interface SocialAuthAuthorizeResp {
  authorizeUrl: string
}
