import Link from 'next/link'

interface Block {
  number: string
  title: string
  description: string
  cta: string
  href: string
  count?: string
}

const blocks: Block[] = [
  {
    number: '01',
    title: 'ARTICOLI',
    description: 'Archivio editoriale completo. Analisi approfondita e copertura degli eventi in corso.',
    cta: "Sfoglia l'archivio",
    href: '/articles',
    count: '8 pezzi',
  },
  {
    number: '02',
    title: 'LINK UTILI',
    description: 'Riferimenti curati, fonti primarie e risorse selezionate per approfondire ogni tema.',
    cta: 'Esplora le risorse',
    href: '/risorse',
    count: 'Aggiornati',
  },
  {
    number: '03',
    title: 'CHI SIAMO',
    description: 'La missione editoriale, i principi e le persone dietro Auctoritas.',
    cta: 'Scopri di più',
    href: '/about',
  },
]

export default function NavBlocks() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ backgroundColor: 'var(--color-rule)' }}
        >
          {blocks.map((block) => (
            <Link
              key={block.number}
              href={block.href}
              className="nav-block block p-10 md:p-12"
            >
              <div className="flex flex-col h-full min-h-52">
                <span
                  className="text-xs tracking-widest font-mono"
                  style={{ color: 'var(--nb-accent, var(--color-gold))', transition: 'color 0.28s ease' }}
                >
                  {block.number}
                </span>

                <h2
                  className="mt-5 text-3xl md:text-4xl font-bold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--nb-text, var(--color-ink))',
                    letterSpacing: '0.01em',
                    transition: 'color 0.28s ease',
                  }}
                >
                  {block.title}
                </h2>

                <p
                  className="mt-4 text-sm leading-relaxed flex-1"
                  style={{
                    color: 'var(--nb-muted, var(--color-ink-muted))',
                    transition: 'color 0.28s ease',
                  }}
                >
                  {block.description}
                </p>

                <div className="mt-7 flex items-center justify-between">
                  <span
                    className="text-xs tracking-wide"
                    style={{
                      color: 'var(--nb-text, var(--color-ink-secondary))',
                      transition: 'color 0.28s ease',
                    }}
                  >
                    {block.cta} →
                  </span>
                  {block.count && (
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{
                        color: 'var(--nb-muted, var(--color-ink-muted))',
                        transition: 'color 0.28s ease',
                      }}
                    >
                      {block.count}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
