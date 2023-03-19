<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'grid-notes'>
}>()

const { locale } = useI18n()
const { data } = await useKql(
  {
    query: 'page("notes").children.listed',
    select: {
      uri: true,
      title: true,
      cover: {
        query: 'page.cover.toFile?.resize(1200)',
        select: ['width', 'height', 'url'],
      },
    },
  },
  { language: locale.value }
)
</script>

<template>
  <div class="grid">
    <div
      v-for="(item, index) in data?.result"
      :key="index"
      class="column"
      style="--columns: 4"
    >
      <article>
        <NuxtLink :to="`/${locale}/${item.uri}`">
          <figure style="aspect-ratio: 16/9; margin-bottom: 0">
            <img
              v-if="item?.cover"
              :width="item.cover.width"
              :height="item.cover.height"
              :src="item.cover.url"
              alt=""
              style="object-fit: cover; height: 100%"
            />
          </figure>

          <h4>{{ item.title }}</h4>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
