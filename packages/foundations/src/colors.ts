/**
 * Design tokens – single source of truth for the shared foundations package.
 * Export these for use in app configs (Uno/Tailwind), theming, or CSS generation.
 */

export const tokens = {
  color: {
    primary: '#bfe89d',
    secondary: '#1c0918',
  },
} as const

export type Tokens = typeof tokens
