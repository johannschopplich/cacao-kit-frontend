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

// Create a resolver function that resolves the file UUIDs to the actual image data,
// since images inside structures are not resolved server-side
const resolver = createUuidResolver(page.value.images)
</script>

<template>
  <div class="grid">
    <div
      v-for="(item, index) in block.content.team"
      :key="index"
      class="column"
      style="--columns: 6"
    >
      <div class="grid">
        <div class="column" style="--columns: 4; aspect-ratio: 1/1">
          <img
            v-if="item.image?.length"
            :srcset="resolver(item.image?.[0])?.srcset"
            :width="resolver(item.image?.[0])?.width"
            :height="resolver(item.image?.[0])?.height"
            alt=""
            style="object-fit: cover; width: 100%; height: 100%"
          />
        </div>
        <div class="column" style="--columns: 2">
          <strong>{{ item.name }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
