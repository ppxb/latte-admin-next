import { transformRecordToOption } from '~/utils/transform'

/** 认证类型 */
export enum AuthTypeEnum {
  ACCOUNT = 'ACCOUNT',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  SOCIAL = 'SOCIAL',
}

export const userGenderRecord: Record<Api.UserGender, string> = {
  0: '未知',
  1: '男',
  2: '女',
}

export const userGenderOptions = transformRecordToOption(userGenderRecord)
