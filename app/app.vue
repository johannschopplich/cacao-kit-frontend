<script setup lang="ts">
import '~/assets/css/main.css'

const { locale } = useI18n()

if (import.meta.server) {
  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
    link: [
      {
        rel: 'icon',
        href: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@knadh/oat@1.1.0/oat.min.css',
      },
    ],
  })
}

const main = useTemplateRef('main')
useInternalLinks(main)
</script>

<template>
  <AppHeader />

  <main ref="main" id="main">
    <NuxtPage />
  </main>

  <AppFooter />
</template>
