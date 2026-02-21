export type MenuSection = 'wine' | 'spirits' | 'beer' | 'na' | 'food'
export type WineStyle =
  | 'red'
  | 'white'
  | 'rosé'
  | 'sparkling'
  | 'orange'
  | 'dessert'
export type ServiceStyle = 'by-the-glass' | 'by-the-bottle' | 'flight'

export const MENU_SECTIONS: Record<
  MenuSection,
  { label: string; description: string }
> = {
  wine: {
    label: 'Wine',
    description:
      'Curated natural, biodynamic, and conventional pours from small producers worldwide.',
  },
  spirits: {
    label: 'Spirits & Cocktails',
    description: 'Aperitifs, digestifs, and a concise list of craft cocktails.',
  },
  beer: {
    label: 'Beer',
    description: 'A rotating tap and a small curated bottle selection.',
  },
  na: {
    label: 'Non-Alcoholic',
    description:
      'Thoughtfully chosen zero-proof options — not an afterthought.',
  },
  food: {
    label: 'Kitchen',
    description: 'Charcuterie, cheese, and small plates designed for sharing.',
  },
} as const

export const WINE_STYLES: Record<WineStyle, { label: string; emoji: string }> =
  {
    red: { label: 'Red', emoji: '🍷' },
    white: { label: 'White', emoji: '🥂' },
    rosé: { label: 'Rosé', emoji: '🌸' },
    sparkling: { label: 'Sparkling', emoji: '✨' },
    orange: { label: 'Orange', emoji: '🍊' },
    dessert: { label: 'Dessert', emoji: '🍯' },
  } as const

// Wine regions featured — useful for filter UI
export const WINE_REGIONS = [
  'Burgundy',
  'Bordeaux',
  'Rhône',
  'Loire',
  'Champagne',
  'Italy',
  'Spain',
  'Germany',
  'California',
  'Oregon',
  'Natural & Biodynamic',
] as const

export type WineRegion = (typeof WINE_REGIONS)[number]

// Price tier labels — used in menu display and filters
export const PRICE_TIERS = {
  1: { label: 'Accessible', symbol: '$' },
  2: { label: 'Mid-Range', symbol: '$$' },
  3: { label: 'Premium', symbol: '$$$' },
  4: { label: 'Collectible', symbol: '$$$$' },
} as const

export type PriceTier = keyof typeof PRICE_TIERS
