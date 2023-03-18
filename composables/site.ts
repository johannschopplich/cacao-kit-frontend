/**
 * Access the global site context
 */
export function useSite() {
  return useState<Record<string, any>>('kql.site', () => ({}))
}
