import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'

export interface KirbyAboutData {
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
  images: {
    uuid: string
    srcset: string
    width: number
    height: number
    alt: string
  }[]
  i18nMeta: Record<string, { title: string; uri: string }>
}

export type KirbyAboutResponse = KirbyQueryResponse<KirbyAboutData>

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
    // Retrieve all images from the page to resolve a UUID from
    // e.g. a structure field to a file object
    images: {
      query: 'page.files.template("image")',
      select: ['uuid', 'srcset', 'width', 'height', 'alt'],
    },
    // Optional: Get title and URI of the current page in all languages
    i18nMeta: true,
  },
}
