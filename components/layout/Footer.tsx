'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null

  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: 'var(--color-rule)', backgroundColor: 'var(--color-paper-dark)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Identity */}
          <div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              AUCTORITAS
            </span>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              Editoriale indipendente sugli eventi che definiscono il nostro tempo.
              Attuale, analitico, senza compromessi.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              Naviga
            </p>
            <ul className="space-y-2">
              {[
                { href: '/articles', label: 'Articoli' },
                { href: '/discuss', label: 'Discussioni' },
                { href: '/about', label: 'Chi Siamo' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-gold"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              Contatti
            </p>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              <li>
                <a
                  href="mailto:editorial@dispatch.press"
                  className="transition-colors hover:text-gold"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  editorial@dispatch.press
                </a>
              </li>
              <li className="flex gap-4 mt-4">
                {['X (Twitter)', 'Instagram'].map((s) => (
                  <span
                    key={s}
                    className="text-xs tracking-wide uppercase"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {s}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex items-center justify-between border-t"
          style={{ borderColor: 'var(--color-rule)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            © {new Date().getFullYear()} Auctoritas. Tutti i diritti riservati.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            Indipendente · Non partigiano · Editoriale
          </p>
        </div>
      </div>
    </footer>
  )
}
