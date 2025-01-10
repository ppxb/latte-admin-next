import type * as T from './type'
import http from '~/utils/http'

const BASE_URL = '/captcha'

export function getImageCaptcha() {
  return http.get<T.ImageCaptchaResp>(`${BASE_URL}/image`)
}

export function getSmsCaptcha(phone: string, captchaReq: T.BehaviorCaptchaReq) {
  return http.get<boolean>(`${BASE_URL}/sms?phone=${phone}&captchaVerification=${encodeURIComponent(captchaReq.captchaVerification || '')}`)
}

export function getEmailCaptcha(email: string, captchaReq: T.BehaviorCaptchaReq) {
  return http.get<boolean>(`${BASE_URL}/mail?email=${email}&captchaVerification=${encodeURIComponent(captchaReq.captchaVerification || '')}`)
}

export function getBehaviorCaptcha(req: any) {
  return http.get<T.BehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}

export function checkBehaviorCaptcha(req: any) {
  return http.post<T.CheckBehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}
