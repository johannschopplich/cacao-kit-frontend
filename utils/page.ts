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
