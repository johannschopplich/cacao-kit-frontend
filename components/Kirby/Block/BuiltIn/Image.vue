<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { ResolvedKirbyImage } from '~/types'

defineProps<{
  block: KirbyBlock<
    'resolved-image',
    {
      location: string
      image: string[]
      src: string
      alt: string
      caption: string
      link: string
      resolved?: {
        image: ResolvedKirbyImage[]
      }
    }
  >
}>()

const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure ref="figure">
    <component
      :is="block.content.link ? 'a' : 'div'"
      :href="block.content.link || undefined"
    >
      <img
        :src="block.content.location === 'web' ? block.content.src : undefined"
        :srcset="
          block.content.location !== 'web'
            ? block.content.resolved?.image?.[0].srcset
            : undefined
        "
        :width="block.content.resolved?.image?.[0].width"
        :height="block.content.resolved?.image?.[0].height"
        :sizes="`${width}px`"
        :alt="block.content.alt || block.content.resolved?.image?.[0].alt || ''"
      />
    </component>

    <figcaption v-if="block.content.caption" v-html="block.content.caption" />
  </figure>
</template>
