<script setup lang="ts">
import { NuxtLink } from '#components'
import type { KirbyPageData } from '~/queries'

// Wait for the page to be loaded before rendering this component,
// otherwise `usePage()` would return `undefined`
await hasPage()

const site = useSite()
const page = usePage<KirbyPageData>()

const listedChildren = computed(() =>
  (site.value.children ?? []).filter((i) => i.isListed),
)
</script>

<template>
  <br />
  <hr />

  <footer class="grid">
    <div class="column" style="--columns: 6">
      <h5>Listed Pages</h5>
      <dl>
        <dd v-for="item in listedChildren" :key="item.uri">
          <NuxtLink :to="`/${item.uri}`">{{ item.title }}</NuxtLink>
        </dd>
      </dl>
    </div>

    <div class="column" style="--columns: 6">
      <h5>Made with Nuxt & Kirby</h5>
      <p>
        The source code is
        <a
          href="https://github.com/johannschopplich/cacao-kit-frontend"
          rel="noopener"
        >
          available on GitHub</a
        >.
      </p>
    </div>

    <div class="column" style="--columns: 12; text-align: center">
      <img src="/icon.svg" width="48" height="48" />
    </div>
  </footer>
</template>
