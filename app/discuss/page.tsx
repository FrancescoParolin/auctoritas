import type { Metadata } from 'next'
import TopicCard from '@/components/discuss/TopicCard'
import { topics } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Discussioni',
  description: 'Dibattito mirato sugli eventi che contano. Nessun account richiesto.',
}

export default function DiscussPage() {
  const sorted = [...topics].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-3xl">
        {/* Page header */}
        <div className="mb-12">
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: 'var(--color-gold)' }}
          >
            Forum Aperto
          </p>
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Discussioni
          </h1>
          <p
            className="mt-3 text-sm leading-relaxed max-w-lg"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            I topic sono aperti dalla redazione in risposta a eventi reali.
            Nessun account richiesto — inserisci un nickname e contribuisci direttamente.
          </p>
        </div>

        {/* Rules note */}
        <div
          className="mb-10 p-5 text-sm"
          style={{
            backgroundColor: 'var(--color-paper-dark)',
            border: '1px solid var(--color-rule)',
          }}
        >
          <p style={{ color: 'var(--color-ink-secondary)' }}>
            <strong>Sii sostanziale.</strong> Confrontati con il tema, non con gli altri partecipanti.
            Niente link, niente attacchi personali, niente fuori tema.
            I commenti vengono moderati ma non modificati.
          </p>
        </div>

        {/* Topic list */}
        <div>
          {sorted.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </div>
  )
}
