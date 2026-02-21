/**
 * Parse front matter from markdown content.
 * Expects YAML-like key: value pairs between --- delimiters.
 */
export function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { metadata: {}, content: markdown }

  const frontMatter = match[1]
  const content = match[2]
  const metadata = {}

  for (const line of frontMatter.split('\n')) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    const key = line.slice(0, colonIndex).trim()
    let value = line.slice(colonIndex + 1).trim()

    // Handle arrays like [tag1, tag2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    }
    // Handle quoted strings
    else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    metadata[key] = value
  }

  return { metadata, content }
}

/**
 * Load all blog markdown files using Vite's import.meta.glob
 */
export async function loadBlogPosts() {
  const modules = import.meta.glob('/src/blogs/*.md', { as: 'raw', eager: true })
  const posts = []

  for (const [path, raw] of Object.entries(modules)) {
    const slug = path.split('/').pop().replace('.md', '')
    const { metadata, content } = parseFrontMatter(raw)
    posts.push({ slug, ...metadata, content })
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}
