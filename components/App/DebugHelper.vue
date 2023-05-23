<script setup lang="ts">
import type { FetchError } from 'ofetch'

defineProps<{
  error?: FetchError | null
}>()
</script>

<template>
  <details v-if="error">
    <summary>Error fetching page data</summary>
    <pre style="font-size: 0.875em">{{
      JSON.stringify(error, undefined, 2)
    }}</pre>
  </details>
</template>
