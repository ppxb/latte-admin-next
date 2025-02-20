import { createPinia } from 'pinia'
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/app'

const store = createPinia()
store.use(PiniaPluginPersistedstate)

export default store
