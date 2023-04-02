<script setup lang="ts">
import { NuxtLink } from '#components'
import type { KirbyPageData } from '~/queries'

// Wait for the page to be loaded before rendering this component,
// otherwise `usePage()` would return `undefined`
await hasPage()

const { locale, locales, t } = useI18n()
const site = useSite()
const page = usePage<KirbyPageData>()

const listedChildren = site.value.children?.filter((i) => i.isListed)

const translatedUris = computed(() =>
  Object.fromEntries(
    Object.entries(page.value.i18nMeta).map(([code, { uri }]) => [code, uri])
  )
)
</script>

<template>
  <br />
  <hr />

  <footer class="grid">
    <div class="column" style="--columns: 2">
      <h5>{{ t('languages') }}</h5>
      <dl>
        <dd v-for="code in locales" :key="code">
          <component
            :is="code === locale ? 'span' : NuxtLink"
            :to="`/${code}${
              translatedUris[code] && translatedUris[code] !== 'home'
                ? `/${translatedUris[code]}`
                : ''
            }`"
          >
            {{ t(`language.${code}`) }}
          </component>
        </dd>
      </dl>
    </div>

    <div class="column" style="--columns: 4">
      <h5>{{ t('footer.listedPages') }}</h5>
      <dl>
        <dd v-for="item in listedChildren" :key="item.uri">
          <NuxtLink :to="`/${locale}/${item.uri}`">{{ item.title }}</NuxtLink>
        </dd>
      </dl>
    </div>

    <div class="column" style="--columns: 6">
      <h5>{{ t('footer.builtWith.title') }}</h5>
      <p v-html="t('footer.builtWith.text')" />
    </div>

    <div class="column" style="--columns: 12; text-align: center">
      <img src="/icon.svg" width="48" height="48" />
    </div>
  </footer>
</template>
