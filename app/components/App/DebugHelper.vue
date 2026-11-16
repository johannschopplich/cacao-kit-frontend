<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error?: NuxtError<any> | null
}>()
</script>

<template>
  <details v-if="error">
    <summary>Error fetching page data</summary>
    <pre>{{ JSON.stringify(error, undefined, 2) }}</pre>
  </details>
</template>

<style scoped>
details {
  margin-block-start: 1rem;
}

summary {
  cursor: pointer;
}

pre {
  font-size: 0.875em;
}
</style>
