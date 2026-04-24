'use client'

import { useEffect, useState, useCallback } from 'react'
import CommentForm from './CommentForm'
import type { Comment, CommentWithReplies } from '@/lib/types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function CommentItem({
  comment,
  onReplyPosted,
  depth = 0,
}: {
  comment: CommentWithReplies
  onReplyPosted: () => void
  depth?: number
}) {
  const [replying, setReplying] = useState(false)

  return (
    <div
      className={depth > 0 ? 'pl-6 border-l' : ''}
      style={{ borderColor: depth > 0 ? 'var(--color-rule)' : undefined }}
    >
      <div className="py-5">
        {/* Author + date */}
        <div className="flex items-baseline gap-3 mb-3">
          <span
            className="text-sm font-semibold"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
          >
            {comment.nickname}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            {formatDate(comment.createdAt)}
          </span>
        </div>

        {/* Content */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-body)' }}
        >
          {comment.content}
        </p>

        {/* Reply button */}
        {depth < 2 && (
          <button
            onClick={() => setReplying(!replying)}
            className="mt-3 text-xs tracking-wide transition-colors"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            {replying ? 'Annulla risposta' : '↩ Rispondi'}
          </button>
        )}
      </div>

      {/* Reply form */}
      {replying && (
        <div
          className="mb-4 p-4"
          style={{ backgroundColor: 'var(--color-paper-dark)' }}
        >
          <CommentForm
            topicId={comment.topicId}
            parentId={comment.id}
            onSuccess={() => {
              setReplying(false)
              onReplyPosted()
            }}
            onCancel={() => setReplying(false)}
            placeholder={`Rispondi a ${comment.nickname}...`}
          />
        </div>
      )}

      {/* Nested replies */}
      {comment.replies.length > 0 && (
        <div className="mb-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={{ ...reply, replies: [] }}
              onReplyPosted={onReplyPosted}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CommentThread({ topicId }: { topicId: string }) {
  const [comments, setComments] = useState<CommentWithReplies[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?topicId=${topicId}`)
      if (!res.ok) throw new Error('Failed to load comments')
      const data: Comment[] = await res.json()

      // Build thread tree
      const topLevel = data.filter((c) => !c.parentId)
      const withReplies: CommentWithReplies[] = topLevel.map((c) => ({
        ...c,
        replies: data.filter((r) => r.parentId === c.id),
      }))

      setComments(withReplies)
    } catch {
      setError('Could not load comments.')
    } finally {
      setLoading(false)
    }
  }, [topicId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <div>
      {/* Comment list */}
      <div className="mb-12">
        <h2
          className="text-sm tracking-widest uppercase mb-6"
          style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
        >
          Discussione ({loading ? '…' : comments.reduce((n, c) => n + 1 + c.replies.length, 0)})
        </h2>

        {loading && (
          <p className="text-sm py-8" style={{ color: 'var(--color-ink-muted)' }}>
            Caricamento commenti…
          </p>
        )}

        {error && (
          <p className="text-sm py-8" style={{ color: 'var(--color-ink-muted)' }}>
            {error}
          </p>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="text-sm py-8" style={{ color: 'var(--color-ink-muted)' }}>
            Nessun commento ancora. Sii il primo a contribuire.
          </p>
        )}

        <div className="divide-y" style={{ borderColor: 'var(--color-rule)' }}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplyPosted={fetchComments}
            />
          ))}
        </div>
      </div>

      {/* New comment form */}
      <div
        className="pt-10 border-t"
        style={{ borderColor: 'var(--color-rule)' }}
      >
        <h2
          className="text-sm tracking-widest uppercase mb-6"
          style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
        >
          Aggiungi la Tua Voce
        </h2>
        <p className="text-xs mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          Nessun account richiesto. Il tuo nickname è il tuo unico identificatore.
          Rimani in tema e sii sostanziale.
        </p>
        <CommentForm topicId={topicId} onSuccess={fetchComments} />
      </div>
    </div>
  )
}
