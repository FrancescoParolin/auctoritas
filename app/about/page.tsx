import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'La missione editoriale e i principi di Auctoritas.',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: 'var(--color-gold)' }}
          >
            L'Editoriale
          </p>
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Chi Siamo
          </h1>
        </div>

        {/* Mission */}
        <div className="mb-14">
          <div
            className="h-px mb-8"
            style={{ background: `linear-gradient(to right, var(--color-gold), transparent)` }}
          />
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: 'var(--color-ink)' }}
          >
            Auctoritas è una piattaforma editoriale indipendente che copre gli eventi che definiscono il nostro tempo.
            Crediamo nella chiarezza contro il rumore, nella profondità contro il volume, nell'analisi contro la reazione.
          </p>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            La nostra copertura si concentra su eventi in corso — geopolitica, tecnologia, economia, clima
            e le forze strutturali che modellano il funzionamento delle società. Seguiamo le storie nel tempo,
            non solo nel momento dell'impatto iniziale.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            Non siamo affiliati ad alcun partito politico, governo o interesse commerciale.
            La nostra indipendenza editoriale è non negoziabile.
          </p>
        </div>

        {/* Principles */}
        <div className="mb-14">
          <h2
            className="text-xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Principi Editoriali
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'Fonti primarie, sempre',
                body: 'Citiamo documenti originali, dati e dichiarazioni dirette. Non trasmettiamo interpretazioni di seconda mano come fatti.',
              },
              {
                title: 'Distinguere analisi da reportage',
                body: 'Quando affermiamo un fatto, è verificabile. Quando offriamo analisi, lo diciamo. Il lettore merita di conoscere la differenza.',
              },
              {
                title: 'Le correzioni sono permanenti',
                body: 'Gli errori vengono corretti visibilmente, con una nota. Non modifichiamo silenziosamente gli articoli dopo la pubblicazione.',
              },
              {
                title: 'Nessun contenuto ottimizzato algoritmicamente',
                body: 'Non scriviamo per i click. Scriviamo per i lettori che vogliono capire cosa sta davvero accadendo.',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="pl-5 border-l-2"
                style={{ borderColor: 'var(--color-gold)' }}
              >
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div
          id="resources"
          className="pt-10 border-t"
          style={{ borderColor: 'var(--color-rule)' }}
        >
          <h2
            className="text-xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Risorse
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-ink-muted)' }}>
            Riferimenti curati su cui ci basiamo e che consigliamo.
          </p>
          <div className="space-y-3">
            {[
              { label: 'UN Environment Programme — Emissions Gap Report', category: 'Clima' },
              { label: 'V-Dem Institute — Democracy Reports', category: 'Politica' },
              { label: 'IMF World Economic Outlook', category: 'Economia' },
              { label: 'Centre for the Governance of AI', category: 'Tecnologia' },
              { label: 'Freedom House — Freedom in the World', category: 'Politica' },
              { label: 'OCHA — Humanitarian Data Exchange', category: 'Conflitti' },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between py-3 border-b"
                style={{ borderColor: 'var(--color-rule)' }}
              >
                <span className="text-sm" style={{ color: 'var(--color-ink-secondary)' }}>
                  {r.label}
                </span>
                <span
                  className="text-xs tracking-widest uppercase flex-none ml-4"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {r.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div
          className="mt-14 pt-10 border-t"
          style={{ borderColor: 'var(--color-rule)' }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Contatti
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            Corrispondenza editoriale:{' '}
            <a
              href="mailto:editorial@dispatch.press"
              className="transition-colors hover:text-gold"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              editorial@dispatch.press
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
