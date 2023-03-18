<script setup lang="ts">
import { NuxtLink } from '#components'
const { locale, t } = useI18n()
const route = useRoute()
const site = useSite()

const listedChildren = computed(() => [
  {
    title: t('home'),
    uri: '',
  },
  ...(site.value?.children ?? []).filter((i: any) => i.isListed),
])
</script>

<template>
  <header>
    <h1>{{ site.title }}</h1>

    <nav>
      <template v-for="(item, index) in listedChildren" :key="index">
        <NuxtLink
          :to="`/${locale}` + (item.uri ? `/${item.uri}` : '')"
          :aria-current="
            route.path.startsWith(`/${locale}/${item.uri}`) ? 'page' : undefined
          "
        >
          {{ item.title }}
        </NuxtLink>
        <span v-if="index < listedChildren.length - 1"> / </span>
      </template>
    </nav>
  </header>
</template>
