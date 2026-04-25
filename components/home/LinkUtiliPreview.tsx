import Link from 'next/link'

// Tutte le fonti citate in /risorse — wall di favicon
const sources = [
  { name: 'SIPRI', url: 'https://sipri.org' },
  { name: 'Crisis Group', url: 'https://crisisgroup.org' },
  { name: 'Foreign Affairs', url: 'https://foreignaffairs.com' },
  { name: 'CFR', url: 'https://cfr.org' },
  { name: 'IMF', url: 'https://imf.org' },
  { name: 'OECD', url: 'https://oecd.org' },
  { name: 'BIS', url: 'https://bis.org' },
  { name: 'UNEP', url: 'https://unep.org' },
  { name: 'IEA', url: 'https://iea.org' },
  { name: 'Global Carbon Project', url: 'https://globalcarbonproject.org' },
  { name: 'V-Dem', url: 'https://v-dem.net' },
  { name: 'Freedom House', url: 'https://freedomhouse.org' },
  { name: 'EIU', url: 'https://eiu.com' },
  { name: 'GovAI', url: 'https://governance.ai' },
  { name: 'MIT Tech Review', url: 'https://technologyreview.com' },
  { name: 'AISI', url: 'https://gov.uk' },
]

function domainOf(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url }
}

export default function LinkUtiliPreview() {
  return (
    <section
      className="py-20"
      style={{ borderTop: '1px solid var(--color-rule)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="label-smallcaps mb-3" style={{ color: 'var(--color-gold)' }}>
            Le voci che ascoltiamo
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Le nostre fonti
          </h2>
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Non scriviamo dal nulla. Leggiamo, verifichiamo, citiamo. Queste sono le istituzioni di ricerca, gli osservatori e le pubblicazioni su cui costruiamo le nostre analisi.
          </p>
        </div>

        {/* Ornament rule */}
        <div className="ornament-rule mb-12">
          <span style={{ fontSize: '0.85rem', letterSpacing: '0.4em' }}>◆</span>
        </div>

        {/* Sources wall */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-px"
          style={{ backgroundColor: 'var(--color-rule)' }}
        >
          {sources.map((src) => {
            const domain = domainOf(src.url)
            return (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-tile group flex flex-col items-center justify-center gap-3 px-3 py-6"
                title={src.name}
              >
                <span
                  className="flex items-center justify-center w-12 h-12 rounded overflow-hidden source-favicon"
                  style={{
                    backgroundColor: 'var(--color-paper)',
                    border: '1px solid var(--color-rule)',
                    transition: 'all 0.28s ease',
                  }}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                    alt=""
                    width={26}
                    height={26}
                    style={{ width: 26, height: 26, objectFit: 'contain' }}
                  />
                </span>
                <span
                  className="text-[10px] tracking-widest uppercase text-center leading-tight source-label"
                  style={{
                    color: 'var(--color-ink-muted)',
                    letterSpacing: '0.12em',
                    transition: 'color 0.28s ease',
                  }}
                >
                  {src.name}
                </span>
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/risorse"
            className="inline-flex items-center gap-2 group label-smallcaps"
            style={{
              color: 'var(--color-ink-secondary)',
              borderBottom: '1px solid var(--color-rule-strong)',
              paddingBottom: '4px',
            }}
          >
            Vedi tutte le fonti con descrizione
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.28s ease' }} className="group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
