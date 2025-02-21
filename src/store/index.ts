import { createPinia } from 'pinia'
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/app'
export * from './modules/route'
export * from './modules/user'

const store = createPinia()
store.use(PiniaPluginPersistedstate)

export default store
