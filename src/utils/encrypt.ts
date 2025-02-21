import CryptoJS from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
import UTF8 from 'crypto-js/enc-utf8'
import md5 from 'crypto-js/md5'
import { JSEncrypt } from 'jsencrypt'

const PUBLIC_KEY
  = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM51dgYtMyF+tTQt80sfFOpSV27a7t9u'
    + 'aUVeFrdGiVxscuizE7H8SMntYqfn9lp8a5GH5P1/GGehVjUD2gF/4kcCAwEAAQ=='

const DEFAULT_KEY_WORD = 'XwKsGlMcdPMEhR1B'

export function encodeByBase64(str: string) {
  return UTF8.parse(str).toString(Base64)
}

export function decodeByBase64(str: string) {
  return Base64.parse(str).toString(UTF8)
}

export function encodeByMD5(str: string) {
  return md5(str).toString()
}

export function encryptByRSA(str: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY)
  return encryptor.encrypt(str)
}

export function encryptByAES(word: string, keyword = DEFAULT_KEY_WORD) {
  const key = CryptoJS.enc.Utf8.parse(keyword)
  const arcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(arcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}
