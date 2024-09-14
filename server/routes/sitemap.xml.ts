import type { KirbyApiResponse } from 'kirby-types'
import { SitemapStream, streamToPromise } from 'sitemap'
import { joinURL, withoutTrailingSlash } from 'ufo'

interface KirbySitemapItem {
  url: string
  modified: string
  links: {
    lang: string
    url: string
  }[]
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

  for (const { links, modified: lastmod } of data.result) {
    for (const { lang, url } of links) {
      if (lang === 'x-default') continue

      const alternateLinks = links.map((link) => ({
        lang: link.lang,
        url: withoutTrailingSlash(joinURL(siteUrl, link.url)),
      }))

      sitemap.write({
        url: withoutTrailingSlash(url),
        lastmod,
        links: alternateLinks,
      })
    }
  }

  sitemap.end()
  return streamToPromise(sitemap)
})
