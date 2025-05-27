import { joinURL, withLeadingSlash } from 'ufo'

export function getLocalizedPath(
  slug: string,
  locale: string,
  { ignorePrefix = false }: { ignorePrefix?: boolean } = {},
) {
  const prefix = ignorePrefix ? '' : locale
  return withLeadingSlash(joinURL(prefix, slug))
}

export function getNonLocalizedSlug(
  param: string | string[],
  locales: string[] = [],
) {
  if (Array.isArray(param)) {
    param = param.filter(Boolean)

    // Remove locale prefix if present
    if (param.length > 0 && locales.includes(param[0]!)) {
      param = param.slice(1)
    }

    return param.join('/')
  }

  return param
}
