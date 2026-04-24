import type { Metadata } from 'next'
import ArticleCard from '@/components/articles/ArticleCard'
import { getAllArticles } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Articoli',
  description: 'Archivio editoriale completo — copertura e analisi continua.',
}

export const revalidate = 30

export default async function ArticlesPage() {
  const sorted = await getAllArticles()
  const categories = ['Tutti', ...Array.from(new Set(sorted.map((a) => a.category)))]
  const articles = sorted

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Page header */}
      <div className="mb-12">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Archivio
        </p>
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
          }}
        >
          Articoli
        </h1>
        <p
          className="mt-3 text-sm"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          {articles.length} pezzi · Copertura continua degli eventi che contano
        </p>
      </div>

      {/* Category filter (static — visual only for now) */}
      <div
        className="flex items-center gap-1 mb-10 overflow-x-auto scrollbar-none pb-2"
      >
        {categories.map((cat, i) => (
          <span
            key={cat}
            className="flex-none px-3 py-1.5 text-xs tracking-widest uppercase border transition-colors cursor-pointer"
            style={{
              borderColor: i === 0 ? 'var(--color-ink)' : 'var(--color-rule)',
              color: i === 0 ? 'var(--color-ink)' : 'var(--color-ink-muted)',
              backgroundColor: i === 0 ? 'var(--color-ink)' : 'transparent',
              ...(i === 0 ? { color: 'var(--color-paper)' } : {}),
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Articles list */}
      <div>
        {sorted.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
