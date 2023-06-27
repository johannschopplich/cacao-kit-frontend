<script setup lang="ts">
import type { KirbyBlock } from 'kirby-fest'

defineProps<{
  block: KirbyBlock<'quote'>
}>()
</script>

<template>
  <blockquote>
    <div v-html="block.content.text" />
    <figcaption>
      <small v-html="block.content.citation" />
    </figcaption>
  </blockquote>
</template>
