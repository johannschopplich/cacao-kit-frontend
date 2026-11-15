import type { HookResult } from '@nuxt/schema'
import type { KirbySharedPageData } from '~/queries'
import { joinURL } from 'ufo'

/**
 * Returns the currently active page, similar to Kirby's `$page` global variable.
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('app.page', () => ({}) as T)
}

/**
 * Sets the currently active page and updates the document head.
 */
export function setPage<T extends KirbySharedPageData & Record<string, any>>(
  page: T,
) {
  usePage().value = page

  // Build the page meta tags.
  const { siteUrl } = useRuntimeConfig().public
  const { $i18n: i18n } = useNuxtApp()
  const { defaultLocale } = i18n
  const site = useSite()
  const title = page.title
    ? `${page.title} – ${site.value.title}`
    : site.value.title
  const description = page.description || site.value.description
  const url = joinURL(siteUrl, useRoute().path)
  const image = page?.cover?.url || site.value.cover?.url

  const alternateUrls = Object.entries(page.i18nMeta).map(([lang, meta]) => {
    // Remove homepage slug and add leading language prefix.
    const uri = getLocalizedPath(meta.uri.replace(/^home/, '/'), lang)

    return {
      // Unhead discriminates its link union on `rel`, so keep it a literal.
      rel: 'alternate' as const,
      hreflang: lang,
      href: joinURL(siteUrl, uri),
    }
  })

  // Add primary locale as `x-default` for SEO. Single-language installations
  // report no `i18nMeta` at all, so there may be nothing to point at.
  const defaultAlternateUrl = alternateUrls.find(
    (i) => i.hreflang === defaultLocale,
  )
  if (defaultAlternateUrl) {
    alternateUrls.push({ ...defaultAlternateUrl, hreflang: 'x-default' })
  }

  useHead({
    bodyAttrs: {
      'data-template': page.intendedTemplate || 'default',
    },
  })

  useSeoMeta({
    title,
  })

  if (import.meta.server) {
    useHead({
      link: [{ rel: 'canonical', href: url }, ...alternateUrls],
    })

    useSeoMeta({
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
  }

  // Resolve components that depend on the full page data.
  const nuxtApp = useNuxtApp()
  nuxtApp._pageDependenciesRendered = true
  return nuxtApp.callHook('page-dependencies:rendered')
}

export async function waitForPage() {
  if (import.meta.client) return

  const nuxtApp = useNuxtApp()
  const error = useError()

  return new Promise<void>((resolve) => {
    if (error.value || nuxtApp._pageDependenciesRendered) return resolve()

    nuxtApp.hooks.hookOnce('page-dependencies:rendered', () => resolve())
    nuxtApp.hooks.hookOnce('app:error', () => resolve())
    nuxtApp.hooks.hookOnce('vue:error', () => resolve())
  })
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'page-dependencies:rendered': () => HookResult
  }
}
