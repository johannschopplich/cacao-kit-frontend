export function getNonLocalizedSlug(
  param: string | string[],
  locales: string[] = [],
) {
  if (Array.isArray(param)) {
    param = param.filter(Boolean)

    // If the first item is a locale, remove it
    if (param.length > 0 && locales.includes(param[0])) {
      param = param.slice(1)
    }

    return param.join('/')
  }

  return param
}

export function getLocalePreference() {
  let fullLocale: string | undefined
  let languageCode: string | undefined

  if (import.meta.server) {
    const requestHeaders = useRequestHeaders()
    fullLocale = requestHeaders['accept-language']
    languageCode = fullLocale?.split(',')[0]?.slice(0, 2)
  } else if (import.meta.client) {
    fullLocale = navigator.language
    languageCode = fullLocale?.slice(0, 2)
  }

  return { languageCode, fullLocale }
}
