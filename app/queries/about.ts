import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from 'kirby-types'
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
    ...sharedQuerySelects,
  },
}
