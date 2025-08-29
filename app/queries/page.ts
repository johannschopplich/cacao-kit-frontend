import type {
  KirbyBlock,
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from 'kirby-types'

export interface KirbySharedPageData {
  uri: string
  title: string
  intendedTemplate: string
  description: string
  cover?: {
    url: string
  }
  i18nMeta: Record<string, { title: string; uri: string }>
}

export interface KirbyPageData extends KirbySharedPageData {
  blocks: KirbyBlock<string>[]
  layouts: KirbyLayout[]
}

export type KirbyPageResponse = KirbyQueryResponse<KirbyPageData>

export const sharedQuerySelects: KirbyQuerySchema['select'] = {
  uri: true,
  title: true,
  intendedTemplate: true,
  description: true,
  cover: {
    query: 'page.cover.toFile?.resize(1200)',
    select: ['url'],
  },
  // Optional: Get title and URI of the current page in all languages
  i18nMeta: true,
}

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      // The `toResolvedBlocks` method is a custom Kirby field Method to
      // resolve images inside the image block from UUID to a file object
      blocks: 'page.blocks.toResolvedBlocks',
      layouts: 'page.layouts.toResolvedLayouts',
      ...sharedQuerySelects,
    },
  }
}
