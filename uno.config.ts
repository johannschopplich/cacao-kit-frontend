import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      // Oat ships its own base styles in a cascade layer, which an unlayered
      // reset would override.
      preflights: { reset: false },
    }),
  ],
  // Oat ships these class names too. Unlayered UnoCSS rules would override
  // Oat's layered ones, e.g. `outline` would draw a ring around Oat's
  // outlined buttons and badges. Variants like `md:flex` are blocked too.
  blocklist: [
    ...Array.from({ length: 12 }, (_, i) => `col-${i + 1}`),
    'container',
    'flex',
    'flex-col',
    'gap-1',
    'gap-2',
    'gap-4',
    'gap-6',
    'items-center',
    'justify-between',
    'justify-center',
    'justify-end',
    'mb-2',
    'mb-4',
    'mb-6',
    'mb-8',
    'mt-2',
    'mt-4',
    'mt-6',
    'mt-8',
    'outline',
    'p-4',
    'table',
    'text-light',
    'w-100',
  ],
})
