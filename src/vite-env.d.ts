/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  /** Origin of the backend that hosts the better-auth server. */
  readonly VITE_BETTER_AUTH_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
