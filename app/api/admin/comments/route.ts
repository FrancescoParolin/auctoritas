import { NextRequest } from 'next/server'
import { getAllComments, approveComment, deleteComment } from '@/lib/commentStore'

const ADMIN_PASSWORD = 'auctoritas2026'

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-key')
  return auth === ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return Response.json(getAllComments())
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await request.json()
  const ok = approveComment(id)
  return ok
    ? Response.json({ success: true })
    : Response.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await request.json()
  const ok = deleteComment(id)
  return ok
    ? Response.json({ success: true })
    : Response.json({ error: 'Not found' }, { status: 404 })
}
