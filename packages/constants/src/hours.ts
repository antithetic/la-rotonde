// Day indices match JS Date.getDay(): 0 = Sunday, 6 = Saturday
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type DayName =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

export interface DayHours {
  open: string // 24h format: 'HH:MM'
  close: string // 24h format: 'HH:MM' — use '02:00' for 2am next day
  label: string // human-readable: '5:00 PM – 2:00 AM'
  closed: boolean
}

export const HOURS: Record<DayName, DayHours> = {
  sunday: {
    open: '14:00',
    close: '22:00',
    label: '2:00 PM – 10:00 PM',
    closed: false,
  },
  monday: { open: '00:00', close: '00:00', label: 'Closed', closed: true },
  tuesday: {
    open: '17:00',
    close: '00:00',
    label: '5:00 PM – Midnight',
    closed: false,
  },
  wednesday: {
    open: '17:00',
    close: '00:00',
    label: '5:00 PM – Midnight',
    closed: false,
  },
  thursday: {
    open: '17:00',
    close: '01:00',
    label: '5:00 PM – 1:00 AM',
    closed: false,
  },
  friday: {
    open: '16:00',
    close: '02:00',
    label: '4:00 PM – 2:00 AM',
    closed: false,
  },
  saturday: {
    open: '14:00',
    close: '02:00',
    label: '2:00 PM – 2:00 AM',
    closed: false,
  },
} as const

export const DAY_NAMES: DayName[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

// Happy hour — referenced in menus, events, and promotional copy
export const HAPPY_HOUR = {
  days: ['tuesday', 'wednesday', 'thursday'] as DayName[],
  daysLabel: 'Tue – Thu',
  start: '17:00',
  end: '19:00',
  label: '5:00 – 7:00 PM',
  tagline: 'Half off by-the-glass pours. Every Tuesday through Thursday.',
} as const

// ── Utilities ────────────────────────────────────────────────────────────────

/** Returns today's hours using the venue's local timezone. */
export function getTodayHours(): DayHours {
  const day = new Date()
    .toLocaleDateString('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'long',
    })
    .toLowerCase() as DayName
  return HOURS[day]
}

/** Returns true if the venue is currently open. */
export function isOpenNow(): boolean {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
  const today = getTodayHours()
  if (today.closed) return false

  const [nowH, nowM] = timeStr.split(':').map(Number)
  const [openH, openM] = today.open.split(':').map(Number)
  const [closeH, closeM] = today.close.split(':').map(Number)

  const nowMins = nowH * 60 + nowM
  const openMins = openH * 60 + openM
  // Close time past midnight — add 24h worth of minutes
  const closeMins = closeH * 60 + closeM + (closeH < openH ? 1440 : 0)

  return nowMins >= openMins && nowMins < closeMins
}

/** Returns a formatted hours table for display. */
export function getHoursTable(): Array<{ day: string; hours: string }> {
  return DAY_NAMES.map((day) => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    hours: HOURS[day].label,
  }))
}
