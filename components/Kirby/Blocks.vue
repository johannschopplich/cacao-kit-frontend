<script setup lang="ts">
import {
  LazyKirbyBlockIntro,
  LazyKirbyBlockNoteHeader,
  LazyKirbyBlockNotesGrid,
  LazyKirbyBlockProse,
  LazyKirbyBlockProseHeading,
  LazyKirbyBlockProseImage,
  LazyKirbyBlockProseLine,
  LazyKirbyBlockProseList,
  LazyKirbyBlockProseQuote,
  LazyKirbyBlockProseText,
  LazyKirbyBlockTeamStructure,
} from '#components'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

type Component = abstract new (...args: any) => any

const blockComponents: Partial<Record<string, Component>> = {
  // Built-in Kirby blocks
  heading: LazyKirbyBlockProseHeading,
  image: LazyKirbyBlockProseImage,
  line: LazyKirbyBlockProseLine,
  list: LazyKirbyBlockProseList,
  quote: LazyKirbyBlockProseQuote,
  text: LazyKirbyBlockProseText,
  // Custom blocks
  intro: LazyKirbyBlockIntro,
  prose: LazyKirbyBlockProse,
  'note-header': LazyKirbyBlockNoteHeader,
  'notes-grid': LazyKirbyBlockNotesGrid,
  'team-structure': LazyKirbyBlockTeamStructure,
}
</script>

<template>
  <div v-router-links>
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
