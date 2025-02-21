import http from '~/utils/http'

const BASE_URL = '/auth'

/** 账号登录 */
export function accountLogin(req: Api.AccountLoginReq) {
  return http.post<Api.LoginResp>(`${BASE_URL}/login`, req)
}

/** 手机号登录 */
export function phoneLogin(req: Api.PhoneLoginReq) {
  return http.post<Api.LoginResp>(`${BASE_URL}/login`, req)
}

/** 邮箱登录 */
export function emailLogin(req: Api.EmailLoginReq) {
  return http.post<Api.LoginResp>(`${BASE_URL}/login`, req)
}

/** 三方账号登录 */
export function socialLogin(req: any) {
  return http.post<Api.LoginResp>(`${BASE_URL}/login`, req)
}

/** 三方账号登录授权 */
export function socialAuth(source: string) {
  return http.get<Api.SocialAuthAuthorizeResp>(`${BASE_URL}/${source}`)
}

/** 退出登录 */
export function logout() {
  return http.post(`${BASE_URL}/logout`)
}

/** 获取用户信息 */
export function getUserInfo() {
  return http.get<Api.UserInfo>(`${BASE_URL}/user/info`)
}

/** 获取路由信息 */
export function getUserRoute() {
  return http.get<Api.RouteItem[]>(`${BASE_URL}/user/route`)
}
