export const ADDRESS = {
  street: '3968 Fifth Ave',
  city: 'San Diego',
  state: 'CA',
  stateLabel: 'California',
  zip: '92103',
  country: 'US',
  countryLabel: 'United States',
  neighborhood: 'Hillcrest',

  // Formatted variants — avoids re-formatting in every template
  oneLine: '3968 Fifth Ave, San Diego, CA 92103',
  twoLine: '3968 Fifth Ave\nSan Diego, CA 92103',
  full: '3968 Fifth Ave, Hillcrest, San Diego, CA 92103, US',
} as const

export const GEO = {
  lat: 32.7477,
  lng: -117.1628,
  // Google Maps
  mapsUrl: 'https://maps.google.com/?q=3968+Fifth+Ave+San+Diego+CA+92103',
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!...', // replace with real embed
  // Apple Maps
  appleMapsUrl:
    'https://maps.apple.com/?address=3968+Fifth+Ave,San+Diego,CA+92103',
  // What3Words (optional precision location)
  what3words: undefined as string | undefined,
} as const

export const CONTACT = {
  phone: '+16195550123', // replace with real number
  phoneLabel: '(619) 555-0123',
  phoneWhatsapp: 'https://wa.me/16195550123',
  email: 'hello@larotunde.com',
  emailReservations: 'reservations@larotunde.com',
  emailBookings: 'bookings@larotunde.com',
  emailPress: 'press@larotunde.com',
} as const

// Helpers — derived from the above, no magic strings in templates
export function formatPhone(raw = CONTACT.phone): string {
  return raw.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3')
}

export type Address = typeof ADDRESS
export type Geo = typeof GEO
export type Contact = typeof CONTACT
