import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTopicById, topics, getArticleBySlug } from '@/lib/data'
import CommentThread from '@/components/discuss/CommentThread'

interface Props {
  params: Promise<{ topicId: string }>
}

export async function generateStaticParams() {
  return topics.map((t) => ({ topicId: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params
  const topic = getTopicById(topicId)
  if (!topic) return {}
  return {
    title: topic.title,
    description: topic.description,
  }
}

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params
  const topic = getTopicById(topicId)
  if (!topic) notFound()

  const relatedArticle = topic.relatedArticleSlug
    ? getArticleBySlug(topic.relatedArticleSlug)
    : undefined

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/discuss"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 transition-colors"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          ← Tutte le discussioni
        </Link>

        {/* Topic header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            {topic.isActive && (
              <span
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
                Thread attivo
              </span>
            )}
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 border"
                style={{ borderColor: 'var(--color-rule)', color: 'var(--color-ink-muted)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            {topic.title}
          </h1>

          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            {topic.description}
          </p>

          <p
            className="mt-3 text-xs"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Aperto il{' '}
            {new Date(topic.createdAt).toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}{' '}
            · {topic.commentCount} commenti
          </p>
        </div>

        {/* Related article */}
        {relatedArticle && (
          <div
            className="my-8 p-5"
            style={{
              backgroundColor: 'var(--color-paper-dark)',
              border: '1px solid var(--color-rule)',
            }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-2"
              style={{ color: 'var(--color-gold)' }}
            >
              Articolo Correlato
            </p>
            <Link href={`/articles/${relatedArticle.slug}`}>
              <h3
                className="text-sm font-semibold hover:text-gold transition-colors"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                {relatedArticle.title}
              </h3>
            </Link>
            <p
              className="mt-1 text-xs"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {new Date(relatedArticle.publishedAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        )}

        {/* Divider */}
        <div
          className="h-px my-10"
          style={{
            background: `linear-gradient(to right, var(--color-gold), transparent)`,
          }}
        />

        {/* Thread */}
        <CommentThread topicId={topicId} />
      </div>
    </div>
  )
}
