<script setup lang="ts">
// This Nuxt page will render every Kirby page

import { getPageQuery } from '~/queries'

const { locale, localeCodes } = useI18n()
const route = useRoute()

// Extract the non-localized slug
const pageUri = getNonLocalizedSlug(route.params.slug!, localeCodes.value)

const { data: pageData, error: pageError } = await useKql(
  getPageQuery(pageUri || 'home'),
  { language: locale.value },
)

let data = pageData.value
let fetchError = pageError.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData, error: pageError } = await useKql(
    getPageQuery('error'),
    { language: locale.value },
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
