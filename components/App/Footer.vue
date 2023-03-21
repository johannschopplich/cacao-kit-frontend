<script setup lang="ts">
import { NuxtLink } from '#components'

const { locale, locales, t } = useI18n()
const site = useSite()

const listedChildren = computed(() =>
  site.value?.children?.filter((i) => i.isListed)
)
</script>

<template>
  <br />
  <hr />

  <footer class="grid">
    <div class="column" style="--columns: 2">
      <h5>{{ t('languages') }}</h5>
      <dl>
        <dd v-for="item in locales" :key="item">
          <component :is="item === locale ? 'span' : NuxtLink" :to="`/${item}`">
            {{ t(`language.${item}`) }}
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
      <img
        src="/icon.svg"
        width="72"
        height="72"
        style="vertical-align: middle"
      />
    </div>
  </footer>
</template>
