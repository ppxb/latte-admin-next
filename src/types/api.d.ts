declare namespace Api{
  namespace Common{
    interface PaginatingCommonParams{
      page: number
      size: number
      total: number
    }

    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams{
      list: T[]
    }

    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>

    /** 状态（1：启用；2：禁用；） */
    type EnableStatus = 1 | 2

    type CommonId = number | string

    type CommonRecord<T = any> = {
      id: CommonId
      createTime: string
      createUserString: string
      status: EnableStatus
    } & T
  }

  type User = Common.CommonRecord<{
    username: string
    nickname: string
    avatar: string
    gender: number
    email: string
    phone: string
    description: string
    isSystem?: boolean
    updateUserString: string
    updateTime: string
    deptId: string
    deptName: string
    roleIds: number[]
    roleNames: string[]
    disabled: boolean
  }>

  type UserSearchParams = RecordNullable<
    Pick<Api.User, 'description' | 'status' | 'createTime' | 'deptId'>
    & Common.CommonSearchParams
    & {
      sort: string[]
      userIds?: string[]
    }
  >

  type UserList = Common.PaginatingQueryRecord<User>

  /** 性别（0：未知；1：男；2：女；） */
  type UserGender = 0 | 1 | 2

  /** 性别（0：未知；1：男；2：女；） */
  type GenderType = 0 | 1 | 2

  /** 状态（1：启用；2：禁用；） */
  type StatusType = 1 | 2

  interface Res<T = unknown> {
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

  interface UserQuery {
    description?: string
    status?: number
    createTime?: Array<string>
    deptId?: string
    sort: Array<string>
    userIds?: Array<string>
  }

  interface UserPageQuery extends UserQuery, PageQuery {}

  export interface User {
    id: string
    username: string
    nickname: string
    avatar: string
    gender: number
    email: string
    phone: string
    description: string
    status: 1 | 2
    isSystem?: boolean
    createUserString: string
    createTime: string
    updateUserString: string
    updateTime: string
    deptId: string
    deptName: string
    roleIds: Array<number>
    roleNames: Array<string>
    disabled: boolean
  }

}
