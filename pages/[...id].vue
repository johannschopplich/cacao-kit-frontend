<script setup lang="ts">
import { joinURL } from 'ufo'
import { getPageQuery } from '~/queries'
import type { KirbyPageResponse } from '~/queries'

const { locale } = useI18n()
const { hasLocalePrefix, id } = usePathSegments()
const { debug } = useRuntimeConfig().public

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
usePage().value = page ?? {}

// Build the page meta tags
const { siteUrl } = useRuntimeConfig().public
const site = useSite()
const title = page?.title
  ? `${page.title} – ${site.value.title}`
  : site.value.title
const description = page?.description || site.value.description
const url = joinURL(siteUrl, useRoute().path)
const image = page?.cover?.url || site.value?.cover?.url

// Set the page meta tags
useHead({
  title,
  bodyAttrs: {
    'data-template': page?.intendedTemplate,
  },
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: image },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:url', content: url },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: image },
  ],
  link: [
    { rel: 'canonical', href: url },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: url,
    },
  ],
})
</script>

<template>
  <details v-if="debug && fetchError">
    <summary>Error fetching page data</summary>
    <pre style="font-size: 0.875em">{{
      JSON.stringify(fetchError, undefined, 2)
    }}</pre>
  </details>
  <KirbyLayouts v-else-if="page?.layouts?.length" :layouts="page.layouts" />
  <KirbyBlocks v-else-if="page?.blocks" :blocks="page.blocks" />
</template>
