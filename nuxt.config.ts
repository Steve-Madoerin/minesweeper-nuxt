// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  //ssr: true,
  //plugins: ['~/plugins/pinia.js'],
  modules: ['@vite-pwa/nuxt', '@vite-pwa/nuxt'],
  pwa: {  
    manifest: {
      name: 'minesweeper-vue',
      short_name: 'Minesweeper',
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
  },	

  
  

})