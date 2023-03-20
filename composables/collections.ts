import type { KirbyQueryResponse } from '#nuxt-kql'

export async function useKirbyNotes() {
  const { locale } = useI18n()

  return await useKql<
    KirbyQueryResponse<
      {
        uri: string
        title: string
        cover?: {
          width: number
          height: number
          url: string
        }
      }[]
    >
  >(
    {
      query: 'page("notes").children.listed',
      select: {
        uri: true,
        title: true,
        cover: {
          query: 'page.cover.toFile?.resize(1200)',
          select: ['width', 'height', 'url'],
        },
      },
    },
    { language: locale.value }
  )
}
