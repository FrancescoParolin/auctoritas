'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/articles', label: 'Articoli' },
  { href: '/risorse', label: 'Link Utili' },
  { href: '/about', label: 'Chi Siamo' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  if (pathname?.startsWith('/studio')) return null

  return (
    <header>
      {/* Barra oro in cima */}
      <div
        style={{
          height: '3px',
          background: `linear-gradient(to right, var(--color-gold-dark), var(--color-gold), var(--color-gold-light), var(--color-gold), var(--color-gold-dark))`,
        }}
      />

      {/* Top bar: data + masthead meta + nav desktop */}
      <div
        className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className="text-xs tracking-widest uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink-muted)', letterSpacing: '0.14em' }}
          >
            {new Date().toLocaleDateString('it-IT', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span className="hidden md:inline" style={{ color: 'var(--color-rule)' }}>·</span>
          <span
            className="hidden md:inline label-smallcaps"
            style={{ color: 'var(--color-gold)' }}
          >
            Edizione Quotidiana
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold tracking-widest uppercase px-4 py-1.5 transition-colors hover:text-gold"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-ink)',
                letterSpacing: '0.12em',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-px transition-transform duration-200"
            style={{
              backgroundColor: 'var(--color-ink)',
              transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-6 h-px transition-opacity duration-200"
            style={{ backgroundColor: 'var(--color-ink)', opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-px transition-transform duration-200"
            style={{
              backgroundColor: 'var(--color-ink)',
              transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 flex flex-col"
          style={{
            zIndex: 100,
            backgroundColor: 'var(--color-ink)',
            animation: 'fade-in-up 0.25s ease both',
          }}
        >
          {/* Top bar with close */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span
              className="label-smallcaps"
              style={{ color: 'var(--color-gold)' }}
            >
              Menu
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Chiudi menu"
              className="p-2"
              style={{ color: 'var(--color-paper)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Logo center */}
          <div className="flex items-center justify-center py-8">
            <img
              src="/logo.png"
              alt="Auctoritas"
              style={{ width: 110, height: 'auto', opacity: 0.85, filter: 'brightness(1.1)' }}
            />
          </div>

          {/* Nav links big */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 py-5"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span
                  style={{
                    color: 'var(--color-gold)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    opacity: 0.7,
                    minWidth: '28px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-paper)',
                    letterSpacing: '-0.01em',
                    flex: 1,
                  }}
                >
                  {l.label}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-gold)' }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Footer date */}
          <div
            className="px-6 py-5 text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span
              className="label-smallcaps"
              style={{ color: 'rgba(243,237,224,0.5)' }}
            >
              {new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      )}

      {/* Masthead */}
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-6 text-center">
        <Link href="/" className="inline-block">
          <img
            src="/logo.png"
            alt="Auctoritas"
            width={260}
            height={260}
            style={{ mixBlendMode: 'multiply', width: 'clamp(280px, 62vw, 420px)', height: 'auto' }}
          />
        </Link>

        <div className="flex items-center justify-center gap-4 mt-2 mb-3 max-w-xl mx-auto">
          <div className="flex-1 h-px" style={{ background: 'var(--color-rule)' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '0.7rem' }}>◆</span>
          <div className="flex-1 h-px" style={{ background: 'var(--color-rule)' }} />
        </div>

        <p
          className="tracking-widest uppercase"
          style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)', letterSpacing: '0.22em', fontSize: '0.85rem' }}
        >
          Politica e Geopolitica
        </p>

        <p
          className="mt-3 italic"
          style={{
            color: 'var(--color-ink-muted)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.02em',
            opacity: 0.75,
            fontSize: '1.05rem',
          }}
        >
          &ldquo;Capire prima di giudicare.&rdquo;
        </p>
      </div>

      <div style={{ borderBottom: '1px solid var(--color-rule)' }} />
    </header>
  )
}
