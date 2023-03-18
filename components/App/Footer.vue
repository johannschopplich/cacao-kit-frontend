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
      <h5><a href="https://getkirby.com">Made with Kirby</a></h5>
      <p>
        Kirby: the file-based CMS that adapts to any project, loved by
        developers and editors alike
      </p>
    </div>

    <div class="column" style="--columns: 3">
      <h5>Languages</h5>
      <ul>
        <li v-for="item in locales" :key="item">
          <component :is="item === locale ? 'span' : NuxtLink" :to="`/${item}`">
            {{ t(`language.${item}`) }}
          </component>
        </li>
      </ul>
    </div>

    <div class="column" style="--columns: 3">
      <h5>Listed Pages</h5>
      <ul>
        <li v-for="item in listedChildren" :key="item.uri">
          <NuxtLink :to="`/${locale}/${item.uri}`">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
