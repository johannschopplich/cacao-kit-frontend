<script setup lang="ts">
const route = useRoute()
const site = useSite()

const listedChildren = computed(() => [
  {
    title: 'Home',
    uri: '',
  },
  ...(site.value.children ?? []).filter((i) => i.isListed),
])
</script>

<template>
  <header>
    <h1>{{ site.title }}</h1>
    <p>Demo & Semi Documentation</p>

    <nav>
      <template v-for="(item, index) in listedChildren" :key="index">
        <NuxtLink
          :to="`/${item.uri}`"
          :aria-current="
            route.path.startsWith(`/${item.uri}`) ? 'page' : undefined
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
