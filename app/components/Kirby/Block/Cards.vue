<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

defineProps<{
  block: KirbyBlock<
    'cards',
    {
      // Resolved server-side by the `cards:cards` blocks resolver.
      // See: https://kirby.tools/docs/headless/usage/field-methods#custom-resolvers
      cards: {
        title: string
        text: string
        image: ResolvedKirbyImage | null
        // A path for a page link, a URL otherwise.
        link: string | null
      }[]
    }
  >
}>()
</script>

<template>
  <div class="grid" style="--gutter: 1.5rem">
    <article
      v-for="(card, index) in block.content.cards"
      :key="index"
      class="column card"
      style="--columns: 4"
    >
      <img
        v-if="card.image"
        :src="card.image.url"
        :srcset="card.image.srcset"
        sizes="(min-width: 768px) 20rem, 100vw"
        :width="card.image.width"
        :height="card.image.height"
        :alt="card.image.alt || ''"
        style="aspect-ratio: 3/2; object-fit: cover; width: 100%"
      />
      <h3>
        <a v-if="card.link" :href="card.link">{{ card.title }}</a>
        <template v-else>{{ card.title }}</template>
      </h3>
      <p v-if="card.text">{{ card.text }}</p>
    </article>
  </div>
</template>
