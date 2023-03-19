import type { KirbyQuerySchema } from '#nuxt-kql'

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      uri: true,
      title: true,
      intendedTemplate: true,
      description: true,
      // The `toResolvedBlocks` method is a custom Kirby field Method to
      // resolve images inside the image block from UUID to a file object
      blocks: 'page.blocks.toResolvedBlocks',
      cover: {
        query: 'page.cover.toFile?.resize(1200)',
        select: ['url'],
      },
    },
  }
}
