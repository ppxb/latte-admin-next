import { createApp } from 'vue'

import { setupI18n } from '~/locales'
import router from '~/router'
import { setupStore } from '~/store'

import App from './App.vue'
import '~/styles/global.css'
import '~/styles/naive-ui/index.css'
import 'uno.css'

const app = createApp(App)

setupStore(app)

setupI18n(app)

app.use(router)

app.mount('#app')
