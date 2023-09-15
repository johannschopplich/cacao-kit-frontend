<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
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

type ComponentConstructor = new (...args: any[]) => ComponentPublicInstance

const blockComponents: Record<string, ComponentConstructor> = {
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
