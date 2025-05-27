import process from 'node:process'
import { prefetchQuery, siteQuery } from './app/queries'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

  compatibilityDate: '2025-01-01',

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  kql: {
    auth: 'bearer',
    prefetch: {
      kirbyStatic: prefetchQuery,
      // Currently only used to infer the type of the `site` query
      kirbySite: siteQuery,
    },
  },

  vite: {
    server: {
      // This is only required for the `pnpm dev:tunnel` command
      // to proxy Kirby requests, especially images
      proxy: {
        '/__kirby': {
          target: process.env.KIRBY_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/__kirby/, ''),
        },
      },
    },
  },
})
