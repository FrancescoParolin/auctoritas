'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/articles', label: 'Articoli' },
  { href: '/risorse', label: 'Link Utili' },
  { href: '/about', label: 'Chi Siamo' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

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

      {/* Top bar: data + nav desktop */}
      <div
        className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink-muted)', letterSpacing: '0.12em' }}
        >
          {new Date().toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>

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

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{ backgroundColor: 'var(--color-ink)', borderBottom: '2px solid var(--color-gold)' }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-sm font-semibold tracking-widest uppercase"
              style={{
                color: 'var(--color-paper)',
                letterSpacing: '0.14em',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {l.label}
            </Link>
          ))}
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
