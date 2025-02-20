/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_BASE: string
  readonly VITE_APP_SETTING: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_API_WS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
