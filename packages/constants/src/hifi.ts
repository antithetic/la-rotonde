export const HIFI = {
  tagline: 'Sound is the other half of the experience.',
  description:
    'Our listening room is built around a full high-fidelity system — ' +
    'turntables, tube amplification, and reference loudspeakers. ' +
    'Music here is not background noise.',

  // The actual system — update with your real equipment
  system: {
    turntable: 'Technics SL-1200G',
    cartridge: 'Ortofon Cadenza Black',
    phono: 'EAR Yoshino 834P',
    amplifier: 'Line Magnetic LM-508IA',
    speakers: 'Klipsch La Scala AL5',
    dac: 'Chord Hugo TT2',
    streamer: 'Aurender N200',
    cables: 'Cardas Clear',
  },

  // Listening room etiquette — shown in venue and on events pages
  etiquette: [
    'During listening sessions, we ask that conversations pause while tracks play.',
    'Requests are welcome between albums.',
    'Flash photography is off during sessions — the mood is everything.',
    'No outside recordings without prior consent.',
  ],

  // Format support — useful for event listings
  formats: ['Vinyl', 'Digital (Streaming)', 'CD', 'Reel-to-Reel'] as const,
} as const

export type HiFi = typeof HIFI
