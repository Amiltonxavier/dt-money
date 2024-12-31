import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

interface ImportMetaEnv {
  readonly VITE_APP_APPWRITE: string;
  // Adicione outras variáveis de ambiente aqui, se necessário.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
