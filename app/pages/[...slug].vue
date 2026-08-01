<script setup lang="ts">
// This Nuxt page will render every Kirby page

import { getPageQuery } from '~/queries'

// Use current slug or fall back to the homepage
const { slug } = useRoute().params
const pageUri =
  (Array.isArray(slug) ? slug.filter(Boolean).join('/') : slug) || 'home'

const { data: pageData, error: pageError } = await useKql(getPageQuery(pageUri))

let data = pageData.value
let fetchError = pageError.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData, error: pageError } = await useKql(
    getPageQuery('error'),
  )
  data = pageData.value
  fetchError = pageError.value
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

// Store page data
const page = data?.result
setPage(page)
</script>

<template>
  <div>
    <KirbyLayouts v-if="page?.layouts?.length" :layouts="page.layouts" />
    <KirbyBlocks v-else-if="page?.blocks" :blocks="page.blocks" />
    <DevOnly>
      <AppDebugHelper :error="fetchError" />
    </DevOnly>
  </div>
</template>
