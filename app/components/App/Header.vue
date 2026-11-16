<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

// The page's request also brings the site data on the first render.
await waitForPage()

const { locale, t } = useI18n()
const route = useRoute()
const site = useSite()

const homePath = computed(() => `/${locale.value}`)

const navItems = computed(() => [
  {
    title: t('home'),
    path: homePath.value,
  },
  ...(site.value.children ?? [])
    .filter((i) => i.isListed)
    .map((i) => ({ title: i.title, path: `/${locale.value}/${i.uri}` })),
])

function isActive(path: string) {
  // The home path prefixes every other path, so match it exactly.
  return path === homePath.value
    ? withoutTrailingSlash(route.path) === path
    : route.path.startsWith(path)
}
</script>

<template>
  <header data-topnav>
    <div class="header-inner">
      <NuxtLink :to="homePath" class="header-brand unstyled">
        <img src="/icon.svg" width="28" height="28" alt="" class="logo-tile" />
        <strong>{{ site.title }}</strong>
        <small>{{ t('header.title') }}</small>
      </NuxtLink>

      <nav>
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :aria-current="isActive(item.path) ? 'page' : undefined"
        >
          {{ item.title }}
        </NuxtLink>
        <a
          href="https://github.com/johannschopplich/cacao-kit-frontend"
          rel="noopener"
          target="_blank"
          class="button small outline"
        >
          GitHub ↗
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
#__nuxt > header[data-topnav] {
  margin-block-end: var(--space-4);
  padding: 0;
  background-color: color-mix(in srgb, var(--background) 85%, transparent);
  backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  width: 100%;
  max-width: var(--content-width);
  margin-inline: auto;
  padding: var(--space-3) var(--content-padding);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-5);
}

.header-brand small {
  padding-inline-start: var(--space-3);
  font-size: var(--text-7);
  color: var(--muted-foreground);
  border-inline-start: 1px solid var(--border);
}

nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
}

nav a {
  white-space: nowrap;
}

nav a:not(.button) {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-7);
  font-weight: var(--font-medium);
  color: var(--muted-foreground);
  border-radius: var(--radius-medium);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

nav a:not(.button):is(:hover, [aria-current]) {
  color: var(--foreground);
  background-color: var(--accent);
}

nav .button {
  margin-inline-start: var(--space-2);
}

@media (max-width: 640px) {
  .header-brand small {
    display: none;
  }

  /* Line the first link's text up with the brand once the nav wraps. */
  nav {
    margin-inline-start: calc(-1 * var(--space-3));
  }
}
</style>
