/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origin of the backend that hosts the better-auth server. */
  readonly VITE_BETTER_AUTH_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
