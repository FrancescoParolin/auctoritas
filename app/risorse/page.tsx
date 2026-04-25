import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Link Utili',
  description: 'Selezione curata di fonti primarie, istituzioni di ricerca e pubblicazioni di riferimento.',
}

type ResourceLink = {
  title: string
  description: string
  url: string
  tag: string
}

type Section = {
  section: string
  icon: 'compass' | 'coins' | 'leaf' | 'columns' | 'cpu'
  links: ResourceLink[]
}

const resources: Section[] = [
  {
    section: 'Geopolitica & Sicurezza',
    icon: 'compass',
    links: [
      { title: 'SIPRI', description: 'Dati su conflitti, spese militari e disarmo.', url: 'https://sipri.org', tag: 'Ricerca' },
      { title: 'Crisis Group', description: 'Analisi e rapporti sui conflitti in corso nel mondo.', url: 'https://crisisgroup.org', tag: 'Analisi' },
      { title: 'Foreign Affairs', description: 'Rivista di riferimento su politica estera e relazioni internazionali.', url: 'https://foreignaffairs.com', tag: 'Rivista' },
      { title: 'Council on Foreign Relations', description: 'Think tank americano su politica estera globale.', url: 'https://cfr.org', tag: 'Think Tank' },
    ],
  },
  {
    section: 'Economia & Finanza',
    icon: 'coins',
    links: [
      { title: 'IMF World Economic Outlook', description: 'Rapporto semestrale sulle prospettive economiche globali.', url: 'https://imf.org/en/Publications/WEO', tag: 'Dati' },
      { title: 'OECD Data', description: 'Database statistici su economia, commercio e benessere.', url: 'https://data.oecd.org', tag: 'Dati' },
      { title: 'BIS Working Papers', description: 'Ricerca della Banca dei Regolamenti Internazionali.', url: 'https://bis.org/research', tag: 'Ricerca' },
    ],
  },
  {
    section: 'Clima & Energia',
    icon: 'leaf',
    links: [
      { title: 'UNEP Emissions Gap Report', description: 'Il rapporto annuale sul gap tra impegni e riduzioni reali.', url: 'https://unep.org/resources/emissions-gap-report', tag: 'Rapporto' },
      { title: 'IEA — World Energy Outlook', description: "Prospettive energetiche globali dell'Agenzia Internazionale dell'Energia.", url: 'https://iea.org/reports/world-energy-outlook-2024', tag: 'Rapporto' },
      { title: 'Global Carbon Project', description: 'Dati aggiornati sulle emissioni globali di CO₂.', url: 'https://globalcarbonproject.org', tag: 'Dati' },
    ],
  },
  {
    section: 'Democrazia & Governance',
    icon: 'columns',
    links: [
      { title: 'V-Dem Institute', description: 'Il più ampio dataset accademico sulla qualità democratica.', url: 'https://v-dem.net', tag: 'Dati' },
      { title: 'Freedom House', description: 'Valutazione annuale delle libertà civili e politiche nel mondo.', url: 'https://freedomhouse.org', tag: 'Indice' },
      { title: 'EIU Democracy Index', description: "Indice annuale della democrazia globale dell'Economist Intelligence Unit.", url: 'https://eiu.com/n/campaigns/democracy-index', tag: 'Indice' },
    ],
  },
  {
    section: 'Tecnologia & AI',
    icon: 'cpu',
    links: [
      { title: 'Centre for the Governance of AI', description: "Ricerca indipendente sulla governance dell'intelligenza artificiale.", url: 'https://governance.ai', tag: 'Ricerca' },
      { title: 'MIT Technology Review', description: 'Giornalismo tecnologico di riferimento del MIT.', url: 'https://technologyreview.com', tag: 'Rivista' },
      { title: 'AI Safety Institute (AISI)', description: 'Istituto UK per la valutazione della sicurezza dei modelli AI.', url: 'https://gov.uk/government/organisations/ai-safety-institute', tag: 'Istituzione' },
    ],
  },
]

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

function SectionIcon({ name }: { name: Section['icon'] }) {
  const props = {
    width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'compass':
      return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>)
    case 'coins':
      return (<svg {...props}><ellipse cx="9" cy="7" rx="6" ry="2.5"/><path d="M3 7v6c0 1.4 2.7 2.5 6 2.5"/><path d="M3 11c0 1.4 2.7 2.5 6 2.5"/><ellipse cx="15" cy="14" rx="6" ry="2.5"/><path d="M9 14v3c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-3"/></svg>)
    case 'leaf':
      return (<svg {...props}><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>)
    case 'columns':
      return (<svg {...props}><path d="M4 21V8M20 21V8M12 21V8M2 21h20M3 8l9-5 9 5"/></svg>)
    case 'cpu':
      return (<svg {...props}><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>)
  }
}

function domainOf(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url }
}

export default function RisorsePage() {
  const totalLinks = resources.reduce((sum, s) => sum + s.links.length, 0)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="label-smallcaps mb-4" style={{ color: 'var(--color-gold)' }}>
          Fonti & Risorse
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold mb-5 leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}
        >
          Link Utili
        </h1>
        <p
          className="text-lg leading-relaxed"
          style={{ color: 'var(--color-ink-secondary)', maxWidth: '38rem' }}
        >
          Selezione curata di fonti primarie, istituzioni di ricerca e pubblicazioni di riferimento per approfondire i temi trattati da Auctoritas.
        </p>
        <div className="mt-6 flex items-center gap-4 text-xs" style={{ color: 'var(--color-ink-muted)' }}>
          <span className="label-smallcaps" style={{ color: 'var(--color-ink-muted)' }}>
            {totalLinks} fonti
          </span>
          <span style={{ color: 'var(--color-rule)' }}>·</span>
          <span className="label-smallcaps" style={{ color: 'var(--color-ink-muted)' }}>
            {resources.length} categorie
          </span>
          <span style={{ color: 'var(--color-rule)' }}>·</span>
          <span className="label-smallcaps" style={{ color: 'var(--color-gold)' }}>
            Aggiornate
          </span>
        </div>
      </div>

      {/* Ornament rule */}
      <div className="ornament-rule mb-16">
        <span style={{ fontSize: '0.85rem', letterSpacing: '0.4em' }}>◆</span>
      </div>

      {/* Sections */}
      <div className="space-y-20">
        {resources.map((section, sIdx) => (
          <section key={section.section}>
            {/* Section header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span
                  className="flex-none flex items-center justify-center w-11 h-11 rounded-full"
                  style={{
                    border: '1px solid var(--color-rule)',
                    color: 'var(--color-gold-dark)',
                    backgroundColor: 'rgba(252, 248, 238, 0.7)',
                    boxShadow: 'var(--shadow-warm-sm)',
                  }}
                >
                  <SectionIcon name={section.icon} />
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className="block label-smallcaps"
                    style={{ color: 'var(--color-gold)', opacity: 0.85 }}
                  >
                    Sezione {ROMAN[sIdx]} · {section.links.length} fonti
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-bold leading-tight mt-1"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {section.section}
                  </h2>
                </div>
              </div>
              <div
                className="h-px mt-4"
                style={{
                  background: 'linear-gradient(to right, var(--color-rule-strong), var(--color-rule), transparent)',
                }}
              />
            </div>

            {/* Grid 2 colonne */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.links.map((link) => {
                const domain = domainOf(link.url)
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card group flex items-start gap-4 p-5"
                  >
                    {/* Favicon */}
                    <span
                      className="flex-none flex items-center justify-center w-10 h-10 rounded overflow-hidden"
                      style={{
                        backgroundColor: 'var(--color-paper)',
                        border: '1px solid var(--color-rule)',
                      }}
                    >
                      {/* Google s2 favicon — no key needed, decent quality */}
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                        alt=""
                        width={20}
                        height={20}
                        style={{ width: 20, height: 20, objectFit: 'contain' }}
                      />
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h3
                          className="text-base font-bold leading-snug flex-1 min-w-0"
                          style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--color-ink)',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {link.title}
                        </h3>
                        <span
                          className="resource-arrow flex-none mt-0.5"
                          style={{ color: 'var(--color-gold)', opacity: 0.55 }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </span>
                      </div>
                      <p
                        className="text-xs mb-2 truncate"
                        style={{
                          color: 'var(--color-ink-muted)',
                          fontFamily: 'var(--font-body)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {domain}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-ink-secondary)', lineHeight: '1.6' }}
                      >
                        {link.description}
                      </p>
                      <div className="mt-3">
                        <span
                          className="text-[10px] px-2 py-0.5"
                          style={{
                            border: '1px solid var(--color-rule)',
                            color: 'var(--color-ink-muted)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            borderRadius: '2px',
                          }}
                        >
                          {link.tag}
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-24 pt-10" style={{ borderTop: '1px solid var(--color-rule)' }}>
        <p
          className="text-sm italic text-center"
          style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
        >
          Hai una fonte da segnalare? Scrivi a{' '}
          <a
            href="mailto:redazione@auctoritas.it"
            style={{ color: 'var(--color-gold)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            redazione@auctoritas.it
          </a>
        </p>
      </div>
    </div>
  )
}
