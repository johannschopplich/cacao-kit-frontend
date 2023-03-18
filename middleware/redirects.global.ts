export default defineNuxtRouteMiddleware((to) => {
  const { defaultLocale } = useI18n()

  if (to.path === '/') {
    const { short } = useServerOrClientLocale()
    return navigateTo(`/${short || defaultLocale}`, { redirectCode: 302 })
  }
})

function useServerOrClientLocale() {
  let long: string | undefined
  let short: string | undefined

  if (process.server) {
    const headers = useRequestHeaders()
    long = headers['accept-language']
    short = long?.split(',')?.[0]?.slice(0, 2)
  } else {
    long = navigator.language
    short = long.slice(0, 2)
  }

  return { short, long }
}
