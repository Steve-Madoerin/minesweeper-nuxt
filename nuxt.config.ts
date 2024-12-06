// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'minesweeper-nuxt', // App window nav title
      
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#121212' },
        // ...
      ],
      link: [
        { rel: 'manifest', href: 'manifest.json' },
        { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-vuefire',
  ],
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: false,
    },
    config: {
      apiKey: "AIzaSyDfE5mnEwDbsPLhJEMk-ymvndD8yNpJ6L4",
      authDomain: "minesweeper-firebase-cbd5b.firebaseapp.com",
      projectId: "minesweeper-firebase-cbd5b",
      storageBucket: "minesweeper-firebase-cbd5b.firebasestorage.app",
      messagingSenderId: "709061175495",
      appId: "1:709061175495:web:694d6bff4d9274f02bb6e2"
    },
  },
  imports: {
    dirs: ['stores'],
  },
  css: ['bootstrap-icons/font/bootstrap-icons.css'],
  pwa: {  
    registerType: 'autoUpdate',
    includeManifestIcons: true,
    includeAssets: [
      'favicon.ico',
      'apple-touch-icon-180x180.png',
      'maskable-icon-512x512.png',
      'minesweeper.mp4',
    ],
    manifest: {
      name: 'minesweeper-nuxt',
      lang: 'en',
      start_url: '/',
      background_color: '#ffffff',
      orientation: 'landscape',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: ({ request }) =>
            request.destination === 'style' ||
            request.destination === 'script' ||
            request.destination === 'font' ||
            request.destination === 'worker',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 42 * 24 * 60 * 60, // 42 days
            },
          },
        },
      ],
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      //clientsClaim: true,
    },
  },

  compatibilityDate: '2024-12-05',
})