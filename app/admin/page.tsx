'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Comment } from '@/lib/types'

const PASSWORD = 'auctoritas2026'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all')

  const fetchComments = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/comments', {
      headers: { 'x-admin-key': PASSWORD },
    })
    if (res.ok) setComments(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authed) fetchComments()
  }, [authed, fetchComments])

  const login = () => {
    if (input === PASSWORD) {
      setAuthed(true)
      setError('')
    } else {
      setError('Password errata.')
    }
  }

  const toggle = async (id: string) => {
    await fetch('/api/admin/comments', {
      method: 'PATCH',
      headers: { 'x-admin-key': PASSWORD, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchComments()
  }

  const remove = async (id: string) => {
    if (!confirm('Eliminare questo commento?')) return
    await fetch('/api/admin/comments', {
      method: 'DELETE',
      headers: { 'x-admin-key': PASSWORD, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchComments()
  }

  const visible = comments.filter(c =>
    filter === 'all' ? true : filter === 'approved' ? c.isApproved : !c.isApproved
  )

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-paper-dark)' }}
      >
        <div className="w-full max-w-sm px-8 py-10" style={{ border: '1px solid var(--color-rule)' }}>
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: 'var(--color-gold)', letterSpacing: '0.18em' }}
          >
            Auctoritas
          </p>
          <h1
            className="text-2xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Pannello Admin
          </h1>
          <input
            type="password"
            placeholder="Password"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full px-4 py-3 text-sm mb-3 outline-none"
            style={{
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-rule)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
            }}
          />
          {error && (
            <p className="text-xs mb-3" style={{ color: '#c0392b' }}>{error}</p>
          )}
          <button
            onClick={login}
            className="w-full py-3 text-xs font-semibold tracking-widest uppercase transition-colors"
            style={{
              backgroundColor: 'var(--color-ink)',
              color: 'var(--color-paper)',
              letterSpacing: '0.14em',
            }}
          >
            Accedi
          </button>
        </div>
      </div>
    )
  }

  const approved = comments.filter(c => c.isApproved).length
  const pending = comments.filter(c => !c.isApproved).length

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-paper-dark)' }}>
      {/* Admin header */}
      <div
        className="px-8 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-rule)', backgroundColor: 'var(--color-ink)' }}
      >
        <div className="flex items-center gap-6">
          <span
            className="text-sm font-bold tracking-widest"
            style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}
          >
            AUCTORITAS
          </span>
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(243,237,224,0.4)' }}>
            Admin
          </span>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="text-xs tracking-widest uppercase"
          style={{ color: 'rgba(243,237,224,0.5)' }}
        >
          Esci
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Totale', value: comments.length },
            { label: 'Approvati', value: approved },
            { label: 'In attesa', value: pending },
          ].map(s => (
            <div
              key={s.label}
              className="p-6"
              style={{ border: '1px solid var(--color-rule)', backgroundColor: 'var(--color-paper)' }}
            >
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: 'var(--color-ink-muted)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter + title */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Commenti
          </h2>
          <div className="flex gap-1">
            {(['all', 'approved', 'pending'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 text-xs tracking-widest uppercase transition-colors"
                style={{
                  border: '1px solid var(--color-rule)',
                  backgroundColor: filter === f ? 'var(--color-ink)' : 'var(--color-paper)',
                  color: filter === f ? 'var(--color-paper)' : 'var(--color-ink-muted)',
                  letterSpacing: '0.1em',
                }}
              >
                {f === 'all' ? 'Tutti' : f === 'approved' ? 'Approvati' : 'In attesa'}
              </button>
            ))}
          </div>
        </div>

        {/* Comment list */}
        {loading ? (
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>Caricamento...</p>
        ) : visible.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>Nessun commento.</p>
        ) : (
          <div className="space-y-3">
            {visible.map(c => (
              <div
                key={c.id}
                className="p-5"
                style={{
                  border: '1px solid var(--color-rule)',
                  backgroundColor: 'var(--color-paper)',
                  borderLeft: c.isApproved
                    ? '3px solid var(--color-gold)'
                    : '3px solid var(--color-rule)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                      >
                        {c.nickname}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                        {c.topicId}
                      </span>
                      {c.parentId && (
                        <span
                          className="text-xs px-1.5 py-0.5"
                          style={{ border: '1px solid var(--color-rule)', color: 'var(--color-ink-muted)' }}
                        >
                          risposta
                        </span>
                      )}
                      <span
                        className="text-xs px-2 py-0.5 ml-auto"
                        style={{
                          backgroundColor: c.isApproved ? 'var(--color-gold)' : 'transparent',
                          border: '1px solid var(--color-rule)',
                          color: c.isApproved ? 'var(--color-paper)' : 'var(--color-ink-muted)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {c.isApproved ? 'Approvato' : 'In attesa'}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-ink-secondary)', lineHeight: '1.7' }}
                    >
                      {c.content}
                    </p>
                    <p className="text-xs mt-2" style={{ color: 'var(--color-ink-muted)' }}>
                      {new Date(c.createdAt).toLocaleString('it-IT')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 flex-none">
                    <button
                      onClick={() => toggle(c.id)}
                      className="px-3 py-1.5 text-xs tracking-wide uppercase transition-colors"
                      style={{
                        border: '1px solid var(--color-gold)',
                        color: 'var(--color-gold)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.isApproved ? 'Nascondi' : 'Approva'}
                    </button>
                    <button
                      onClick={() => remove(c.id)}
                      className="px-3 py-1.5 text-xs tracking-wide uppercase transition-colors"
                      style={{ border: '1px solid #c0392b', color: '#c0392b', whiteSpace: 'nowrap' }}
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
