<script setup lang="ts">
// This Nuxt page will render every Kirby page

import { getPageQuery } from '~/queries'
import type { KirbyPageResponse } from '~/queries'

const { locale } = useI18n()
const { hasLocalePrefix, id } = usePathSegments()

// Use current path without locale prefix as Kirby page ID
let kirbyPath = id

// If page ID is empty, query the homepage
if (!id) {
  kirbyPath = 'home'
  // If leading locale is missing, load the error page
} else if (!hasLocalePrefix) {
  kirbyPath = 'error'
  setResponseStatus(404)
}

const { data: pageData, error: pageError } = await useKql(
  getPageQuery(kirbyPath),
  { language: locale.value }
)

const data = ref<KirbyPageResponse | null>(pageData.value)
const fetchError = ref(pageError.value)

// If page content is empty, load the error page
if (!data.value?.result) {
  const { data: pageData, error: pageError } = await useKql(
    getPageQuery('error'),
    { language: locale.value }
  )
  data.value = pageData.value
  fetchError.value = pageError.value
  setResponseStatus(404)
}

// Store page data
const page = data.value?.result
setPage(page)
</script>

<template>
  <AppDebugHelper v-if="fetchError" :error="fetchError" />
  <KirbyLayouts v-else-if="page?.layouts?.length" :layouts="page.layouts" />
  <KirbyBlocks v-else-if="page?.blocks" :blocks="page.blocks" />
</template>
