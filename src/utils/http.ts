import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import qs from 'query-string'

import { getToken } from '~/utils/auth'

interface CodeMessage {
  [key: number]: string
}

const StatusCodeMessage: CodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器端错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX ?? import.meta.env.VITE_API_BASE_URL,
  timeout: 30 * 1000,
})

function handleError(msg: string) {
  if (msg.length >= 15) {
    return window.$notification?.error({
      title: '警告',
      content: msg || '服务器端错误',
    })
  }
  return window.$message?.error(msg || '服务器端错误', { duration: 3 * 1000 },
  )
}

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token && config.headers) {
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
    if (code === '401' && response.config.url !== '/auth/user/info') {
      window.$dialog?.warning({
        title: '提示',
        content: msg,
        maskClosable: false,
        closeOnEsc: false,
        positiveText: '重新登录',
        onPositiveClick: () => {
          // const userStore = useUserStore()
          // userStore.logoutCallBack()
          // router.replace('/login')
        },

      })
    }
    else {
      handleError(msg)
    }
    return Promise.reject(new Error(msg || '服务器端错误'))
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

async function request<T = unknown>(config: AxiosRequestConfig): Promise<Api.Res<T>> {
  return http.request<T>(config)
    .then((res: AxiosResponse) => res.data)
    .catch((err: { msg: string }) => Promise.reject(err))
}

async function requestNative<T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return http
    .request<T>(config)
    .then((res: AxiosResponse) => res)
    .catch((err: { msg: string }) => Promise.reject(err))
}

function createRequest(method: string) {
  return <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<Api.Res<T>> => {
    return request({
      method,
      url,
      [method === 'get' ? 'params' : 'data']: params,
      ...(method === 'get'
        ? { paramsSerializer: obj => qs.stringify(obj) }
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
    paramsSerializer: obj => qs.stringify(obj),
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
