import Link from 'next/link'
import type { Topic } from '@/lib/types'

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link href={`/discuss/${topic.id}`} className="group block">
      <article className="py-7" style={{ borderBottom: '1px solid var(--color-rule)' }}>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            {/* Tags + status */}
            <div className="flex items-center gap-3 mb-3">
              {topic.isActive && (
                <span
                  className="flex items-center gap-1.5 text-xs tracking-widest uppercase"
                  style={{ color: 'var(--color-gold)' }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  />
                  Attivo
                </span>
              )}
              {topic.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 border"
                  style={{
                    borderColor: 'var(--color-rule)',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2
              className="text-xl font-bold leading-snug group-hover:text-gold transition-colors"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.01em',
              }}
            >
              {topic.title}
            </h2>

            <p
              className="mt-2 text-sm leading-relaxed line-clamp-2"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {topic.description}
            </p>

            <p
              className="mt-3 text-xs"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {new Date(topic.createdAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Comment count */}
          <div className="flex-none text-right pt-1">
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              {topic.commentCount}
            </span>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
              commenti
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
