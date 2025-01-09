import VueDevtools from 'vite-plugin-vue-devtools'

export default function createDevtoolsPlugin({ VITE_OPEN_DEVTOOLS }: ImportMetaEnv) {
  return VITE_OPEN_DEVTOOLS === 'true' && VueDevtools()
}
