import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'

import createAutoImport from './auto-import'
import createComponents from './components'

export default function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    UnoCSS(),
  ]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())

  return vitePlugins
}
