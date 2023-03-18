/**
 * Extract every bit of information from the current path
 *
 * @remarks
 * Removes leading slash from the path as well
 */
export function usePathSegments(route = useRoute()) {
  const locale = useRouteLocale(route)
  const hasLocalePrefix = route.path.startsWith(`/${locale}`)

  // Remove leading locale from path if present
  const id = route.path.replace(new RegExp(`^/${locale}`), '')

  return {
    hasLocalePrefix,
    locale,
    id: withoutLeadingSlash(id),
  }
}

function withoutLeadingSlash(input = '') {
  return input.startsWith('/') ? input.slice(1) : input
}
