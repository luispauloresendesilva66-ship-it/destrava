import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png', 'vite.svg'],
      manifest: {
        name: 'Destrava',
        short_name: 'Destrava',
        lang: 'pt-BR',
        theme_color: '#26215C',
        background_color: '#EEEDFE',
        display: 'standalone',
        start_url: '/painel',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Só o shell estático (assets do build). Sem runtimeCaching: vídeo (Backblaze),
        // Supabase e qualquer requisição cross-origin passam direto pela rede.
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: '/index.html',
        // Não engole arquivos/rotas que não são da SPA.
        navigateFallbackDenylist: [/^\/_/, /^\/api\//, /\.[a-z0-9]+$/i],
      },
    }),
  ],
  resolve: {
    alias: {
      '@domain': fileURLToPath(
        new URL('../supabase/functions/_shared/domain', import.meta.url),
      ),
      '@grader': fileURLToPath(
        new URL('../supabase/functions/_shared/grader', import.meta.url),
      ),
    },
  },
  server: {
    fs: { allow: ['..'] },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    globals: false,
  },
})
