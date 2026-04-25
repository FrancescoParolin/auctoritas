import Link from 'next/link'
import type { Article } from '@/lib/types'

interface Props {
  article: Article
  variant?: 'default' | 'compact'
  index?: number
  total?: number
}

export default function ArticleCard({ article, variant = 'default', index, total }: Props) {
  const isCompact = variant === 'compact'

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article
        className="article-row py-8 px-3 -mx-3"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <div className="flex gap-6">
          {/* Index numerato (solo se passato) */}
          {index !== undefined && (
            <div className="flex-none hidden md:flex flex-col items-end pt-1" style={{ minWidth: '64px' }}>
              <span className="article-index text-2xl font-bold leading-none">
                {String(index).padStart(2, '0')}
              </span>
              {total && (
                <span
                  className="mt-1 text-[10px] tracking-widest"
                  style={{ color: 'var(--color-ink-muted)', opacity: 0.6 }}
                >
                  /{String(total).padStart(2, '0')}
                </span>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Categoria + meta */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-gold)', flexShrink: 0 }}
                />
                <span className="label-smallcaps" style={{ color: 'var(--color-gold)' }}>
                  {article.category}
                </span>
              </span>

              <span style={{ color: 'var(--color-rule)' }}>·</span>

              <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                {new Date(article.publishedAt).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>

              <span style={{ color: 'var(--color-rule)' }}>·</span>

              <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                {article.readTime} min
              </span>
            </div>

            {/* Titolo con underline dorato */}
            <h2
              className={`article-title font-bold leading-tight ${isCompact ? 'text-lg' : 'text-2xl md:text-3xl'}`}
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.015em',
              }}
            >
              {article.title}
            </h2>

            {/* Summary */}
            {!isCompact && (
              <p
                className="mt-3 text-sm leading-relaxed line-clamp-2"
                style={{ color: 'var(--color-ink-muted)', lineHeight: '1.75' }}
              >
                {article.summary}
              </p>
            )}

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1"
                  style={{
                    border: '1px solid var(--color-rule)',
                    color: 'var(--color-ink-muted)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                    borderRadius: '2px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
