<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const site = useSite()

const listedChildren = computed(() => [
  {
    title: t('home'),
    uri: '',
  },
  ...(site.value.children ?? []).filter((i) => i.isListed),
])
</script>

<template>
  <header>
    <h1>{{ site.title }}</h1>
    <p>{{ t('header.title') }}</p>

    <nav>
      <template v-for="(item, index) in listedChildren" :key="index">
        <NuxtLink
          :to="`/${locale}/${item.uri}`"
          :aria-current="
            route.path.startsWith(`/${locale}/${item.uri}`) ? 'page' : undefined
          "
        >
          {{ item.title }}
        </NuxtLink>
        <span v-if="index < listedChildren.length - 1"> / </span>
      </template>
      /
      <a
        href="https://github.com/johannschopplich/cacao-kit-frontend"
        rel="noopener"
        target="_blank"
      >
        GitHub
      </a>
    </nav>
  </header>
</template>
