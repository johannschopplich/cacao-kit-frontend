import type { HookResult } from '@nuxt/schema'
import type { KirbySharedPageData } from '~/queries'
import { kirbyStatic } from '#nuxt-kirby'
import { joinURL } from 'ufo'

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
export function setPage<T extends KirbySharedPageData & Record<string, any>>(
  page: T,
) {
  usePage().value = page

  // Build the page meta tags
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

  // Build alternate URL
  const alternateUrls = Object.entries(page.i18nMeta).map(([lang, meta]) => {
    // Remove homepage slug and add leading language prefix
    const uri = getLocalizedPath(meta.uri.replace(/^home/, '/'), lang)

    return {
      rel: 'alternate',
      hreflang: lang,
      href: joinURL(siteUrl, uri),
    }
  })

  // Add primary locale as `x-default` for SEO
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
    link: [{ rel: 'canonical', href: url }, ...alternateUrls],
  })

  useSeoMeta({
    title,
  })

  useServerSeoMeta({
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

  // Resolve components that depend on the full page data
  const nuxtApp = useNuxtApp()
  nuxtApp._pageDependenciesRendered = true
  return nuxtApp.callHook('page-dependencies:rendered')
}

/**
 * Returns a promise that resolves when the page setup is complete
 */
export async function hasPage() {
  if (import.meta.server) {
    const nuxtApp = useNuxtApp()
    const error = useError()

    // Defer rendering the component until the page component has rendered
    return new Promise<void>((resolve) => {
      const resolver = () => {
        resolve()
      }

      // If Nuxt has an error, immediately render the component
      if (error.value) {
        return resolver()
      }

      if (nuxtApp._pageDependenciesRendered) {
        return resolver()
      }

      // Called manually by using the `setPage` composable
      nuxtApp.hooks.hookOnce('page-dependencies:rendered', resolver)

      // When any error happens, resolve
      nuxtApp.hooks.hookOnce('app:error', resolver)
      nuxtApp.hooks.hookOnce('vue:error', resolver)
    })
  }

  return Promise.resolve()
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'page-dependencies:rendered': () => HookResult
  }
}
