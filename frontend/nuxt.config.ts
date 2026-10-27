// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  routeRules: {
    // Static/SEO pages: server-rendered (prerendered where possible)
    '/': { prerender: true },
    // Interactive pages: SPA, rendered in the browser only
    '/home': { ssr: false },
    '/teacher': { ssr: false },
  },

  // Browser calls /api/*; in dev Nitro forwards to the Go API.
  // In production, route /api/* to the API at the reverse proxy.
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_API_PROXY_TARGET ?? 'http://localhost:8080',
        changeOrigin: true,
        prependPath: false,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
})
