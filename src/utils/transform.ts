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

export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label,
  })) as Option<keyof T>[]
}
