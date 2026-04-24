import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles, topics } from '@/lib/data'
import CommentThread from '@/components/discuss/CommentThread'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 30

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.summary,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const relatedTopic = topics.find((t) => t.relatedArticleSlug === slug)
  const paragraphs = article.content.split('\n\n').filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 transition-colors"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          ← Tutti gli articoli
        </Link>

        {/* Category + meta */}
        <div className="flex items-center gap-4 mb-5">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            {article.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            {new Date(article.publishedAt).toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            {article.readTime} min di lettura
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
          }}
        >
          {article.title}
        </h1>

        {/* Summary */}
        <p
          className="text-lg leading-relaxed mb-8"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          {article.summary}
        </p>

        {/* Divider */}
        <div
          className="h-px mb-10"
          style={{
            background: `linear-gradient(to right, var(--color-gold), transparent)`,
          }}
        />

        {/* Body */}
        <div className="prose-editorial">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Tags */}
        <div
          className="mt-10 pt-8 border-t flex flex-wrap gap-2"
          style={{ borderColor: 'var(--color-rule)' }}
        >
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 border"
              style={{
                borderColor: 'var(--color-rule)',
                color: 'var(--color-ink-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Inline discussion */}
        {relatedTopic && (
          <div
            className="mt-16 pt-12 border-t"
            style={{ borderColor: 'var(--color-rule)' }}
          >
            <div className="mb-8">
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--color-gold)' }}
              >
                Discussione
              </p>
              <h2
                className="text-2xl font-bold leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                {relatedTopic.title}
              </h2>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                {relatedTopic.description}
              </p>
            </div>
            <CommentThread topicId={relatedTopic.id} />
          </div>
        )}
      </div>
    </div>
  )
}
