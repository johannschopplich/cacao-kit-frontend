<script setup lang="ts">
import type { KirbyBlock } from 'kirby-fest'

const props = defineProps<{
  block: KirbyBlock<
    'intro',
    {
      text: string
    }
  >
}>()
</script>

<template>
  <h2>
    {{ props.block.content.text }}
  </h2>
  <hr />
</template>
