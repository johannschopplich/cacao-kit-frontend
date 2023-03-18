<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const site = useSite()

const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i: any) => i.isListed)
)
</script>

<template>
  <header>
    <NuxtLink :to="`/${locale}`">
      <h1>{{ site.title }}</h1>
    </NuxtLink>

    <nav>
      <NuxtLink :to="`/${locale}`">
        {{ t('home') }}
      </NuxtLink>
      /

      <NuxtLink
        v-for="(item, index) in listedChildren"
        :key="index"
        :to="`/${locale}/${item.uri}`"
        :aria-current="
          route.path.startsWith(`/${locale}/${item.uri}`) ? 'page' : undefined
        "
      >
        {{ item.title }}
        <span v-if="index < listedChildren.length - 1">/</span>
      </NuxtLink>
    </nav>
  </header>
</template>
