<script setup lang="ts">
// This Nuxt page will render every Kirby page

import { getPageQuery } from '~/queries'

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
  setResponseStatus(useRequestEvent(), 404)
}

const { data: pageData, error: pageError } = await useKql(
  getPageQuery(kirbyPath),
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
