import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import appInfo from './app-info'
import createAutoImportPlugin from './auto-import'
import createComponentsPlugin from './components'
import createDevtoolsPlugin from './devtools'

export default function createVitePlugins(env: ImportMetaEnv, isBuild: boolean) {
  const plugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    appInfo(),
  ]

  plugins.push(createAutoImportPlugin())
  plugins.push(createDevtoolsPlugin(env))
  plugins.push(createComponentsPlugin())

  return plugins
}
