<script setup lang="ts">
import {
  LazyKirbyBlockBuiltInHeading,
  LazyKirbyBlockBuiltInImage,
  LazyKirbyBlockBuiltInLine,
  LazyKirbyBlockBuiltInList,
  LazyKirbyBlockBuiltInQuote,
  LazyKirbyBlockBuiltInText,
  LazyKirbyBlockGridNotes,
  LazyKirbyBlockIntro,
  LazyKirbyBlockNoteHeader,
  LazyKirbyBlockProse,
} from '#components'
import type { ComponentPublicInstance } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

const blockComponents: Partial<
  Record<string, new () => ComponentPublicInstance>
> = {
  // Built-in Kirby blocks
  heading: LazyKirbyBlockBuiltInHeading,
  image: LazyKirbyBlockBuiltInImage,
  line: LazyKirbyBlockBuiltInLine,
  list: LazyKirbyBlockBuiltInList,
  quote: LazyKirbyBlockBuiltInQuote,
  text: LazyKirbyBlockBuiltInText,
  // Custom blocks
  intro: LazyKirbyBlockIntro,
  prose: LazyKirbyBlockProse,
  'grid-notes': LazyKirbyBlockGridNotes,
  'note-header': LazyKirbyBlockNoteHeader,
}
</script>

<template>
  <div v-router-links>
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
