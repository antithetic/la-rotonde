export function getBlockExcerpt(text: string | undefined, maxLength = 200) {
  if (!text) return undefined

  const cleanText = text.replace(/\s+/g, ' ').trim()

  if (!cleanText) return undefined

  return cleanText.length > maxLength
    ? `${cleanText.slice(0, maxLength).trim()}…`
    : cleanText
}
