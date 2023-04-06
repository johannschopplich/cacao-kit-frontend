<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyAboutData } from '~/queries'

defineProps<{
  block: KirbyBlock<
    'team-structure',
    {
      team: {
        name: string
        // Contains an array of file UUIDs
        image: string[]
      }[]
    }
  >
}>()

const page = usePage<KirbyAboutData>()

// Use static data to avoid reactivity when redirecting to another page
const images = page.value.images
</script>

<template>
  <div class="grid" style="--gutter: 1.5rem">
    <div
      v-for="(item, index) in block.content.team"
      :key="index"
      class="column"
      style="--columns: 6"
    >
      <div v-if="item.image?.length">
        <figure class="column" style="aspect-ratio: 1/1">
          <KirbyUuidResolver
            v-slot="{ item: image }"
            :uuid="item.image[0]"
            :collection="images"
          >
            <img
              :srcset="image?.srcset"
              :width="image?.width"
              :height="image?.height"
              alt=""
              style="object-fit: cover; width: 100%; height: 100%"
            />
          </KirbyUuidResolver>

          <figcaption>
            <strong>{{ item.name }}</strong>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>
