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
        href: 'https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css',
      },
    ],
  })
}
</script>

<template>
  <AppHeader />

  <main id="main">
    <NuxtPage />
  </main>

  <AppFooter />
</template>
