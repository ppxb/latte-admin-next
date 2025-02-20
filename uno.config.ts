import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetWind3 } from 'unocss/preset-wind3'

export default defineConfig({
  shortcuts: {
    'text-foreground-muted': 'text-[var(--n-text-color)]',
  },
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
