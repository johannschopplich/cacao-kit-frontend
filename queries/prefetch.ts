import type { KirbyQuerySchema } from 'kirby-fest'

export const prefetchQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    languages: 'kirby.languages',
  },
}
