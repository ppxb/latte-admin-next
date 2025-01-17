export interface ImageCaptchaResp {
  uuid: string
  img: string
  expireTime: number
  isEnabled: boolean
}

export interface BehaviorCaptchaResp {
  originalImageBase64: string
  point: {
    x: number
    y: number
  }
  jigsawImageBase64: string
  token: string
  secretKey: string
  wordList: string[]
}

export interface BehaviorCaptchaReq {
  captchaType?: string
  captchaVerification?: string
  clientUid?: string
}

export interface CheckBehaviorCaptchaResp {
  repCode: string
  repMsg: string
}
