<script setup lang="ts">
// This Nuxt page will render the about page

import { aboutQuery } from '~/queries'
import type { KirbyAboutResponse } from '~/queries'

const { data, error } = await useKql<KirbyAboutResponse>(aboutQuery)

// Store page data
const page = data.value?.result
setPage(page)
</script>

<template>
  <div>
    <DevOnly>
      <AppDebugHelper :error="error" />
    </DevOnly>

    <KirbyLayouts v-if="page?.layouts?.length" :layouts="page.layouts" />

    <br />

    <header>
      <h2>Get in contact</h2>
      <div class="grid" style="--gutter: 1.5rem">
        <section v-router-links class="column text" style="--columns: 4">
          <h3>Address</h3>
          <div v-html="page?.address" />
        </section>

        <section class="column text" style="--columns: 4">
          <h3>Email</h3>
          <p v-html="page?.email" />
          <h3>Phone</h3>
          <p v-html="page?.phone" />
        </section>

        <section class="column text" style="--columns: 4">
          <h3>On the Web</h3>
          <ul>
            <li v-for="(item, index) in page?.social" :key="index">
              <a :href="item.url">
                {{ item.platform }}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </header>
  </div>
</template>
