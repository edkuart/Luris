import { apiFetch } from '@/lib/api'
import { requireApiSession } from '@/server/auth/session'

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const { id } = await context.params
  const upstream = await apiFetch(`/api/clients/${id}`)
  const data = await upstream.json()
  return Response.json(data, { status: upstream.status })
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const { id } = await context.params
  const body = await request.text()
  const upstream = await apiFetch(`/api/clients/${id}`, { method: 'PATCH', body })
  const data = await upstream.json()
  return Response.json(data, { status: upstream.status })
}
