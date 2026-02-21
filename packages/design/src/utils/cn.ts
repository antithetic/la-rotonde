// Lightweight class merging utility.
// Joins truthy strings and flattens arrays — no external dependencies needed
// since UnoCSS handles deduplication at the CSS level.

type ClassValue = string | undefined | null | false | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity as 0)
    .filter(Boolean)
    .join(' ')
}
