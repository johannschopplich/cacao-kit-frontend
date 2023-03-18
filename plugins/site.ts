import type { FetchError } from 'ofetch'

export default defineNuxtPlugin(async () => {
  const { locale } = useI18n()
  const site = useSite()

  // Initially load the site data
  if (process.server) {
    await updateSite()
  }

  // Update the site data on locale change
  if (process.client) {
    addRouteMiddleware(
      'site-update',
      async (to, from) => {
        const fromLocale = useRouteLocale(from)
        if (fromLocale !== locale.value) {
          if (process.dev)
            console.log('Locale changed:', fromLocale, '->', locale.value)

          await updateSite()
        }
      },
      { global: true }
    )
  }

  async function updateSite() {
    try {
      const data = await $kql(
        {
          query: 'site',
          select: {
            title: true,
            description: true,
            children: {
              query: 'site.children',
              select: ['uri', 'title', 'isListed'],
            },
            cover: {
              query: 'site.cover.toFile?.resize(1200)',
              select: ['url'],
            },
          },
        },
        { language: locale.value }
      )

      site.value = data?.result || {}
    } catch (e) {
      console.error('Error loading site data:', (e as FetchError).message)
    }
  }
})
