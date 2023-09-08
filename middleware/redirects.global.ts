import type { Composer } from '#i18n'

export default defineNuxtRouteMiddleware((to) => {
  const i18n = useNuxtApp().$i18n as Composer
  const { defaultLocale } = i18n

  if (to.path === '/') {
    const { languageCode } = getLocalePreference()
    return navigateTo(`/${languageCode || defaultLocale}`, {
      redirectCode: 302,
    })
  }
})
