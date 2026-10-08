<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { Component } from 'vue'
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
  'team-structure': LazyKirbyBlockTeamStructure,
}

const content = useTemplateRef('content')
useInternalLinks(content)
</script>

<template>
  <div ref="content">
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
