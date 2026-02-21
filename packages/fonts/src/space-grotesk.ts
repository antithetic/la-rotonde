// Supports weights 300-700
import '@fontsource-variable/space-grotesk/wght.css'

export const spaceGrotesk = {
  family: 'Space Grotesk',
  variable: 'true',
  weights: [300, 400, 500, 600, 700] as const,
  styles: ['normal'] as const,
  // The CSS custom property to use in font stacks
  cssVar: '--font-space-grotesk',
} as const

export type SpaceGroteskFont = typeof spaceGrotesk
