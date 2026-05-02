import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Standard Vite config for Production (Hostinger/GitHub Ready)
export default defineConfig({
  // Set to '/' for root domains or '/repo-name/' for GitHub Pages
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Enable source maps for easier debugging if needed, but usually false for production
    sourcemap: false,
    // esbuild is Vite's built-in minifier — fast and zero config
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  // Strip console.log and debugger statements from production build
  // (top-level esbuild config — this is the correct location in Vite)
  esbuild: {
    drop: ["console", "debugger"],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  }
});
