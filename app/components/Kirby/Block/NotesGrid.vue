<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

defineProps<{
  block: KirbyBlock<
    'notes-grid',
    {
      // Resolved server-side by the `notes-grid:notes` blocks resolver.
      // See: https://kirby.tools/docs/headless/usage/field-methods#custom-resolvers
      notes: {
        title: string
        url: string
        date: string | null
        cover: Omit<ResolvedKirbyImage, 'srcset'> | null
      }[]
    }
  >
}>()

const { locale } = useI18n()
</script>

<template>
  <div class="grid" style="--gutter: 1.5rem">
    <article
      v-for="(note, index) in block.content.notes"
      :key="index"
      class="column"
      style="--columns: 4"
    >
      <NuxtLink :to="note.url">
        <figure style="aspect-ratio: 16/9; margin-bottom: 0">
          <img
            v-if="note.cover"
            :width="note.cover.width"
            :height="note.cover.height"
            :src="note.cover.url"
            :alt="note.cover.alt || ''"
            style="object-fit: cover; height: 100%"
          />
        </figure>

        <h4>{{ note.title }}</h4>
      </NuxtLink>
      <time v-if="note.date" :datetime="note.date">
        {{ formatDate(note.date, locale) }}
      </time>
    </article>
  </div>
</template>
