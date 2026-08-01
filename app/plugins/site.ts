import type { FetchError } from 'ofetch'
import { siteQuery } from '~/queries'

export default defineNuxtPlugin(async () => {
  const site = useSite()

  try {
    const data = await $kql(siteQuery)
    site.value = data?.result || {}
  } catch (e) {
    console.error('Failed to fetch site data:', (e as FetchError).message)
  }
})
