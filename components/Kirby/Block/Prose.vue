<script setup lang="ts">
import type { KirbyBlock } from 'kirby-fest'

const props = defineProps<{
  block: KirbyBlock<
    'prose',
    {
      prose: KirbyBlock<string>[]
    }
  >
}>()
</script>

<template>
  <KirbyBlocks
    v-if="props.block.content.prose"
    :blocks="props.block.content.prose"
    class="text"
  />
</template>
