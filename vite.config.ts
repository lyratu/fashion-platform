import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
import cdn from "vite-plugin-cdn-import";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    react(),
    cdn({
      modules: [
        "axios",
        "lodash",
        {
          name: "fabric",
          var: "fabric",
          path: "https://cdn.jsdelivr.net/npm/fabric@latest/dist/index.min.js",
        },
      ],
    }),
    tailwindcss(),
    visualizer({ open: true }),
    removeConsole(),
    viteCompression({
      threshold: 1024 * 20,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],

  server: {
    host: true,
    port: 3000,
    proxy: {
      "/app": {
        target: "http://39.107.60.183:8001",
        changeOrigin: true,
      },
      "/upload": {
        target: "http://39.107.60.183:8001",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      experimentalLogSideEffects: true,
      plugins: [visualizer({ open: true })],
      output: {
        experimentalMinChunkSize: 20 * 1024,
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash:6].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("tailwindcss")) {
              return "tailwindcss";
            }
            if (id.includes("react")) {
              return "react";
            }
            if (id.includes("react-dom")) {
              return "react-dom";
            }
            if (id.includes("react-router-dom")) {
              return "react-react-router-dom";
            }
            if (id.includes("axios")) {
              return "axios";
            }
            if (id.includes("lodash")) {
              return "lodash";
            }
          }
        },
      },
    },
  },
});
