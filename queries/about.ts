import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'

export type KirbyAboutResponse = KirbyQueryResponse<{
  uri: string
  title: string
  intendedTemplate: string
  description: string
  layouts: KirbyLayout[]
  address: string
  email: string
  phone: string
  social: {
    platform: string
    url: string
  }[]
  cover?: {
    url: string
  }
}>

export const aboutQuery: KirbyQuerySchema = {
  query: 'page("about")',
  select: {
    uri: true,
    title: true,
    intendedTemplate: true,
    description: true,
    layouts: 'page.layouts.toResolvedLayouts',
    address: 'page.address.kirbytext',
    email: true,
    phone: true,
    social: 'page.social.toStructure',
    cover: {
      query: 'page.cover.toFile?.resize(1200)',
      select: ['url'],
    },
  },
}
