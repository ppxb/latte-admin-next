declare namespace Api{
  /** 性别（0：未知；1：男；2：女；） */
  type GenderType = 0 | 1 | 2

  /** 状态（0：禁用；1：启用；） */
  type StatusType = 0 | 1

  interface Res<T> {
    code: number
    data: T
    msg: string
    success: boolean
    timestamp: string
  }

  interface PageRes<T> {
    list: T
    total: number
  }

  interface PageQuery {
    page: number
    size: number
  }

  interface ImageCaptchaResp {
    uuid: string
    img: string
    expireTime: number
    isEnabled: boolean
  }

  interface BehaviorCaptchaResp {
    originalImageBase64: string
    point: {
      x: number
      y: number
    }
    jigsawImageBase64: string
    token: string
    secretKey: string
    wordList: string[]
  }

  interface BehaviorCaptchaReq {
    captchaType?: string
    captchaVerification?: string
    clientUid?: string
  }

  interface CheckBehaviorCaptchaResp {
    repCode: string
    repMsg: string
  }

  interface AuthReq {
    clientId?: string
    authType?: string
  }

  /** 账号登录请求参数 */
  interface AccountLoginReq extends AuthReq {
    username: string
    password: string
    captcha: string
    uuid: string
  }

  /** 手机号登录请求参数 */
  interface PhoneLoginReq extends AuthReq {
    phone: string
    captcha: string
  }

  /** 邮箱登录请求参数 */
  interface EmailLoginReq extends AuthReq {
    email: string
    captcha: string
  }

  /** 登录响应 */
  interface LoginResp {
    token: string
  }

  /** 第三方登录授权响应 */
  interface SocialAuthAuthorizeResp {
    authorizeUrl: string
  }

  interface UserInfo {
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

  interface RouteItem {
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
    status: StatusType
    children: RouteItem[]
    activeMenu: string
    alwaysShow: boolean
    breadcrumb: boolean
    showInTabs: boolean
    affix: boolean
  }
}
