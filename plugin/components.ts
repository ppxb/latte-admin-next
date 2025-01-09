import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default function createComponentsPlugin() {
  return Components({
    resolvers: [ElementPlusResolver()],
    dts: './types/components.d.ts',
  })
}
