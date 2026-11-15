import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      // Oat ships its own base styles in a cascade layer, which an unlayered
      // reset would override.
      preflights: { reset: false },
    }),
  ],
})
