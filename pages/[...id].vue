<script setup lang="ts">
import { joinURL } from 'ufo'
import type { KirbyQueryResponse, KirbyQuerySchema } from '#nuxt-kql'

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

const select: KirbyQuerySchema['select'] = {
  uri: true,
  title: true,
  intendedTemplate: true,
  description: true,
  blocks: 'page.blocks.toResolvedBlocks.toArray',
  cover: {
    query: 'page.cover.toFile?.resize(1200)',
    select: ['url'],
  },
}

const { data: defaultData } = await useKql(
  {
    query: `page("${kirbyPath}")`,
    select,
  },
  { language: locale.value }
)

// Fall back to error page if no page data is found
const data = ref<KirbyQueryResponse | null>(defaultData.value)

if (!data.value?.result) {
  const { data: errorData } = await useKql(
    {
      query: 'page("error")',
      select,
    },
    { language: locale.value }
  )
  data.value = errorData.value
  setResponseStatus(404)
}

// Store page data
const page = data.value?.result
usePage().value = page

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
  <KirbyBlocks
    v-if="page"
    :blocks="page.blocks"
    :class="[`template-${page.intendedTemplate}`]"
  />
</template>
