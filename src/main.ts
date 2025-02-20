import { createApp } from 'vue'

import router from '~/router'
import store from '~/store'

import App from './App.vue'

import '~/styles/global.css'
import '~/styles/naive-ui/index.css'
import 'uno.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
