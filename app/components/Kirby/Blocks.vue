<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { Component } from 'vue'
import {
  LazyKirbyBlockCards,
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockIntro,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockNoteHeader,
  LazyKirbyBlockNotesGrid,
  LazyKirbyBlockQuote,
  LazyKirbyBlockText,
} from '#components'

defineProps<{
  blocks: KirbyBlock[]
}>()

const blockComponents: Record<string, Component> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  intro: LazyKirbyBlockIntro,
  'note-header': LazyKirbyBlockNoteHeader,
  'notes-grid': LazyKirbyBlockNotesGrid,
  cards: LazyKirbyBlockCards,
}
</script>

<template>
  <div>
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
