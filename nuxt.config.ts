import { consola } from 'consola'
import { prefetchQuery, siteQuery } from './queries'

const shouldPrerender = process.env.NITRO_PRERENDER_PAGES === 'true'
if (shouldPrerender) consola.info('Nitro page prerendering enabled')

export default defineNuxtConfig({
  modules: ['@leanera/nuxt-i18n', '@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

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
      ...(shouldPrerender && {
        crawlLinks: shouldPrerender,
        routes: ['/en'],
        // Ignore homepage, which redirects to the user's locale
        ignore: ['/'],
      }),
    },
  },

  experimental: {
    inlineSSRStyles: false,
    payloadExtraction: shouldPrerender,
  },

  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
})
