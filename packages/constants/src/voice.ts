export const VOICE = {
  archetype: 'The Curator',
  elevator: 'Where wine lovers and audiophiles find common ground.',

  tone: ['warm', 'knowledgeable', 'understated', 'inviting'] as const,
  avoid: ['pretentious', 'loud', 'corporate', 'casual-slang'] as const,

  // Useful for AI-assisted copywriting, content briefs, and onboarding
  guidelines: [
    'Write like a knowledgeable friend, not a wine snob.',
    'Lead with experience, not credentials.',
    'Short sentences. Let the product speak.',
    'Never use the word "curated" unironically.',
  ] as const,

  // Example copy — reference for consistency across pages and campaigns
  examples: {
    good: [
      'A glass worth sitting down for.',
      'The record you forgot you loved.',
      'No background music. Just music.',
    ],
    bad: [
      'Elevate your palate with our curated selection.',
      'An immersive multisensory experience.',
    ],
  },
} as const

export type Voice = typeof VOICE
