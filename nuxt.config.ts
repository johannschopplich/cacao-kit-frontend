import { consola } from 'consola'
import { prefetchQuery, siteQuery } from './queries'

const shouldPrerender = process.env.NITRO_PRERENDER_PAGES === 'true'
if (shouldPrerender) consola.info('Nitro page prerendering enabled')

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

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

  experimental: {
    inlineSSRStyles: false,
    payloadExtraction: shouldPrerender,
  },

  typescript: {
    typeCheck: 'build',
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
})
