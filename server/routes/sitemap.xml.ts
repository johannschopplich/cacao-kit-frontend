import { joinURL } from 'ufo'
import { SitemapStream, streamToPromise } from 'sitemap'
import type { KirbyApiResponse } from 'kirby-types'

interface KirbySitemapItem {
  url: string
  modified: string
  links: {
    lang: string
    url: string
  }[]
}

export default defineEventHandler(async () => {
  const { siteUrl } = useRuntimeConfig().public

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
        url: joinURL(siteUrl, link.url),
      }))

      sitemap.write({
        url,
        lastmod,
        links: alternateLinks,
      })
    }
  }

  sitemap.end()
  return streamToPromise(sitemap)
})
