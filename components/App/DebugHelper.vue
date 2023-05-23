<script setup lang="ts">
import type { FetchError } from 'ofetch'

defineProps<{
  error?: FetchError | null
}>()

const isDevelopment = process.dev
</script>

<template>
  <details v-if="isDevelopment && error">
    <summary>Error fetching page data</summary>
    <pre style="font-size: 0.875em">{{
      JSON.stringify(error, undefined, 2)
    }}</pre>
  </details>
</template>
