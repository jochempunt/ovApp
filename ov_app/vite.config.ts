import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'OV-Departures',
        short_name: 'Departures',
        description: 'Real-time public transit departure board (except NS)',
        theme_color: '#011c37',
        background_color: '#000022',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'web-app-manifest-192x192.png',  // ← Changed to match your filename
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'web-app-manifest-512x512.png',  // ← Changed to match your filename
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // Cache API calls going through /ovapi/ rewrite
            urlPattern: /^\/ovapi\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ov-api-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 5 
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true // Enable PWA in dev mode for testing
      }
    })
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
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