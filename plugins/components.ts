import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default function createComponents() {
  return Components({
    resolvers: [NaiveUiResolver()],
    dirs: ['src/components'],
    extensions: ['vue', 'tsx'],
    dts: './src/types/components.d.ts',
  })
}
