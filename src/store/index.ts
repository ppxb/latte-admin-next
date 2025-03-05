import type { PiniaPluginContext } from 'pinia'
import type { App } from 'vue'
import { createPinia } from 'pinia'

import { SetupStoreId } from '~/enum'
import { jsonClone } from '~/utils'

export * from './modules/app'
export * from './modules/route'
export * from './modules/theme'
export * from './modules/user'

export function enhanceStoreReset(context: PiniaPluginContext) {
  const setupStoreIds = Object.values(SetupStoreId) as string[]

  if (setupStoreIds.includes(context.store.$id)){
    const originalState = jsonClone(context.store.$state)

    context.store.$reset = () => {
      context.store.$patch(originalState)
    }
  }
}

export function setupStore(app: App) {
  const store = createPinia()

  store.use(enhanceStoreReset)

  app.use(store)
}
