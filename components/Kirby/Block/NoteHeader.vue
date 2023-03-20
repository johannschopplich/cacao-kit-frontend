<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<
    'note-header',
    {
      date: string
      time: string
      tags: string
    }
  >
}>()

function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>

<template>
  <nav>
    <time v-if="props.block.content.date" :datetime="props.block.content.date">
      Published on
      {{ formatDateShort(new Date(props.block.content.date)) }}
    </time>

    <h5>Tags</h5>
    <span
      v-for="(tag, index) in props.block.content.tags.split(',')"
      :key="index"
    >
      <mark>{{ tag }}</mark>
      &nbsp;
    </span>
  </nav>
</template>
