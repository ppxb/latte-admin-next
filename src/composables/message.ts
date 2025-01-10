import type { MessageOptions, messageTypes } from 'element-plus'
import { ElMessage } from 'element-plus'

type MessageType = typeof messageTypes[number]

interface MessageProps {
  msg: string
  type?: MessageType
  options?: MessageOptions
}

export function message({ msg, type = 'success', options = {} }: MessageProps) {
  ElMessage({
    message: msg,
    type,
    plain: true,
    duration: 2 * 1000,
    ...options,
  })
}
