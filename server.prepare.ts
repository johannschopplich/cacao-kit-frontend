import type { KirbyQueryRequest, KirbyQueryResponse } from 'kirby-types'
import process from 'node:process'
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'
import { joinURL } from 'ufo'
import { siteQuery } from './app/queries'

const staticQuery = {
  query: 'site',
  select: {
    languages: 'kirby.languages',
  },
} satisfies KirbyQueryRequest

export default defineNuxtPrepareHandler(async () => {
  const [staticResponse, siteResponse] = await Promise.all([
    fetchQuery('kirbyStatic', staticQuery),
    // Fetched only to infer the `KirbySite` type.
    fetchQuery('kirbySite', siteQuery),
  ])

  return {
    data: {
      kirbyStatic: staticResponse.result,
      kirbySite: siteResponse.result,
    },
  }
})

async function fetchQuery(key: string, query: KirbyQueryRequest) {
  const { NUXT_KIRBY_URL, NUXT_KIRBY_TOKEN } = process.env
  if (!NUXT_KIRBY_URL || !NUXT_KIRBY_TOKEN)
    throw new Error(
      'Set `NUXT_KIRBY_URL` and `NUXT_KIRBY_TOKEN` to prefetch the KQL queries.',
    )

  const response = await fetch(joinURL(NUXT_KIRBY_URL, 'api/kql'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NUXT_KIRBY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })

  if (!response.ok)
    throw new Error(
      `KQL query \`${key}\` failed with status ${response.status}: ${await response.text()}`,
    )

  return (await response.json()) as KirbyQueryResponse
}
