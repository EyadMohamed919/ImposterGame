interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_WEBSOCKET_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}