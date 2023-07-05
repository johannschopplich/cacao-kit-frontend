import process from 'node:process'
import { consola } from 'consola'
import { prefetchQuery, siteQuery } from './queries'

const shouldPrerender = process.env.NITRO_PRERENDER_PAGES === 'true'
if (shouldPrerender) consola.info('Prerendering enabled')

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

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

  nitro: {
    prerender: {
      // Enable Nitro's crawler to prerender all pages (optional)
      // If Kirby content changes, the frontend will have to be rebuilt
      ...(shouldPrerender && {
        crawlLinks: shouldPrerender,
        routes: ['/'],
      }),
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
