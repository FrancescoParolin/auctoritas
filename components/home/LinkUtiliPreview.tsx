import Link from 'next/link'

const featuredLinks = [
  {
    category: 'GEOPOLITICA',
    title: 'SIPRI — Stockholm International Peace Research Institute',
    description: 'Dati e analisi su conflitti armati, spese militari e controllo degli armamenti.',
    url: 'https://sipri.org',
    tag: 'Ricerca',
  },
  {
    category: 'ECONOMIA',
    title: 'IMF World Economic Outlook',
    description: 'Rapporto semestrale del Fondo Monetario Internazionale sulle prospettive economiche globali.',
    url: 'https://imf.org/en/Publications/WEO',
    tag: 'Dati',
  },
  {
    category: 'CLIMA',
    title: 'UNEP Emissions Gap Report',
    description: 'Il rapporto annuale sul divario tra impegni climatici e riduzione effettiva delle emissioni.',
    url: 'https://unep.org/resources/emissions-gap-report',
    tag: 'Rapporto',
  },
]

export default function LinkUtiliPreview() {
  return (
    <section
      className="py-16"
      style={{
        borderTop: '1px solid var(--color-rule)',
        backgroundColor: 'var(--color-paper-dark)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-gold)', letterSpacing: '0.18em' }}
            >
              Fonti &amp; Risorse
            </p>
            <h2
              className="text-3xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.01em',
              }}
            >
              Link Utili
            </h2>
          </div>
          <Link
            href="/risorse"
            className="text-xs tracking-widest uppercase transition-colors hover:text-gold"
            style={{ color: 'var(--color-ink-muted)', letterSpacing: '0.12em' }}
          >
            Tutti →
          </Link>
        </div>

        <div>
          {featuredLinks.map((link, i) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between py-7 group"
              style={{ borderTop: i > 0 ? '1px solid var(--color-rule)' : undefined }}
            >
              <div className="flex-1 pr-8">
                <div className="flex items-center gap-2 mb-2">
                  <span
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
                    {link.category}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5"
                    style={{
                      color: 'var(--color-ink-muted)',
                      border: '1px solid var(--color-rule)',
                      letterSpacing: '0.08em',
                      fontSize: '0.65rem',
                    }}
                  >
                    {link.tag}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold leading-snug group-hover:text-gold transition-colors"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {link.title}
                </h3>
                <p
                  className="mt-1.5 text-sm line-clamp-1"
                  style={{ color: 'var(--color-ink-muted)', lineHeight: '1.6' }}
                >
                  {link.description}
                </p>
              </div>
              <div className="flex-none text-right pl-4 pt-1">
                <span
                  className="text-xl"
                  style={{ color: 'var(--color-gold)', opacity: 0.6 }}
                >
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
