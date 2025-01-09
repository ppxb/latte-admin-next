import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'

import { IconifyIconOffline, IconifyIconOnline } from '~/components/LaIcon'
import { setupRouter } from '~/router'

import { setupStore } from '~/store'
import App from './App.vue'
import './styles/reset.scss'
import './styles/index.scss'

import './styles/tailwind.css'

import 'element-plus/dist/index.css'

const app = createApp(App)

app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)

async function bootstrap() {
  setupStore(app)

  await setupRouter(app)

  app.use(MotionPlugin)

  app.mount('#app')
}

bootstrap()
