import { joinURL } from 'ufo'
import { kirbyStatic } from '#nuxt-kql'
import type { KirbyPageData } from '~/queries'

/**
 * Returns static data prefetched at build time
 */
export function useKirbyStaticData() {
  return kirbyStatic
}

/**
 * Returns the currently active page, similar to Kirby's `$page` global variable
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('app.page', () => ({}) as T)
}

/**
 * Sets the currently active page and updates the document head
 */
export function setPage<T extends Record<string, any>>(page?: T) {
  const pageState = usePageState()

  if (!page) {
    pageState.value = 'rejected'
    return
  }

  usePage().value = page

  // Build the page meta tags
  const { siteUrl } = useRuntimeConfig().public
  const { $i18n: i18n } = useNuxtApp()
  const { defaultLocale, locale } = i18n
  const site = useSite()
  const title = page.title
    ? `${page.title} – ${site.value.title}`
    : site.value.title
  const description = page.description || site.value.description
  const url = joinURL(siteUrl, useRoute().path)
  const image = page?.cover?.url || site.value.cover?.url

  // Build alternate URL
  const i18nMeta = page.i18nMeta as KirbyPageData['i18nMeta']
  const alternateUrls = Object.entries(i18nMeta).map(([lang, meta]) => {
    // Remove homepage slug and add leading language prefix
    const uri = getLocalizedPath(meta.uri.replace(/^home/, '/'), lang)

    return {
      rel: 'alternate',
      hreflang: lang,
      href: joinURL(siteUrl, uri),
    }
  })

  // Add English link as `x-default` language
  alternateUrls.push({
    ...alternateUrls.find((i) => i.hreflang === defaultLocale)!,
    hreflang: 'x-default',
  })

  useHead({
    bodyAttrs: {
      'data-template': page.intendedTemplate || 'default',
    },
  })

  useServerHead({
    link: [
      { rel: 'canonical', href: url },
      ...alternateUrls.filter(({ hreflang }) => hreflang !== locale.value),
    ],
  })

  useSeoMeta({
    title,
  })

  useServerSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogType: 'website',
    ...(image && { ogImage: image }),
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: image ? 'summary_large_image' : 'summary',
    ...(image && { twitterImage: image }),
  })

  pageState.value = 'resolved'
}

/**
 * Returns a promise that resolves when the page data has been loaded or rejected
 */
export async function hasPage() {
  const state = usePageState()

  await until(state).not.toBe('pending')

  return state.value === 'resolved'
}

function usePageState() {
  return useState<'pending' | 'resolved' | 'rejected'>(
    'app.state.page',
    () => 'pending',
  )
}
