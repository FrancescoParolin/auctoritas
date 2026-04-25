import Link from 'next/link'
import { getAllArticles } from '@/lib/data'

type IconName = 'archive' | 'bookmark' | 'columns'

interface Block {
  number: string
  title: string
  description: string
  cta: string
  href: string
  count: string
  meta?: string
  icon: IconName
}

function BlockIcon({ name }: { name: IconName }) {
  const props = {
    width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.4,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'archive':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="4" rx="0.5" />
          <path d="M5 8v11a1 1 0 001 1h12a1 1 0 001-1V8" />
          <path d="M10 12h4" />
        </svg>
      )
    case 'bookmark':
      return (
        <svg {...props}>
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          <path d="M9 8h6" />
        </svg>
      )
    case 'columns':
      return (
        <svg {...props}>
          <path d="M4 21V8M20 21V8M12 21V8M2 21h20M3 8l9-5 9 5" />
        </svg>
      )
  }
}

export default async function NavBlocks() {
  const articles = await getAllArticles()
  const latest = articles[0]
  const totalArticles = articles.length

  const blocks: Block[] = [
    {
      number: '01',
      icon: 'archive',
      title: 'Articoli',
      description: 'Archivio editoriale completo. Analisi approfondita e copertura degli eventi in corso.',
      cta: "Sfoglia l'archivio",
      href: '/articles',
      count: `${totalArticles} pezzi`,
      meta: latest ? `Ultimo: «${latest.title}»` : undefined,
    },
    {
      number: '02',
      icon: 'bookmark',
      title: 'Link Utili',
      description: 'Riferimenti curati, fonti primarie e risorse selezionate per approfondire ogni tema.',
      cta: 'Esplora le risorse',
      href: '/risorse',
      count: '16 fonti',
      meta: '5 categorie · Aggiornate',
    },
    {
      number: '03',
      icon: 'columns',
      title: 'Chi Siamo',
      description: 'La missione editoriale, i principi e le persone dietro Auctoritas.',
      cta: 'Scopri di più',
      href: '/about',
      count: 'Manifesto',
      meta: 'Indipendente · Non partigiano',
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="label-smallcaps mb-3" style={{ color: 'var(--color-gold)' }}>
              Esplora
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em',
              }}
            >
              Le tre vie
            </h2>
            <p
              className="mt-3 text-sm max-w-md"
              style={{ color: 'var(--color-ink-muted)', lineHeight: '1.7' }}
            >
              Tre porte d&apos;ingresso per attraversare Auctoritas.
            </p>
          </div>
        </div>

        {/* Gradient rule */}
        <div
          className="h-px mb-10"
          style={{
            background: 'linear-gradient(to right, var(--color-rule-strong), var(--color-rule), transparent)',
          }}
        />

        {/* Three blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blocks.map((block) => (
            <Link
              key={block.number}
              href={block.href}
              className="nav-block block relative overflow-hidden"
              style={{ borderRadius: '3px' }}
            >
              <div className="relative flex flex-col h-full p-8 md:p-9" style={{ minHeight: '320px' }}>
                {/* Watermark numeral */}
                <span
                  aria-hidden
                  className="absolute select-none pointer-events-none"
                  style={{
                    right: '0.6rem',
                    bottom: '-2.5rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '11rem',
                    lineHeight: 1,
                    color: 'var(--nb-accent, var(--color-gold))',
                    opacity: 0.07,
                    letterSpacing: '-0.05em',
                    transition: 'opacity 0.32s ease, color 0.32s ease',
                  }}
                >
                  {block.number}
                </span>

                {/* Top: icon + index label */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                    style={{
                      border: '1px solid var(--nb-accent, var(--color-rule))',
                      color: 'var(--nb-accent, var(--color-gold-dark))',
                      backgroundColor: 'rgba(252, 248, 238, 0.5)',
                      transition: 'all 0.32s ease',
                    }}
                  >
                    <BlockIcon name={block.icon} />
                  </span>
                  <span
                    className="label-smallcaps"
                    style={{
                      color: 'var(--nb-accent, var(--color-gold))',
                      opacity: 0.7,
                      transition: 'color 0.32s ease, opacity 0.32s ease',
                    }}
                  >
                    {block.number} / 03
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-3xl md:text-4xl font-bold leading-tight relative z-10"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--nb-text, var(--color-ink))',
                    letterSpacing: '-0.015em',
                    transition: 'color 0.32s ease',
                  }}
                >
                  {block.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-4 text-sm leading-relaxed flex-1 relative z-10"
                  style={{
                    color: 'var(--nb-muted, var(--color-ink-muted))',
                    transition: 'color 0.32s ease',
                    lineHeight: '1.7',
                  }}
                >
                  {block.description}
                </p>

                {/* Meta line */}
                {block.meta && (
                  <p
                    className="mt-4 text-xs italic relative z-10 line-clamp-1"
                    style={{
                      color: 'var(--nb-muted, var(--color-ink-muted))',
                      fontFamily: 'var(--font-display)',
                      opacity: 0.85,
                      transition: 'color 0.32s ease, opacity 0.32s ease',
                    }}
                  >
                    {block.meta}
                  </p>
                )}

                {/* Divider */}
                <div
                  className="h-px mt-6 mb-5 relative z-10"
                  style={{
                    background: 'var(--nb-accent, var(--color-rule))',
                    opacity: 0.35,
                    transition: 'background 0.32s ease',
                  }}
                />

                {/* Bottom: CTA + count */}
                <div className="flex items-center justify-between relative z-10">
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{
                      color: 'var(--nb-text, var(--color-ink))',
                      letterSpacing: '0.02em',
                      transition: 'color 0.32s ease',
                    }}
                  >
                    {block.cta}
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
                      className="nav-block-arrow"
                      style={{ transition: 'transform 0.32s cubic-bezier(0.2,0.7,0.2,1)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span
                    className="label-smallcaps"
                    style={{
                      color: 'var(--nb-accent, var(--color-gold))',
                      transition: 'color 0.32s ease',
                    }}
                  >
                    {block.count}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
