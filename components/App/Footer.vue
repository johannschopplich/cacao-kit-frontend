<script setup lang="ts">
import { NuxtLink } from '#components'

const { locale, locales, t } = useI18n()
const site = useSite()

const listedChildren = computed(() =>
  site.value?.children?.filter((i: any) => i.isListed)
)
</script>

<template>
  <hr />
  <footer class="grid">
    <div class="column" style="--columns: 6">
      <h5>{{ t('footer.builtWith.title') }}</h5>
      <p v-html="t('footer.builtWith.text')" />
    </div>

    <div class="column" style="--columns: 3">
      <h5>{{ t('languages') }}</h5>
      <ul>
        <li v-for="item in locales" :key="item">
          <component :is="item === locale ? 'span' : NuxtLink" :to="`/${item}`">
            {{ t(`language.${item}`) }}
          </component>
        </li>
      </ul>
    </div>

    <div class="column" style="--columns: 3">
      <h5>{{ t('footer.listedPages') }}</h5>
      <ul>
        <li v-for="item in listedChildren" :key="item.uri">
          <NuxtLink :to="`/${locale}/${item.uri}`">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
