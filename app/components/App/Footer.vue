<script setup lang="ts">
import type { KirbyPageData } from '~/queries'
import { NuxtLink } from '#components'

// Wait for the page to be loaded before rendering this component,
// otherwise `usePage()` would return `undefined`.
await waitForPage()

const { locale, locales, t } = useI18n()
const site = useSite()
const page = usePage<KirbyPageData>()

const localeCodes = computed(() =>
  locales.value.map((i) => (typeof i === 'string' ? i : i.code)),
)

const listedChildren = computed(() =>
  (site.value.children ?? []).filter((i) => i.isListed),
)

const translatedUris = computed(() =>
  Object.fromEntries(
    Object.entries(page.value.i18nMeta).map(([code, { uri }]) => [code, uri]),
  ),
)
</script>

<template>
  <footer>
    <hr />

    <div class="grid">
      <div class="column" style="--columns: 2">
        <h5>{{ t('languages') }}</h5>
        <ul class="unstyled">
          <li v-for="code in localeCodes" :key="code">
            <component
              :is="code === locale ? 'span' : NuxtLink"
              :to="`/${code}${
                translatedUris[code] && translatedUris[code] !== 'home'
                  ? `/${translatedUris[code]}`
                  : ''
              }`"
              :aria-current="code === locale ? 'true' : undefined"
            >
              {{ t(`language.${code}`) }}
            </component>
          </li>
        </ul>
      </div>

      <div class="column" style="--columns: 4">
        <h5>{{ t('footer.listedPages') }}</h5>
        <ul class="unstyled">
          <li v-for="item in listedChildren" :key="item.uri">
            <NuxtLink :to="`/${locale}/${item.uri}`">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="column" style="--columns: 6">
        <h5>{{ t('footer.builtWith.title') }}</h5>
        <p v-html="t('footer.builtWith.text')" />
      </div>

      <div class="column footer-logo" style="--columns: 12">
        <img src="/icon.svg" width="40" height="40" alt="" class="logo-tile" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
#__nuxt > footer {
  padding-block-end: var(--space-8);
  font-size: var(--text-7);
  color: var(--muted-foreground);
}

h5 {
  margin-block-end: var(--space-3);
  color: var(--foreground);
}

:is(ul a, [aria-current]) {
  color: inherit;
}

:is(ul a:hover, [aria-current]) {
  color: var(--foreground);
}

[aria-current] {
  font-weight: var(--font-medium);
}

.footer-logo {
  margin-block-start: var(--space-6);
  text-align: center;
}
</style>
