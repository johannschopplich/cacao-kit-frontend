<script setup lang="ts">
// This Nuxt page will render every Kirby page

import { getPageQuery } from '~/queries'

const route = useRoute()
const pageUri = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug

const { data: pageData, error: pageError } = await useKql(
  // Use current slug or fall back to the homepage
  getPageQuery(pageUri || 'home')
)

let data = pageData.value
let fetchError = pageError.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData, error: pageError } = await useKql(
    getPageQuery('error')
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
    <KirbyLayouts v-if="page?.layouts?.length" :layouts="page.layouts" />
    <KirbyBlocks v-else-if="page?.blocks" :blocks="page.blocks" />
    <DevOnly>
      <AppDebugHelper :error="fetchError" />
    </DevOnly>
  </div>
</template>
