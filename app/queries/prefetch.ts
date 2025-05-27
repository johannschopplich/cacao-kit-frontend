import type { KirbyQuerySchema } from '#nuxt-kql'

export const prefetchQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    languages: 'kirby.languages',
  },
}
