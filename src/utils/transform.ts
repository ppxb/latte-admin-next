import { camelCase, upperFirst } from 'lodash-es'

import { isExternal } from './validate'

export function transformPathToName(path: string) {
  if (!path) {
    return ''
  }
  if (isExternal(path)) {
    return ''
  }
  return upperFirst(camelCase(path))
}
