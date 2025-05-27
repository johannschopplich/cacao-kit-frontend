<script setup lang="ts">
import '~/assets/css/main.css'

useServerHead({
  htmlAttrs: {
    lang: 'en',
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
</script>

<template>
  <AppHeader />

  <main id="main">
    <NuxtPage />
  </main>

  <AppFooter />
</template>
