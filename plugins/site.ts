import { siteQuery } from '~/queries'
import type { FetchError } from 'ofetch'

export default defineNuxtPlugin(async (nuxtApp) => {
  const site = useSite()
  const i18n = nuxtApp.$i18n as ReturnType<typeof useI18n>
  const { locale } = i18n

  // Initially load the site data
  if (process.server) {
    await updateSite()
  }

  // Update the site data on locale change
  if (process.client) {
    i18n.onBeforeLanguageSwitch = async (
      oldLocale: string,
      newLocale: string,
    ) => {
      if (oldLocale !== newLocale) {
        if (process.dev)
          console.log('Locale changed:', oldLocale, '->', newLocale)

        await updateSite()
      }
    }
  }

  async function updateSite() {
    try {
      const data = await $kql(siteQuery, { language: locale.value })

      site.value = data?.result || {}
    } catch (e) {
      console.error('Error loading site data:', (e as FetchError).message)
    }
  }
})
