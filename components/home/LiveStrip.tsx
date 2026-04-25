'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Article } from '@/lib/types'

function StripCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="flex-none w-76 group"
      style={{ textDecoration: 'none', width: '300px' }}
    >
      <article
        className="strip-card h-full"
        style={{ padding: '1.5rem 1.5rem 1.35rem 1.65rem' }}
      >
        <span className="label-smallcaps" style={{ color: 'var(--color-gold)' }}>
          {article.category}
        </span>

        {/* Titolo */}
        <h3
          className="mt-3 text-base font-bold leading-snug"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-ink)',
            lineHeight: '1.4',
            transition: 'color 0.2s ease',
          }}
        >
          {article.title}
        </h3>

        {/* Estratto */}
        <p
          className="mt-2 text-xs leading-relaxed line-clamp-2"
          style={{ color: 'var(--color-ink-muted)', lineHeight: '1.65' }}
        >
          {article.summary}
        </p>

        {/* Data con separatore */}
        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-rule)' }} />
          <p
            className="text-xs flex-none"
            style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            {new Date(article.publishedAt).toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default function LiveStrip({ articles }: { articles: Article[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const speed = 0.6

    const animate = () => {
      if (!isPausedRef.current && el) {
        el.scrollLeft += speed
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const pause = () => { isPausedRef.current = true }
    const resume = () => { isPausedRef.current = false }
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)

    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
    }
  }, [])

  const scrollBy = (direction: 'prev' | 'next') => {
    const el = containerRef.current
    if (!el) return
    isPausedRef.current = true
    el.scrollBy({ left: direction === 'next' ? 300 : -300, behavior: 'smooth' })
    setTimeout(() => { isPausedRef.current = false }, 2500)
  }

  const items = [...articles, ...articles]

  return (
    <section className="py-8" style={{ borderBottom: '1px solid var(--color-rule)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Strip header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-gold)' }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
            >
              In Diretta
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollBy('prev')} className="btn-arrow" aria-label="Precedente">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => scrollBy('next')} className="btn-arrow" aria-label="Successivo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrolling strip */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-none"
          style={{ cursor: 'default' }}
        >
          {items.map((article, i) => (
            <StripCard key={`strip-${i}`} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
