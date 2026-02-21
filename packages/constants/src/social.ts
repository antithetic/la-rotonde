export interface SocialProfile {
  platform: string
  handle: string
  url: string
  label: string // for aria-labels
}

export const SOCIAL = {
  instagram: {
    platform: 'Instagram',
    handle: '@larotunde',
    url: 'https://instagram.com/larotunde',
    label: 'Follow La Rotunde on Instagram',
  },
  facebook: {
    platform: 'Facebook',
    handle: 'LaRotunde',
    url: 'https://facebook.com/larotunde',
    label: 'Like La Rotunde on Facebook',
  },
  tiktok: {
    platform: 'TikTok',
    handle: '@larotunde',
    url: 'https://tiktok.com/@larotunde',
    label: 'Follow La Rotunde on TikTok',
  },
  spotify: {
    platform: 'Spotify',
    handle: 'La Rotunde',
    url: 'https://open.spotify.com/user/larotunde',
    label: 'Follow La Rotunde on Spotify',
  },
  yelp: {
    platform: 'Yelp',
    handle: 'la-rotunde-san-diego',
    url: 'https://yelp.com/biz/la-rotunde-san-diego',
    label: 'Review La Rotunde on Yelp',
  },
} as const

export type SocialKey = keyof typeof SOCIAL
export type Social = typeof SOCIAL
