import Link from 'next/link'
import { topics } from '@/lib/data'

export default function DiscussPreview() {
  const active = topics.filter((t) => t.isActive).slice(0, 3)

  return (
    <section
      className="py-16"
      style={{
        borderTop: '1px solid var(--color-rule)',
        backgroundColor: 'var(--color-paper-dark)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header sezione */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-gold)', letterSpacing: '0.18em' }}
            >
              Dibattito Aperto
            </p>
            <h2
              className="text-3xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.01em',
              }}
            >
              Thread Attivi
            </h2>
          </div>
          <Link
            href="/discuss"
            className="text-xs tracking-widest uppercase transition-colors hover:text-gold"
            style={{ color: 'var(--color-ink-muted)', letterSpacing: '0.12em' }}
          >
            Tutti →
          </Link>
        </div>

        {/* Lista thread */}
        <div>
          {active.map((topic, i) => (
            <Link
              key={topic.id}
              href={`/discuss/${topic.id}`}
              className="flex items-start justify-between py-7 group"
              style={{
                borderTop: i > 0 ? '1px solid var(--color-rule)' : undefined,
              }}
            >
              <div className="flex-1 pr-8">
                {/* Tags */}
                <div className="flex items-center gap-2 mb-2">
                  {topic.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5"
                      style={{
                        color: 'var(--color-gold)',
                        border: '1px solid var(--color-gold)',
                        opacity: 0.75,
                        letterSpacing: '0.1em',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="text-lg font-bold leading-snug"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-ink)',
                    transition: 'color 0.2s ease',
                    letterSpacing: '-0.01em',
                  }}
                >
                  <span className="group-hover:text-gold transition-colors">
                    {topic.title}
                  </span>
                </h3>
                <p
                  className="mt-1.5 text-sm line-clamp-1"
                  style={{ color: 'var(--color-ink-muted)', lineHeight: '1.6' }}
                >
                  {topic.description}
                </p>
              </div>

              {/* Contatore */}
              <div
                className="flex-none text-right pl-4 pt-1"
                style={{ minWidth: '3.5rem' }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  {topic.commentCount}
                </span>
                <p
                  className="text-xs mt-0.5 tracking-wide uppercase"
                  style={{ color: 'var(--color-ink-muted)', fontSize: '0.6rem', letterSpacing: '0.1em' }}
                >
                  comm.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
