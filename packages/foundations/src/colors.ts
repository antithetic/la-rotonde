/**
 * Design tokens – single source of truth for the shared foundations package.
 * Export these for use in app configs (Uno/Tailwind), theming, or CSS generation.
 */

const copper = '#d46211'

export const tokens = {
  color: {
    primary: copper, // Copper
    'background-light': copper, // Overriding background to be the Copper color
    'background-dark': '#221810',
  },
  borderRadius: {
    DEFAULT: '0.125rem',
    lg: '0.25rem',
    xl: '0.5rem',
    full: '0.75rem',
  },
} as const

export type Tokens = typeof tokens
