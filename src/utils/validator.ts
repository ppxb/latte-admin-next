import type { FormItemRule } from 'naive-ui'

export function createFormValidator(message: string) {
  return (_: FormItemRule, value: string) => {
    return new Promise((resolve, reject) => {
      if (value?.trim())
        resolve(true)
      else
        reject(new Error(message))
    })
  }
}
