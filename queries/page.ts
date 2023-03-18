import type { KirbyQuerySchema } from '#nuxt-kql'

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      uri: true,
      title: true,
      intendedTemplate: true,
      description: true,
      blocks: 'page.blocks.toResolvedBlocks.toArray',
      cover: {
        query: 'page.cover.toFile?.resize(1200)',
        select: ['url'],
      },
    },
  }
}
