import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'
import type { MaybeRefOrGetter } from 'vue'
import type { KirbySiteData } from '~/queries'
import { hash } from 'ohash'
import { siteQuery } from '~/queries'

export interface UseKqlPageOptions {
  /**
   * Payload key, stable across server and client for the same page.
   * @default `page:${locale}:${hash(query)}`
   */
  key?: MaybeRefOrGetter<string>
}

/**
 * Fetches a page query and, while the site state is missing or in another
 * language, the site data along with it in the same request.
 *
 * @remarks
 * The explicit key lets the client reuse the server payload, even though it
 * would build the request body without the site.
 */
export function useKqlPage<T>(
  query: MaybeRefOrGetter<KirbyQuerySchema>,
  options: UseKqlPageOptions = {},
) {
  const site = useSite()
  const siteLocale = useState<string | undefined>('app.siteLocale')
  const { locale } = useI18n()
  const language = locale.value
  // Decided once, so filling the site state doesn't change the body and refetch.
  const isSiteBundled = siteLocale.value !== language

  return useKql<KirbyQueryResponse<T>>(
    () =>
      isSiteBundled
        ? {
            query: siteQuery.query,
            select: { ...siteQuery.select, page: toValue(query) },
          }
        : toValue(query),
    {
      language,
      key: options.key ?? (() => `page:${language}:${hash(toValue(query))}`),
      // A prerendered page's payload holds the page alone.
      getCachedData: isSiteBundled
        ? (key, nuxtApp) =>
            nuxtApp.isHydrating ? nuxtApp.payload.data[key] : undefined
        : undefined,
      transform: (response) => {
        if (!isSiteBundled) return response

        const { page, ...siteData } =
          response.result as unknown as KirbySiteData & {
            page: T | null
          }
        site.value = siteData
        siteLocale.value = language
        return {
          ...response,
          result: page ?? undefined,
        } as KirbyQueryResponse<T>
      },
    },
  )
}
