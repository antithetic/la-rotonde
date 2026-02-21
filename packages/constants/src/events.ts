export type EventCategory =
  | 'listening-session'
  | 'wine-tasting'
  | 'live-music'
  | 'private-event'
  | 'release-party'
  | 'pairing-dinner'
  | 'trivia'

export const EVENT_CATEGORIES: Record<
  EventCategory,
  {
    label: string
    description: string
    color: string // maps to a UnoCSS token key
  }
> = {
  'listening-session': {
    label: 'Listening Session',
    description:
      'Curated albums played front-to-back on the HiFi system. No talking during tracks.',
    color: 'brand',
  },
  'wine-tasting': {
    label: 'Wine Tasting',
    description: 'Guided flights with producer notes and food pairings.',
    color: 'success',
  },
  'live-music': {
    label: 'Live Music',
    description:
      'Acoustic and small-ensemble performances in the listening room.',
    color: 'warning',
  },
  'private-event': {
    label: 'Private Event',
    description: 'Buyout and semi-private bookings for groups.',
    color: 'neutral',
  },
  'release-party': {
    label: 'Album Release',
    description: 'Celebrating new records with the artists and community.',
    color: 'info',
  },
  'pairing-dinner': {
    label: 'Pairing Dinner',
    description: 'Multi-course dinners with matched wine pours.',
    color: 'error',
  },
  trivia: {
    label: 'Music & Wine Trivia',
    description:
      'Monthly trivia night covering music history and wine knowledge.',
    color: 'neutral',
  },
} as const

// Recurring programming schedule
export const RECURRING_EVENTS = [
  {
    title: 'Sunday Listening Session',
    category: 'listening-session' as EventCategory,
    day: 'Sunday',
    time: '3:00 PM',
    tagline: 'A different album every week. Come early, get a seat.',
  },
  {
    title: 'Thursday Late Pour',
    category: 'wine-tasting' as EventCategory,
    day: 'Thursday',
    time: '8:00 PM',
    tagline: 'Impromptu pours from bottles we want to share. First come.',
  },
  {
    title: 'Music & Wine Trivia',
    category: 'trivia' as EventCategory,
    day: 'First Wednesday of each month',
    time: '7:00 PM',
    tagline: 'Teams of up to 4. Winner takes a bottle.',
  },
] as const

// Reservation / ticketing config
export const RESERVATIONS = {
  platform: 'Resy', // or 'OpenTable', 'Tock', etc.
  url: 'https://resy.com/cities/sd/la-rotunde',
  privateEventsUrl: 'https://larotunde.com/private-events',
  depositRequired: true,
  depositAmount: 25, // USD per person for ticketed events
  cancellationHrs: 24, // hours before event for full refund
  maxPartySize: 8, // walk-in / standard reservation
  largePartySize: 9, // triggers private events inquiry
  largePartyEmail: 'events@larotunde.com',
} as const
