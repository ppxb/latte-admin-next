import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { stringify } from 'qs'

import { message, messageBox, notification } from '~/composables'
import router from '~/router'

import { getToken } from './auth'

interface ICodeMessage {
  [propName: number]: string
}

const StatusCodeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求错误（400）',
  401: '未授权，请重新登录（401）',
  403: '拒绝访问（403）',
  404: '请求出错（404）',
  408: '请求超时（408）',
  500: '服务器错误（500）',
  501: '服务未实现（501）',
  502: '网络错误（502）',
  503: '服务不可用（503）',
  504: '网络超时（504）',
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX ?? import.meta.env.VITE_API_BASE_URL,
  timeout: 30 * 1000,
})

function handleError(msg: string) {
  if (msg.length >= 15) {
    return notification({ title: '系统错误', message: msg, type: 'error' })
  }
  return message({ msg: msg ?? '服务端错误', type: 'error' })
}

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { success, code, msg } = data

    if (response.request.responseType === 'blob' || success) {
      return response
    }
    console.log(msg)
    if (code === '401' && response.config.url !== '/auth/user/info') {
      messageBox(msg, {
        title: '提示',
        confirmButtonText: '重新登录',
        closeOnPressEscape: false,
        showClose: false,
        callback: async () => {
          await router.replace('/login')
        },
      })
    }
    else {
      handleError(msg)
    }
    return Promise.reject(new Error(msg || '服务器错误'))
  },
  (error: AxiosError) => {
    if (!error.response) {
      handleError('网络连接失败，请检查您的网络')
      return Promise.reject(error)
    }
    const status = error.response?.status
    const errorMsg = StatusCodeMessage[status] || '服务器暂时未响应，请刷新页面并重试。若无法解决，请联系管理员'
    handleError(errorMsg)
    return Promise.reject(error)
  },
)

async function request<T = unknown>(config: AxiosRequestConfig): Promise<ApiRes<T>> {
  return http.request<T>(config)
    .then((res: AxiosResponse) => res.data)
    .catch(err => Promise.reject(err))
}

async function requestNative<T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return http
    .request<T>(config)
    .then((res: AxiosResponse) => res)
    .catch(err => Promise.reject(err))
}

function createRequest(method: string) {
  return <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
    return request({
      method,
      url,
      [method === 'get' ? 'params' : 'data']: params,
      ...(method === 'get'
        ? {
            paramsSerializer: obj => stringify(obj),
          }
        : {}),
      ...config,
    })
  }
}

function download(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  return requestNative({
    method: 'get',
    url,
    responseType: 'blob',
    params,
    paramsSerializer: obj => stringify(obj),
    ...config,
  })
}

export default {
  get: createRequest('get'),
  post: createRequest('post'),
  put: createRequest('put'),
  patch: createRequest('patch'),
  del: createRequest('delete'),
  request,
  requestNative,
  download,
}