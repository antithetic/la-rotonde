import { SITE } from './site.ts'

export const LEGAL = {
  businessName: 'La Rotunde LLC', // legal entity
  abn: undefined as string | undefined, // business registration number
  privacyEmail: 'privacy@larotunde.com',
  copyrightYear: 2024,
  copyrightHolder: SITE.name,

  // Dynamic copyright line for footers
  get copyright() {
    const year = new Date().getFullYear()
    const start = this.copyrightYear
    const range = year > start ? `${start}–${year}` : `${start}`
    return `© ${range} ${this.copyrightHolder}. All rights reserved.`
  },

  liquorLicense: 'Type 42 — On-Sale Beer and Wine',
  ageRestriction: 21,
  ageStatement: 'Must be 21 or older to enter after 9:00 PM.',

  links: {
    privacy: '/legal/privacy',
    terms: '/legal/terms',
    accessibility: '/legal/accessibility',
  },
} as const
