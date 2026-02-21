export const SITE = {
  name: 'La Rotonde',
  tagline: 'Wine & HiFi Music Bar',
  description:
    'An intimate wine bar and high-fidelity listening lounge in the heart of Hillcrest, San Diego.',
  url: 'https://la-rotonde-web.vercel.app',
  locale: 'en-US',
  timezone: 'America/Los_Angeles',
  currency: 'USD',
  region: 'San Diego, CA',
  neighborhood: 'Hillcrest',

  // Logo paths live here — they're site assets, not design tokens
  logo: {
    primary: '/brand/logo-primary.svg',
    light: '/brand/logo-light.svg',
    dark: '/brand/logo-dark.svg',
    icon: '/brand/icon.svg',
    wordmark: '/brand/wordmark.svg',
  },
} as const

export type Site = typeof SITE
