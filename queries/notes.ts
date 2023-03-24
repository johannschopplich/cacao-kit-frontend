import type { KirbyQueryResponse, KirbyQuerySchema } from '#nuxt-kql'

export type KirbyNotesResponse = KirbyQueryResponse<
  {
    uri: string
    title: string
    cover?: {
      width: number
      height: number
      url: string
      alt: string
    }
  }[]
>

export const notesQuery: KirbyQuerySchema = {
  query: 'page("notes").children.listed',
  select: {
    uri: true,
    title: true,
    cover: {
      query: 'page.cover.toFile?.resize(1200)',
      select: ['width', 'height', 'url', 'alt'],
    },
  },
}
