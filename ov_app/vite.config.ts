import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"], // 👈 important
  },
  server: {
    proxy: {
      "/ovapi": {
        target: "https://v0.ovapi.nl",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/ovapi/, ""),
      },
    },
  },
});
