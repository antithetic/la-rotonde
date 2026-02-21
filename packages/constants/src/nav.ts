export interface NavItem {
  label: string
  href: string
  external?: boolean
  badge?: string // e.g. 'New', 'Live Tonight'
}

export const NAV_MAIN: NavItem[] = [
  { label: 'Menu', href: '/menu' },
  { label: 'Events', href: '/events' },
  { label: 'The Bar', href: '/about' },
  { label: 'HiFi Setup', href: '/hifi' },
  { label: 'Reserve', href: '/reservations', badge: 'Book Now' },
]

export const NAV_FOOTER: NavItem[] = [
  { label: 'Menu', href: '/menu' },
  { label: 'Events', href: '/events' },
  { label: 'Private Events', href: '/private-events' },
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
  { label: 'Reservations', href: '/reservations' },
]

export const NAV_LEGAL: NavItem[] = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Accessibility', href: '/legal/accessibility' },
]

// Anchor links used within long pages
export const ANCHORS = {
  wine: '#wine',
  spirits: '#spirits',
  food: '#food',
  hifi: '#hifi-system',
  contact: '#contact',
  map: '#map',
} as const
