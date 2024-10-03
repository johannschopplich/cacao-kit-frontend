<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { ComponentPublicInstance } from 'vue'
import {
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockIntro,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockNoteHeader,
  LazyKirbyBlockNotesGrid,
  LazyKirbyBlockQuote,
  LazyKirbyBlockTeamStructure,
  LazyKirbyBlockText,
} from '#components'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

type ComponentConstructor = new (...args: any[]) => ComponentPublicInstance

const blockComponents: Record<string, ComponentConstructor> = {
  // Built-in Kirby blocks
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  // Custom blocks
  intro: LazyKirbyBlockIntro,
  'note-header': LazyKirbyBlockNoteHeader,
  'notes-grid': LazyKirbyBlockNotesGrid,
  'team-structure': LazyKirbyBlockTeamStructure,
}

const content = ref<HTMLElement | undefined>()
useInternalLinks(content)
</script>

<template>
  <div ref="content">
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
