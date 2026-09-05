import {
  defineConfig,
  presetWind4,
  presetTypography,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss'

export const unoConfig = defineConfig({
  // ─── Presets ────────────────────────────────────────────────────────────────
  // The core building blocks of your design system. These are the "atoms" of
  // your CSS — the smallest, most fundamental units that can be composed into
  // larger patterns.
  presets: [
    // Tailwind/Windi-compatible utility classes
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetTypography({}),
  ],
  transformers: [
    // ─── Transformers ────────────────────────────────────────────────────────────
    // The tools that transform your CSS. These are the "verbs" of your CSS — the
    // actions that can be performed on your design system's "atoms".
    transformerVariantGroup(), // Enables @apply, @screen in CSS
    transformerDirectives(), // Enables hover:(bg-red text-white) syntax
  ],
  // ─── Content Pipeline ──────────────────────────────────────────────────────
  // When consumed by an Astro app, Astro's integration handles content
  // detection. This is a fallback for tools that use this config standalone.
  // content: {
  //   pipeline: {
  //     include: [
  //       /\.(vue|svelte|[jt]sx|mdx?|astro|html)($|\?)/,
  //       'src/**/*.{js,ts}',
  //     ],
  //   },
  // },
})

// Named export for apps that want to spread/extend
export default unoConfig
