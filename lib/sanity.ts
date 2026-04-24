import { createClient } from 'next-sanity'
import type { Article } from './types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Converte Portable Text in stringa con paragrafi separati da \n\n
function portableTextToString(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c: any) => c.text || '').join(''))
    .join('\n\n')
}

const ARTICLE_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  title,
  summary,
  content,
  category,
  publishedAt,
  author,
  tags,
  featured,
  readTime
}`

export async function fetchArticlesFromSanity(): Promise<Article[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const raw = await client.fetch(`
      *[_type == "article"] | order(publishedAt desc) ${ARTICLE_PROJECTION}
    `)
    return raw.map((a: any) => ({
      ...a,
      content: portableTextToString(a.content),
      tags: a.tags || [],
      readTime: a.readTime || 5,
      author: a.author || 'Redazione',
    }))
  } catch (e) {
    console.error('Sanity fetch error:', e)
    return []
  }
}

