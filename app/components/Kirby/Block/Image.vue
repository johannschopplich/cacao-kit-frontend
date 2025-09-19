<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kirby'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

defineProps<{
  block: KirbyBlock<
    'image-resolved',
    {
      location: string
      // File UUIDs are resolved server-side to the actual image data
      // See: https://kirby.tools/docs/headless/field-methods
      image: ResolvedKirbyImage[]
      src: string
      alt: string
      caption: string
      link: string
      ratio: string
      crop: boolean
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
      :data-contain="block.content.crop === false || undefined"
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
