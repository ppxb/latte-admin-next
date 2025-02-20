import AutoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      'vue-router',
      {
        'vue': ['useTemplateRef', 'onWatcherCleanup', 'useId'],
        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
      },
    ],
    dts: './src/types/auto-imports.d.ts',
  })
}
