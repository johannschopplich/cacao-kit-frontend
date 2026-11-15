<script setup lang="ts">
// This Nuxt page will render every Kirby page.

import type { KirbyPageData } from '~/queries'
import { getPageQuery } from '~/queries'

const { localeCodes } = useI18n()
const route = useRoute()

const pageUri = getNonLocalizedSlug(route.params.slug!, localeCodes.value)

const { data: pageData, error: pageError } = await useKqlPage<KirbyPageData>(
  getPageQuery(pageUri || 'home'),
)

let data = pageData.value
let fetchError = pageError.value

// If page content is empty, load the error page.
if (!data?.result) {
  const { data: pageData, error: pageError } = await useKqlPage<KirbyPageData>(
    getPageQuery('error'),
  )
  data = pageData.value
  fetchError = pageError.value
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

const page = data?.result
setPage(page!)
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
