<script setup lang="ts">
import { notesQuery } from '~/queries'
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyNotesResponse } from '~/queries'

defineProps<{
  block: KirbyBlock<'notes-grid'>
}>()

const { locale } = useI18n()
const { data } = await useKql<KirbyNotesResponse>(notesQuery, {
  language: locale.value,
})
</script>

<template>
  <div class="grid" style="--gutter: 1.5rem">
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
              :alt="item.cover.alt || undefined"
              style="object-fit: cover; height: 100%"
            />
          </figure>

          <h4>{{ item.title }}</h4>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
