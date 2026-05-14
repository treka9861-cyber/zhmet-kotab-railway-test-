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
    sourcemap: false,
    minify: "esbuild",
    // Raise the warning limit slightly — our chunks are now properly split
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Core React runtime (cached forever, rarely changes)
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // ── Routing
          if (id.includes("node_modules/wouter")) {
            return "vendor-router";
          }
          // ── Supabase (large SDK)
          if (id.includes("node_modules/@supabase")) {
            return "vendor-supabase";
          }
          // ── Animations (Framer Motion is heavy)
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-animations";
          }
          // ── Charts & data viz
          if (id.includes("node_modules/recharts") || id.includes("node_modules/d3")) {
            return "vendor-charts";
          }
          // ── UI component libraries (Radix, etc.)
          if (id.includes("node_modules/@radix-ui")) {
            return "vendor-ui";
          }
          // ── Tanstack Query
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }
          // ── Icons
          if (id.includes("node_modules/lucide-react") || id.includes("node_modules/react-icons")) {
            return "vendor-icons";
          }
          // ── Excel/file utils (heavy, rarely needed)
          if (id.includes("node_modules/xlsx") || id.includes("node_modules/axios")) {
            return "vendor-utils";
          }
          // ── Everything else in node_modules
          if (id.includes("node_modules")) {
            return "vendor-misc";
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
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  }
});
