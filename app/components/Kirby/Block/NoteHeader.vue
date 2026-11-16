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

const tags = computed(() => [
  ...new Set(
    props.block.content.tags
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean),
  ),
])
</script>

<template>
  <div class="note-meta hstack">
    <time v-if="props.block.content.date" :datetime="props.block.content.date">
      {{
        t('note.publishedOn', {
          date: formatDate(props.block.content.date, locale),
        })
      }}
    </time>

    <ul
      v-if="tags.length"
      class="unstyled hstack gap-2"
      :aria-label="t('note.tags')"
    >
      <li v-for="tag in tags" :key="tag" class="badge outline">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.note-meta {
  margin-block-end: var(--space-8);
  font-size: var(--text-7);
  color: var(--muted-foreground);
}
</style>
