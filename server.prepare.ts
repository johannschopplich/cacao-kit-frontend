import type { KirbyQueryRequest, KirbyQueryResponse } from 'kirby-types'
import process from 'node:process'
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config'
import { siteQuery } from './app/queries'

const staticQuery = {
  query: 'site',
  select: {
    languages: 'kirby.languages',
  },
} satisfies KirbyQueryRequest

export default defineNuxtPrepareHandler(async () => {
  const [kirbyStatic, kirbySite] = await Promise.all([
    fetchQuery(staticQuery),
    // Currently only used to infer the type of the `site` query.
    fetchQuery(siteQuery),
  ])

  return {
    state: {
      kirbyStatic: kirbyStatic.result,
      kirbySite: kirbySite.result,
    },
  }
})

async function fetchQuery(query: KirbyQueryRequest) {
  const response = await fetch(`${process.env.KIRBY_BASE_URL}/api/kql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KIRBY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })

  if (!response.ok)
    throw new Error(`KQL query failed with status ${response.status}`)

  return (await response.json()) as KirbyQueryResponse
}
