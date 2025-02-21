import type { FormItemRule } from 'naive-ui'

export function createFormValidator(message: string) {
  return (_: FormItemRule, value: string) => {
    return new Promise((resolve, reject) => {
      if (value?.trim())
        resolve(value)
      else
        reject(new Error(message))
    })
  }
}

export function isExternal(path: string) {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

export function isHttp(url: string) {
  return url.includes('http://') || url.includes('https://')
}

export function isIPv4(ip: string): boolean {
  const ipv4Pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return ipv4Pattern.test(ip)
}
