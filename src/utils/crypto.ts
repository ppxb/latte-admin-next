import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'

const CRYPTO_CONSTANTS = {
  PUBLIC_KEY: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM51dgYtMyF+tTQt80sfFOpSV27a7t9uaUVeFrdGiVxscuizE7H8SMntYqfn9lp8a5GH5P1/GGehVjUD2gF/4kcCAwEAAQ==',
  DEFAULT_AES_KEY: 'XwKsGlMcdPMEhR1B',
} as const

export function encodeByBase64(txt: string): string {
  return CryptoJS.enc.Utf8.parse(txt).toString(CryptoJS.enc.Base64)
}

export function decodeByBase64(txt: string): string {
  return CryptoJS.enc.Base64.parse(txt).toString(CryptoJS.enc.Utf8)
}

export function encryptByMd5(txt: string): string {
  return CryptoJS.MD5(txt).toString()
}

export function encryptByRsa(txt: string): string | false {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(CRYPTO_CONSTANTS.PUBLIC_KEY)
  return encryptor.encrypt(txt)
}

export function encryptByAes(word: string, keyWord = CRYPTO_CONSTANTS.DEFAULT_AES_KEY): string {
  const key = CryptoJS.enc.Utf8.parse(keyWord)
  const content = CryptoJS.enc.Utf8.parse(word)

  return CryptoJS.AES.encrypt(content, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
}
