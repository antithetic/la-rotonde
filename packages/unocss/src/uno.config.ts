import {
  defineConfig,
  presetWind4,
  presetAttributify,
  presetTypography,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
})
