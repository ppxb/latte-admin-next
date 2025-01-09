import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImportPlugin() {
  return AutoImport({
    imports: [
      'vue',
      'vue-router',
      {
        vue: ['useTemplateRef', 'onWatcherCleanup', 'useId'],
      },
    ],
    resolvers: [ElementPlusResolver()],
    dts: './types/auto-imports.d.ts',
  })
}
