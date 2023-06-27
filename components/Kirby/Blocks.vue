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
import type { ComponentPublicInstance } from 'vue'
import type { KirbyBlock } from 'kirby-fest'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

type ComponentConstructor<
  T extends ComponentPublicInstance<Props> = ComponentPublicInstance<any>,
  Props = any
> = new (...args: any[]) => T

const blockComponents: Partial<Record<string, ComponentConstructor>> = {
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
      <component :is="(blockComponents[block.type] as any)" :block="block" />
    </template>
  </div>
</template>
