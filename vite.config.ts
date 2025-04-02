import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/app": {
        target: "http://127.0.0.1:8001",
        changeOrigin: true,
      },
      "/upload": {
        target: "http://127.0.0.1:8001",
        changeOrigin: true,
      },
    },
  },
});
