export const metadata = { title: 'Link Utili' }

const resources = [
  {
    section: 'Geopolitica & Sicurezza',
    links: [
      { title: 'SIPRI', description: 'Dati su conflitti, spese militari e disarmo', url: 'https://sipri.org', tag: 'Ricerca' },
      { title: 'Crisis Group', description: 'Analisi e rapporti sui conflitti in corso nel mondo', url: 'https://crisisgroup.org', tag: 'Analisi' },
      { title: 'Foreign Affairs', description: 'Rivista di riferimento su politica estera e relazioni internazionali', url: 'https://foreignaffairs.com', tag: 'Rivista' },
      { title: 'Council on Foreign Relations', description: 'Think tank americano su politica estera globale', url: 'https://cfr.org', tag: 'Think Tank' },
    ],
  },
  {
    section: 'Economia & Finanza',
    links: [
      { title: 'IMF World Economic Outlook', description: 'Rapporto semestrale sulle prospettive economiche globali', url: 'https://imf.org/en/Publications/WEO', tag: 'Dati' },
      { title: 'OECD Data', description: 'Database statistici su economia, commercio e benessere', url: 'https://data.oecd.org', tag: 'Dati' },
      { title: 'BIS Working Papers', description: 'Ricerca della Banca dei Regolamenti Internazionali', url: 'https://bis.org/research', tag: 'Ricerca' },
    ],
  },
  {
    section: 'Clima & Energia',
    links: [
      { title: 'UNEP Emissions Gap Report', description: 'Il rapporto annuale sul gap tra impegni e riduzioni reali', url: 'https://unep.org/resources/emissions-gap-report', tag: 'Rapporto' },
      { title: 'IEA — World Energy Outlook', description: 'Prospettive energetiche globali dell\'Agenzia Internazionale dell\'Energia', url: 'https://iea.org/reports/world-energy-outlook-2024', tag: 'Rapporto' },
      { title: 'Global Carbon Project', description: 'Dati aggiornati sulle emissioni globali di CO₂', url: 'https://globalcarbonproject.org', tag: 'Dati' },
    ],
  },
  {
    section: 'Democrazia & Governance',
    links: [
      { title: 'V-Dem Institute', description: 'Il più ampio dataset accademico sulla qualità democratica', url: 'https://v-dem.net', tag: 'Dati' },
      { title: 'Freedom House', description: 'Valutazione annuale delle libertà civili e politiche nel mondo', url: 'https://freedomhouse.org', tag: 'Indice' },
      { title: 'EIU Democracy Index', description: 'Indice annuale della democrazia globale dell\'Economist Intelligence Unit', url: 'https://eiu.com/n/campaigns/democracy-index', tag: 'Indice' },
    ],
  },
  {
    section: 'Tecnologia & AI',
    links: [
      { title: 'Centre for the Governance of AI', description: 'Ricerca indipendente sulla governance dell\'intelligenza artificiale', url: 'https://governance.ai', tag: 'Ricerca' },
      { title: 'MIT Technology Review', description: 'Giornalismo tecnologico di riferimento del MIT', url: 'https://technologyreview.com', tag: 'Rivista' },
      { title: 'AI Safety Institute (AISI)', description: 'Istituto UK per la valutazione della sicurezza dei modelli AI avanzati', url: 'https://gov.uk/government/organisations/ai-safety-institute', tag: 'Istituzione' },
    ],
  },
]

export default function RisorsePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: 'var(--color-gold)', letterSpacing: '0.18em' }}
        >
          Fonti &amp; Risorse
        </p>
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
        >
          Link Utili
        </h1>
        <p className="text-base" style={{ color: 'var(--color-ink-muted)', lineHeight: '1.75', maxWidth: '36rem' }}>
          Una selezione curata di fonti primarie, istituzioni di ricerca e pubblicazioni di riferimento per approfondire i temi trattati da Auctoritas.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-14">
        {resources.map((section) => (
          <div key={section.section}>
            <h2
              className="text-xs tracking-widest uppercase mb-6 pb-3"
              style={{
                color: 'var(--color-gold)',
                letterSpacing: '0.18em',
                borderBottom: '1px solid var(--color-rule)',
              }}
            >
              {section.section}
            </h2>
            <div className="space-y-0">
              {section.links.map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between py-5 group"
                  style={{ borderBottom: i < section.links.length - 1 ? '1px solid var(--color-rule)' : undefined }}
                >
                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3
                        className="text-base font-bold group-hover:text-gold transition-colors"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                      >
                        {link.title}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5"
                        style={{
                          border: '1px solid var(--color-rule)',
                          color: 'var(--color-ink-muted)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {link.tag}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: '1.6' }}>
                      {link.description}
                    </p>
                  </div>
                  <span
                    className="flex-none text-lg mt-0.5 transition-colors group-hover:text-gold"
                    style={{ color: 'var(--color-rule)' }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
