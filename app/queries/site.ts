import type { KirbyQuerySchema } from 'kirby-types'

export interface KirbySiteData {
  title: string
  description: string
  children: {
    uri: string
    title: string
    isListed: boolean
  }[]
  cover: {
    url: string
  } | null
}

export const siteQuery = {
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
} satisfies KirbyQuerySchema
