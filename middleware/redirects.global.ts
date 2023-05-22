export default defineNuxtRouteMiddleware((to) => {
  const { defaultLocale } = useI18n()

  if (to.path === '/') {
    const { languageCode } = getLocalePreference()
    return navigateTo(`/${languageCode || defaultLocale}`, {
      redirectCode: 302,
    })
  }
})
