<script setup lang="ts">
import type { FetchError } from 'ofetch'

defineProps<{
  error?: FetchError | null
}>()

const { debug } = useRuntimeConfig().public
</script>

<template>
  <details v-if="debug && error">
    <summary>Error fetching page data</summary>
    <pre style="font-size: 0.875em">{{
      JSON.stringify(error, undefined, 2)
    }}</pre>
  </details>
</template>
