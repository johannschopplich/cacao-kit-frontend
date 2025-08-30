import type { KirbyQuerySchema } from 'kirby-types'

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    description: true,
    children: {
      query: 'site.children',
      select: ['uri', 'title', 'isListed'],
    },
    cover: {
      query: 'site.cover.toFile?.resize(1200)',
      select: ['url'],
    },
  },
}
