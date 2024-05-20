import type { NuxtApp, NuxtError } from '#app'
import { siteQuery } from '~/queries'

export default defineNuxtPlugin(async (nuxtApp) => {
  const site = useSite()
  const i18n = nuxtApp.$i18n as NuxtApp['$i18n']

  // Initially load the site data
  if (import.meta.server) {
    await updateSite()
  }

  // Update the site data on locale change
  if (import.meta.client) {
    i18n.onBeforeLanguageSwitch = async (
      oldLocale: string,
      newLocale: string,
    ) => {
      if (oldLocale !== newLocale) {
        if (import.meta.dev)
          // eslint-disable-next-line no-console
          console.log('Locale changed:', oldLocale, '->', newLocale)

        await updateSite(newLocale)
      }
    }
  }

  async function updateSite(newLocale?: string) {
    try {
      const data = await $kql(siteQuery, {
        language: newLocale || i18n.locale.value,
      })
      site.value = data?.result || {}
    } catch (e) {
      console.error('Error loading site data:', (e as NuxtError).message)
    }
  }
})
