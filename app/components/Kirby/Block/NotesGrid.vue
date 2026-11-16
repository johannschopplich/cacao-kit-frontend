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
      <NuxtLink :to="note.url" class="unstyled">
        <figure>
          <img
            v-if="note.cover"
            :width="note.cover.width"
            :height="note.cover.height"
            :src="note.cover.url"
            :alt="note.cover.alt || ''"
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

<style scoped>
figure {
  aspect-ratio: 16/9;
  overflow: hidden;
  background-color: var(--muted);
  border-radius: var(--radius-medium);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h4 {
  margin-block: var(--space-3) var(--space-1);
}

a:hover h4 {
  text-decoration: underline;
}

time {
  font-size: var(--text-7);
  color: var(--muted-foreground);
}
</style>
