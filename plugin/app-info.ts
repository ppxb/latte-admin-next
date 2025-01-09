import type { Plugin } from 'vite'
import boxen from 'boxen'
import picocolors from 'picocolors'

const versions = {
  ui: '1.0.0',
  starter: '1.1.1',
  admin: '1.1.1',
}

export default function appInfo(): Plugin {
  return {
    name: 'appInfo',
    apply: 'serve',
    async buildStart() {
      const { bold, green, cyan, blue, bgGreen } = picocolors

      const message = [
        bold(green(bgGreen(` Latte Admin UI v${versions.ui} `))),
        cyan(`Latte Starter：${versions.starter}`),
        cyan(`Latte Admin：${versions.admin}`),
        cyan(`Node.js：${process.version}`),
        blue('持续迭代优化的前后端分离中后台管理系统框架'),
      ].join('\n')

      console.log(
        boxen(message, {
          padding: 1,
          margin: 1,
          borderStyle: 'double',
          textAlignment: 'center',
          borderColor: 'green',
          title: '应用信息',
        }),
      )
    },
  }
}
