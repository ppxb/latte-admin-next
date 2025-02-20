import type { TreeOption } from 'naive-ui'
import http from '~/utils/http'

const BASE_URL = '/common'

export function listDeptTree(query: { description: string }) {
  return http.get<TreeOption[]>(`${BASE_URL}/tree/dept`, query)
}

export function listMenuTree(query: { description: string }) {
  return http.get<TreeOption[]>(`${BASE_URL}/tree/menu`, query)
}

export function listUserDict(query?: { status: number }) {
  return http.get<App.DictItem[]>(`${BASE_URL}/dict/user`, query)
}

export function listRoleDict(query?: { name: string, status: number }) {
  return http.get<App.DictItem[]>(`${BASE_URL}/dict/role`, query)
}

export function listCommonDict(code: string) {
  return http.get<App.DictItem[]>(`${BASE_URL}/dict/${code}`)
}

export function listSiteOptionDict() {
  return http.get<App.DictItem[]>(`${BASE_URL}/dict/option/site`)
}

export function uploadFile(data: FormData) {
  return http.post(`${BASE_URL}/file`, data)
}
