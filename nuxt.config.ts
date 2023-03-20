import { prefetchQuery, siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@leanera/nuxt-i18n', '@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  kql: {
    auth: 'bearer',
    prefetch: {
      kirbyGlobal: prefetchQuery,
      // Currently only used to infer the type of the `site` query
      kirbySite: siteQuery,
    },
    server: {
      cache: true,
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    langImports: true,
    lazy: true,
    strategy: 'prefix',
    routeOverrides: {
      // Use `en` catch-all page for all other locales
      '/en/:id(.*)*': '/:id(.*)*',
    },
  },

  nitro: {
    prerender: {
      // Enable Nitro's crawler (optional) – this will fetch all pages
      // If Kirby content changes, the frontend will have to be rebuilt
      crawlLinks: true,
      routes: ['/en'],
    },
  },

  typescript: {
    // Recommended: type check in dev and on build
    // typeCheck: true,
    shim: false,
  },
})
