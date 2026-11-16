<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

defineProps<{
  block: KirbyBlock<
    'image-resolved',
    {
      location: string
      // File UUIDs are resolved server-side to the actual image data.
      // See: https://kirby.tools/docs/headless/field-methods
      image: ResolvedKirbyImage[]
      src: string
      alt: string
      caption: string
      link: string
      ratio: string
      crop: 'true' | 'false'
    }
  >
}>()

const figure = useTemplateRef('figure')
const { width } = useElementSize(figure)
</script>

<template>
  <figure ref="figure">
    <component
      :is="block.content.link ? 'a' : 'div'"
      :href="block.content.link || undefined"
      class="image-frame"
      :data-ratio="block.content.ratio ? '' : undefined"
      :data-contain="block.content.crop === 'false' || undefined"
      :style="{
        aspectRatio: block.content.ratio || undefined,
      }"
    >
      <img
        :src="block.content.location === 'web' ? block.content.src : undefined"
        :srcset="
          block.content.location !== 'web'
            ? block.content.image?.[0]?.srcset
            : undefined
        "
        :width="block.content.image?.[0]?.width"
        :height="block.content.image?.[0]?.height"
        :sizes="`${width}px`"
        :alt="block.content.alt || block.content.image?.[0]?.alt || ''"
      />
    </component>

    <figcaption v-if="block.content.caption" v-html="block.content.caption" />
  </figure>
</template>

<style scoped>
.image-frame {
  display: block;
  overflow: hidden;
  border-radius: var(--radius-medium);
}

.image-frame img {
  display: block;
}

.image-frame[data-ratio] img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-frame[data-contain] img {
  object-fit: contain;
}

figcaption {
  margin-block-start: var(--space-2);
  font-size: var(--text-7);
  color: var(--muted-foreground);
}
</style>
