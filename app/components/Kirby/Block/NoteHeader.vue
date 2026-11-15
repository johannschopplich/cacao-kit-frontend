<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'

const props = defineProps<{
  block: KirbyBlock<
    'note-header',
    {
      date: string
      tags: string
    }
  >
}>()

const { locale, t } = useI18n()
</script>

<template>
  <nav>
    <time v-if="props.block.content.date" :datetime="props.block.content.date">
      {{
        t('note.publishedOn', {
          date: formatDate(props.block.content.date, locale),
        })
      }}
    </time>

    <h5>{{ t('note.tags') }}</h5>
    <span
      v-for="(tag, index) in props.block.content.tags.split(',')"
      :key="index"
    >
      <mark>{{ tag.trim() }}</mark>
      &nbsp;
    </span>
  </nav>
</template>
