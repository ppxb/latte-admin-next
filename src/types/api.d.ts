declare namespace Api{
  interface Res<T> {
    code: number
    data: T
    msg: string
    success: boolean
    timestamp: string
  }

  interface PageRes<T> {
    list: T
    total: number
  }

  interface PageQuery {
    page: number
    size: number
  }

  interface ImageCaptchaResp {
    uuid: string
    img: string
    expireTime: number
    isEnabled: boolean
  }

  interface BehaviorCaptchaResp {
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

  interface BehaviorCaptchaReq {
    captchaType?: string
    captchaVerification?: string
    clientUid?: string
  }

  interface CheckBehaviorCaptchaResp {
    repCode: string
    repMsg: string
  }
}
