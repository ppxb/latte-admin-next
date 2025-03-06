import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import { getBuildTime } from './build/config'
import createVitePlugins from './plugins'

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd()) as ImportMetaEnv

  const buildTime = getBuildTime()

  return {
    base: viteEnv.VITE_BASE,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: createVitePlugins(),
    server: {
      proxy: {
        '/api': {
          target: viteEnv.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
  }
})
