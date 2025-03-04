import http from '~/utils/http'

const BASE_URL = '/system/user'

/** @desc 查询用户列表 */
export function fetchGetUserList(params?: Api.UserSearchParams) {
  return http.get<Api.UserList>(`${BASE_URL}`, params)
}
