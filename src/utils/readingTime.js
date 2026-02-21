/**
 * Estimate reading time for a given text.
 * Average reading speed: ~200 words per minute.
 */
export function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}
