import type { NotificationOptions } from 'element-plus'
import { ElNotification } from 'element-plus'

export function notification(options: Partial<NotificationOptions>) {
  ElNotification(options)
}
