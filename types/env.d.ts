/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPEN_DEVTOOLS: string
  readonly VITE_API_PREFIX: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_BASE: string
  readonly VITE_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
