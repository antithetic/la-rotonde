import { SITE } from './site.ts'
import { ADDRESS, CONTACT, GEO } from './contact.ts'
import { HOURS, DAY_NAMES } from './hours.ts'
import { SOCIAL } from './social.ts'

export const SEO_DEFAULTS = {
  title: `${SITE.name} — ${SITE.tagline}`,
  titleTemplate: `%s | ${SITE.name}`,
  description: SITE.description,
  canonical: SITE.url,

  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/og/default.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    creator: '@larotunde', // replace with real handle
    site: '@larotunde',
  },
} as const

// ── JSON-LD Structured Data ──────────────────────────────────────────────────
// Drop this directly into a <script type="application/ld+json"> tag.
// Helps Google display rich results: hours, address, reviews, etc.

export function getLocalBusinessSchema() {
  // Map hours to schema.org openingHoursSpecification
  const openingHours = DAY_NAMES.filter((day) => !HOURS[day].closed).map(
    (day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${day.charAt(0).toUpperCase() + day.slice(1)}`,
      opens: HOURS[day].open,
      closes: HOURS[day].close,
    })
  )

  return {
    '@context': 'https://schema.org',
    '@type': ['BarOrPub', 'MusicVenue', 'LocalBusiness'],
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: `${SITE.url}/og/default.jpg`,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    servesCuisine: ['Wine', 'Charcuterie', 'Small Plates'],

    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.zip,
      addressCountry: ADDRESS.country,
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.lat,
      longitude: GEO.lng,
    },

    openingHoursSpecification: openingHours,

    sameAs: Object.values(SOCIAL)
      .filter((s) => s.url)
      .map((s) => s.url),
  } as const
}

// Per-page title helper
export function formatPageTitle(pageTitle: string): string {
  return SEO_DEFAULTS.titleTemplate.replace('%s', pageTitle)
}
