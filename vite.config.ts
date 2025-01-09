import { fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import createVitePlugins from './plugin'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv

  return {
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },

    server: {
      port: 5566,
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
  }
})
