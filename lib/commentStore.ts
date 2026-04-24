import type { Comment } from './types'
import { seedComments } from './data'

const store = new Map<string, Comment[]>()
let seeded = false

export function getStore(): Map<string, Comment[]> {
  if (!seeded) {
    for (const c of seedComments) {
      const existing = store.get(c.topicId) ?? []
      store.set(c.topicId, [...existing, c])
    }
    seeded = true
  }
  return store
}

export function getAllComments(): Comment[] {
  const db = getStore()
  const all: Comment[] = []
  for (const comments of db.values()) all.push(...comments)
  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function approveComment(id: string): boolean {
  const db = getStore()
  for (const [topicId, comments] of db.entries()) {
    const idx = comments.findIndex(c => c.id === id)
    if (idx !== -1) {
      comments[idx] = { ...comments[idx], isApproved: !comments[idx].isApproved }
      db.set(topicId, comments)
      return true
    }
  }
  return false
}

export function deleteComment(id: string): boolean {
  const db = getStore()
  for (const [topicId, comments] of db.entries()) {
    const idx = comments.findIndex(c => c.id === id)
    if (idx !== -1) {
      db.set(topicId, comments.filter(c => c.id !== id))
      return true
    }
  }
  return false
}
