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

/** CSS custom property names and values for :root or inline styles */
export const cssVars = {
  '--primary': tokens.color.primary,
  '--secondary': tokens.color.secondary,
} as const

/** Generates :root { --primary: ...; --secondary: ...; } for injection or build-time CSS */
export function getRootCss(): string {
  const lines = Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  return `:root {\n${lines}\n}`
}
/** cssVars / getRootCss are defined but not yet injected — note the two separate resolution paths. */
