import { kirbyStatic } from '#build/kql'

export function getNonLocalizedSlug(param: string | string[]) {
  const { languages } = kirbyStatic

  if (Array.isArray(param)) {
    // If the first item is a locale, remove it
    if (param.length > 0 && languages.includes(param[0])) {
      param = param.slice(1)
    }

    return param.filter(Boolean).join('/')
  }

  return param
}

export function getLocalePreference() {
  let fullLocale: string | undefined
  let languageCode: string | undefined

  if (process.server) {
    const requestHeaders = useRequestHeaders()
    fullLocale = requestHeaders['accept-language']
    languageCode = fullLocale?.split(',')[0]?.slice(0, 2)
  } else if (process.client) {
    fullLocale = navigator.language
    languageCode = fullLocale?.slice(0, 2)
  }

  return { languageCode, fullLocale }
}
