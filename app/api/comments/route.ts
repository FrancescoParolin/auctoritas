import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import type { Comment } from '@/lib/types'
import { getStore } from '@/lib/commentStore'

// Rate limit: 5 posts per IP per 60 seconds
const rateLimit = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)
  if (!record || now > record.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  if (record.count >= 5) return false
  record.count++
  return true
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const topicId = searchParams.get('topicId')

  if (!topicId) {
    return Response.json({ error: 'topicId is required' }, { status: 400 })
  }

  const db = getStore()
  const comments = (db.get(topicId) ?? []).filter((c) => c.isApproved)
  const sorted = [...comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  return Response.json(sorted)
}

export async function POST(request: NextRequest) {
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: 'Too many comments. Please wait a moment before posting again.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { topicId, parentId, nickname, content } = body as Record<string, unknown>

  if (typeof topicId !== 'string' || !topicId.trim()) {
    return Response.json({ error: 'topicId is required.' }, { status: 400 })
  }
  if (typeof nickname !== 'string' || nickname.trim().length < 2 || nickname.trim().length > 40) {
    return Response.json({ error: 'Nickname must be 2–40 characters.' }, { status: 400 })
  }
  if (typeof content !== 'string' || content.trim().length < 10 || content.trim().length > 1000) {
    return Response.json({ error: 'Comment must be 10–1000 characters.' }, { status: 400 })
  }
  if (parentId !== undefined && typeof parentId !== 'string') {
    return Response.json({ error: 'Invalid parentId.' }, { status: 400 })
  }

  const cleanContent = stripHtml(content.trim())
  const cleanNick = stripHtml(nickname.trim())

  const db = getStore()
  if (parentId) {
    const existing = db.get(topicId as string) ?? []
    const parent = existing.find((c) => c.id === parentId)
    if (!parent) {
      return Response.json({ error: 'Parent comment not found.' }, { status: 404 })
    }
  }

  const comment: Comment = {
    id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    topicId: topicId as string,
    parentId: (parentId as string | undefined) || undefined,
    nickname: cleanNick,
    content: cleanContent,
    createdAt: new Date().toISOString(),
    isApproved: true,
  }

  const existing = db.get(topicId as string) ?? []
  db.set(topicId as string, [...existing, comment])

  return Response.json(comment, { status: 201 })
}
