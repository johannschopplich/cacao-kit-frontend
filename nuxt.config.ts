const localeCodes = ['en', 'de']

export default defineNuxtConfig({
  // If your project doesn't require i18n, use the `without-i18n` branch instead:
  // https://github.com/johannschopplich/cacao-kit-frontend/tree/chore/without-i18n
  modules: ['@nuxtjs/i18n', '@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kirby'],

  compatibilityDate: '2026-11-01',

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  kirby: {
    auth: 'bearer',
    server: {
      cache: true,
      swr: true,
      maxAge: 60 * 10,
    },
  },

  $development: {
    kirby: {
      server: {
        cache: false,
      },
    },
  },

  prerender: {
    routes: localeCodes.map((code) => `/${code}`),
  },

  i18n: {
    locales: localeCodes.map((code) => ({ code, file: `${code}.json` })),
    defaultLocale: 'en',
    strategy: 'prefix',
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
    },
    bundle: {
      fullInstall: false,
    },
  },
})
