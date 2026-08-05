import type { KirbySite } from '#nuxt-kirby'

/**
 * Returns the global site context, similar to Kirby's `$site` global variable.
 */
export function useSite() {
  return useState<Partial<KirbySite>>('app.site', () => ({}))
}
