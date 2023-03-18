<script setup lang="ts">
import '~/assets/css/main.css'

const { locale } = useI18n()
</script>

<template>
  <Html :lang="locale">
    <Head>
      <Link rel="icon" type="image/svg+xml" href="/icon.svg" />
      <Link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
      />
    </Head>

    <Body>
      <AppHeader />

      <main id="main">
        <NuxtPage />
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>
