import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { tokens } from '@repo/foundations'

export const config = defineConfig({
  shortcuts: [
    // ─── Shortcuts ─────────────────────────────────────────────────────────────
    // Composable multi-class aliases. These are the design system's "components"
    // at the CSS level — your Astro components will compose these.
  ],
  theme: {
    colors: {
      // From @repo/foundations
      primary: tokens.color.primary,
      secondary: tokens.color.secondary,
    },
  },
  presets: [
    // ─── Presets ────────────────────────────────────────────────────────────────
    // The core building blocks of your design system. These are the "atoms" of
    // your CSS — the smallest, most fundamental units that can be composed into
    // larger patterns.
    presetWind4({
      // Tailwind/Windi-compatible utility classes
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ─── Theme Fonts ──────────────────────────────────────────────────────────
        // Define your design system's font stack here. These are the fonts
        // that will be used throughout your project.
      },
    }),
  ],
  transformers: [
    // ─── Transformers ────────────────────────────────────────────────────────────
    // The tools that transform your CSS. These are the "verbs" of your CSS — the
    // actions that can be performed on your design system's "atoms".
    transformerDirectives(), // Enables @apply, @screen in CSS
    transformerVariantGroup(), // Enables hover:(bg-red text-white) syntax
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
export default config
