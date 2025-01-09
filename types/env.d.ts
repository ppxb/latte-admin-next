/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPEN_DEVTOOLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
