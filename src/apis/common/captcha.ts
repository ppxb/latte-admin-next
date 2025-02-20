import http from '~/utils/http'

const BASE_URL = '/captcha'

export function getImageCaptcha() {
  return http.get<Api.ImageCaptchaResp>(`${BASE_URL}/image`)
}

export function getSmsCaptcha(phone: string, captchaReq: Api.BehaviorCaptchaReq) {
  return http.get<boolean>(`${BASE_URL}/sms?phone=${phone}&captchaVerification=${encodeURIComponent(captchaReq.captchaVerification || '')}`)
}

export function getEmailCaptcha(email: string, captchaReq: Api.BehaviorCaptchaReq) {
  return http.get<boolean>(`${BASE_URL}/mail?email=${email}&captchaVerification=${encodeURIComponent(captchaReq.captchaVerification || '')}`)
}

export function getBehaviorCaptcha(req: any) {
  return http.get<Api.BehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}

export function checkBehaviorCaptcha(req: any) {
  return http.post<Api.CheckBehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}
