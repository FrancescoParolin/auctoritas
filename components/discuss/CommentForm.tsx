'use client'

import { useState } from 'react'

interface Props {
  topicId: string
  parentId?: string
  onSuccess: () => void
  onCancel?: () => void
  placeholder?: string
}

export default function CommentForm({
  topicId,
  parentId,
  onSuccess,
  onCancel,
  placeholder = 'Share your perspective...',
}: Props) {
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [honeypot, setHoneypot] = useState('') // anti-spam
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) return // bot detected

    const trimmedContent = content.trim()
    const trimmedNick = nickname.trim()

    if (!trimmedNick || trimmedNick.length < 2) {
      setError('Inserisci un nickname (min 2 caratteri).')
      return
    }
    if (trimmedContent.length < 10) {
      setError('Il commento è troppo corto (min 10 caratteri).')
      return
    }
    if (trimmedContent.length > 1000) {
      setError('Il commento è troppo lungo (max 1000 caratteri).')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, parentId, nickname: trimmedNick, content: trimmedContent }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Errore durante la pubblicazione.')
      }

      setNickname('')
      setContent('')
      setStatus('idle')
      onSuccess()
    } catch (err: unknown) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Qualcosa è andato storto.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        autoComplete="off"
      />

      <div>
        <label
          className="block text-xs tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-ink-muted)' }}
          htmlFor={`nick-${topicId}-${parentId ?? 'root'}`}
        >
          Nickname
        </label>
        <input
          id={`nick-${topicId}-${parentId ?? 'root'}`}
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={40}
          placeholder="Il tuo nome o pseudonimo"
          className="w-full md:w-64 px-4 py-2.5 text-sm border outline-none transition-colors focus:border-gold"
          style={{
            borderColor: 'var(--color-rule)',
            backgroundColor: 'var(--color-paper)',
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-body)',
          }}
        />
      </div>

      <div>
        <label
          className="block text-xs tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-ink-muted)' }}
          htmlFor={`content-${topicId}-${parentId ?? 'root'}`}
        >
          Commento
        </label>
        <textarea
          id={`content-${topicId}-${parentId ?? 'root'}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          maxLength={1000}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-sm border outline-none resize-none transition-colors focus:border-gold"
          style={{
            borderColor: 'var(--color-rule)',
            backgroundColor: 'var(--color-paper)',
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.7',
          }}
        />
        <p
          className="mt-1 text-xs text-right"
          style={{ color: content.length > 900 ? 'var(--color-gold)' : 'var(--color-ink-muted)' }}
        >
          {content.length}/1000
        </p>
      </div>

      {error && (
        <p className="text-xs" style={{ color: '#c0392b' }}>
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2.5 text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
          style={{
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-paper)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {status === 'loading' ? 'Pubblicazione...' : 'Pubblica commento'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs tracking-wide transition-colors"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Annulla
          </button>
        )}
      </div>
    </form>
  )
}
