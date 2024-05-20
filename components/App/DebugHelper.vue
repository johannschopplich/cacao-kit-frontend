<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error?: NuxtError<any> | null
}>()
</script>

<template>
  <details v-if="error" class="mt-4">
    <summary class="cursor-pointer">Error fetching page data</summary>
    <pre class="text-[0.875em]">{{ JSON.stringify(error, undefined, 2) }}</pre>
  </details>
</template>
