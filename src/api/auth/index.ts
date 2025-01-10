import type * as T from './type'

import http from '~/utils/http'

const BASE_URL = '/auth'

/** 账号登录 */
export function accountLogin(req: T.AccountLoginReq) {
  return http.post<T.LoginResp>(`${BASE_URL}/login`, req)
}

/** 手机号登录 */
export function phoneLogin(req: T.PhoneLoginReq) {
  return http.post<T.LoginResp>(`${BASE_URL}/login`, req)
}

/** 邮箱登录 */
export function emailLogin(req: T.EmailLoginReq) {
  return http.post<T.LoginResp>(`${BASE_URL}/login`, req)
}

/** 三方账号登录 */
export function socialLogin(req: any) {
  return http.post<T.LoginResp>(`${BASE_URL}/login`, req)
}

/** 三方账号登录授权 */
export function socialAuth(source: string) {
  return http.get<T.SocialAuthAuthorizeResp>(`${BASE_URL}/${source}`)
}

/** 退出登录 */
export function logout() {
  return http.post(`${BASE_URL}/logout`)
}

/** 获取用户信息 */
export function getUserInfo() {
  return http.get<T.UserInfo>(`${BASE_URL}/user/info`)
}

/** 获取路由信息 */
export function getUserRoute() {
  return http.get<T.RouteItem[]>(`${BASE_URL}/user/route`)
}
