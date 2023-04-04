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
</script>

<template>
  <div class="grid">
    <div
      v-for="(item, index) in block.content.team"
      :key="index"
      class="column"
      style="--columns: 6"
    >
      <div v-if="item.image?.length" class="grid">
        <div class="column" style="--columns: 4; aspect-ratio: 1/1">
          <KirbyUuidResolver
            v-slot="{ item: image }"
            :uuid="item.image[0]"
            :collection="page.images"
          >
            <img
              :srcset="image?.srcset"
              :width="image?.width"
              :height="image?.height"
              alt=""
              style="object-fit: cover; width: 100%; height: 100%"
            />
          </KirbyUuidResolver>
        </div>
        <div class="column" style="--columns: 2">
          <strong>{{ item.name }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
