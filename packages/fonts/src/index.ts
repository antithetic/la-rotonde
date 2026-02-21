export { spaceGrotesk } from './space-grotesk'
export type { SpaceGroteskFont } from './space-grotesk'

// Convenience object — useful for iterating fonts in config or docs
export const fonts = {
  display: {
    family: 'Space Grotesk',
    cssVar: '--font-space-grotesk',
    fallback: ['system-ui', 'sans-serif'],
    // Full CSS font stack — use this in UnoCSS theme
    stack: '"Space Grotesk Variable", sans-serif',
  },
} as const

export type Fonts = typeof fonts
