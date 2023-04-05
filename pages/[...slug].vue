<script setup lang="ts">
// This Nuxt page will render every Kirby page

import { getPageQuery } from '~/queries'

const { locale } = useI18n()
const { slug } = useRoute().params

// Use current slug or fall back to the homepage
const pageUri =
  (Array.isArray(slug) ? slug.filter(Boolean).join('/') : slug) || 'home'

const { data: pageData, error: pageError } = await useKql(
  getPageQuery(pageUri),
  { language: locale.value }
)

let data = pageData.value
let fetchError = pageError.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData, error: pageError } = await useKql(
    getPageQuery('error'),
    { language: locale.value }
  )
  data = pageData.value
  fetchError = pageError.value
  setResponseStatus(useRequestEvent(), 404)
}

// Store page data
const page = data?.result
setPage(page)
</script>

<template>
  <div>
    <AppDebugHelper :error="fetchError" />
    <KirbyLayouts v-if="page?.layouts?.length" :layouts="page.layouts" />
    <KirbyBlocks v-else-if="page?.blocks" :blocks="page.blocks" />
  </div>
</template>
