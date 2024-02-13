export default defineNuxtRouteMiddleware((to) => {
  const { $i18n: i18n } = useNuxtApp()
  const { defaultLocale } = i18n

  if (to.path === '/') {
    const { languageCode } = getLocalePreference()
    return navigateTo(`/${languageCode || defaultLocale}`, {
      redirectCode: 302,
    })
  }
})
