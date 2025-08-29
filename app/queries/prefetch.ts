import type { KirbyQuerySchema } from 'kirby-types'

export const prefetchQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    languages: 'kirby.languages',
  },
}
