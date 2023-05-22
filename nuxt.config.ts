import { consola } from 'consola'
import { prefetchQuery, siteQuery } from './queries'

const crawlLinks = process.env.NITRO_PRERENDER_CRAWL_LINKS === 'true'
if (crawlLinks) consola.info('Crawling links for prerendering')

export default defineNuxtConfig({
  modules: ['@leanera/nuxt-i18n', '@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      siteUrl: '',
      // Debug mode to print fetch errors in your template,
      // useful for debugging (optional)
      debug: false,
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

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    langImports: true,
    lazy: true,
    strategy: 'prefix',
    pages: {
      about: {
        de: '/ueber-uns',
      },
    },
    routeOverrides: {
      // Use `en` catch-all page as fallback for non-existing pages
      '/en/:slug(.*)*': '/:slug(.*)*',
    },
  },

  nitro: {
    prerender: {
      // Enable Nitro's crawler to prerender all pages (optional)
      // If Kirby content changes, the frontend will have to be rebuilt
      crawlLinks,
      routes: ['/en'],
    },
  },

  experimental: {
    payloadExtraction: crawlLinks,
  },

  typescript: {
    // Recommended: type check in dev and on build
    // typeCheck: true,
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
})
