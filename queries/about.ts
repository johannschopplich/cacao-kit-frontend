import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyAboutData extends KirbySharedPageData {
  layouts: KirbyLayout[]
  address: string
  email: string
  phone: string
  social: {
    platform: string
    url: string
  }[]
  images: {
    uuid: string
    srcset: string
    width: number
    height: number
    alt: string
  }[]
}

export type KirbyAboutResponse = KirbyQueryResponse<KirbyAboutData>

export const aboutQuery: KirbyQuerySchema = {
  query: 'page("about")',
  select: {
    layouts: 'page.layouts.toResolvedLayouts',
    address: 'page.address.kirbytext',
    email: true,
    phone: true,
    social: 'page.social.toStructure',
    // Retrieve all images from the page to resolve a UUID from
    // e.g. a structure field to a file object
    // images: {
    //   query: 'page.files.template("image")',
    //   select: ['uuid', 'srcset', 'width', 'height', 'alt'],
    // },
    ...sharedQuerySelects,
  },
}
