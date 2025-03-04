import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        ic: () => import('@iconify-json/ic/icons.json').then(i => i.default),
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default),
        flags: () => import('@iconify-json/circle-flags/icons.json').then(i => i.default),
      },
    }),
    presetWebFonts({
      provider: 'bunny',
      timeouts: {
        warning: 7_000,
        failure: 10_000,
      },
      fonts: {
        mono: 'Inter',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
