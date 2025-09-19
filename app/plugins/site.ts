import type { NuxtApp } from '#app'
import type { FetchError } from 'ofetch'
import { siteQuery } from '~/queries'

export default defineNuxtPlugin(async (nuxtApp) => {
  const site = useSite()
  const i18n = nuxtApp.$i18n as NuxtApp['$i18n']

  if (import.meta.server) {
    // Load the site data server-side
    await updateSite()
  } else if (import.meta.client) {
    // Update the site data on locale change
    nuxtApp.hook(
      'i18n:beforeLocaleSwitch',
      async ({ oldLocale, newLocale }) => {
        if (oldLocale !== newLocale) {
          if (import.meta.dev)
            // eslint-disable-next-line no-console
            console.log('Locale changed:', oldLocale, '->', newLocale)

          await updateSite(newLocale)
        }
      },
    )
  }

  async function updateSite(newLocale?: string) {
    try {
      const data = await $kql(siteQuery, {
        language: newLocale || i18n.locale.value,
      })
      site.value = data?.result || {}
    } catch (e) {
      console.error('Failed to fetch site data:', (e as FetchError).message)
    }
  }
})
