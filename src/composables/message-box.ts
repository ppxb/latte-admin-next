import type { ElMessageBoxOptions } from 'element-plus'
import { ElMessageBox } from 'element-plus'

export function messageBox(msg: string, options: ElMessageBoxOptions) {
  ElMessageBox({
    message: msg,
    ...options,
  })
}
