export function isExternal(path: string) {
  const EXTERNAL_PATTERN = /^(https?:|mailto:|tel:)/
  return EXTERNAL_PATTERN.test(path)
}

export function isHttp(url: string) {
  const URL_PATTERN = /^https?:/i
  return URL_PATTERN.test(url)
}

export function isIPv4(ip: string): boolean {
  const IPV4_PATTERN = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)$/
  return IPV4_PATTERN.test(ip)
}
