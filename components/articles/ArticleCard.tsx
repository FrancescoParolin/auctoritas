import Link from 'next/link'
import type { Article } from '@/lib/types'

interface Props {
  article: Article
  variant?: 'default' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const isCompact = variant === 'compact'

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article
        className="py-8 transition-colors"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        {/* Categoria + meta */}
        <div className="flex items-center gap-3 mb-3">
          {/* Pallino oro + categoria */}
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ backgroundColor: 'var(--color-gold)', flexShrink: 0 }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)', letterSpacing: '0.13em' }}
            >
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

        {/* Titolo con underline dorato animato */}
        <h2
          className={`article-title font-bold leading-tight ${isCompact ? 'text-lg' : 'text-xl md:text-2xl'}`}
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.01em',
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
              className="text-xs px-2.5 py-1"
              style={{
                border: '1px solid var(--color-rule)',
                color: 'var(--color-ink-muted)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}
