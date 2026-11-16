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
      />
      <h3>
        <a v-if="card.link" :href="card.link" class="unstyled">
          {{ card.title }}
        </a>
        <template v-else>{{ card.title }}</template>
      </h3>
      <p v-if="card.text">{{ card.text }}</p>
    </article>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  transition: border-color var(--transition-fast);
}

img {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: var(--radius-small);
}

h3 {
  margin-block: var(--space-4) var(--space-2);
}

p {
  color: var(--muted-foreground);
}

/* Stretch the title link over the whole card. */
a::after {
  content: '';
  position: absolute;
  inset: 0;
}

.card:has(a):hover {
  border-color: var(--ring);
}

.card:has(a):hover a {
  text-decoration: underline;
}
</style>
