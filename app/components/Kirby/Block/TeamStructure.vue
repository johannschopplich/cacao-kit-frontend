<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kirby'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

defineProps<{
  block: KirbyBlock<
    'team-structure',
    {
      // Structure data is resolved server-side in a `blocksResolver` function
      // See: https://kirby.tools/docs/headless/field-methods#custom-resolvers
      team: {
        name: string
        // Contains the resolved image data
        image: ResolvedKirbyImage | null
        // Contains the resolved page URI
        link: string | null
      }[]
    }
  >
}>()
</script>

<template>
  <div class="grid" style="--gutter: 1.5rem">
    <div
      v-for="(item, index) in block.content.team"
      :key="index"
      class="column"
      style="--columns: 6"
    >
      <div v-if="item.image">
        <figure class="column" style="aspect-ratio: 1/1">
          <img
            :srcset="item.image.srcset"
            :width="item.image.width"
            :height="item.image.height"
            :alt="item.image.alt || undefined"
            style="object-fit: cover; width: 100%; height: 100%"
          />

          <figcaption>
            <strong>{{ item.name }}</strong>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>
