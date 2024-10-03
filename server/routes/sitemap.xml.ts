import type { KirbyApiResponse } from 'kirby-types'
import { SitemapStream, streamToPromise } from 'sitemap'
import { withoutTrailingSlash } from 'ufo'

interface KirbySitemapItem {
  url: string
  modified: string
}

export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public

  const data =
    await $kirby<KirbyApiResponse<KirbySitemapItem[]>>('api/__sitemap__')

  if (!data?.result) {
    throw createError({
      statusCode: 500,
      message: 'Could not fetch sitemap data',
    })
  }

  const sitemap = new SitemapStream({ hostname: siteUrl })

  for (const { url } of data.result) {
    sitemap.write({
      url: withoutTrailingSlash(url),
    })
  }

  sitemap.end()
  return streamToPromise(sitemap)
})
