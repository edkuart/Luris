import { apiFetch } from '@/lib/api'
import { requireApiSession } from '@/server/auth/session'

export async function GET() {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const upstream = await apiFetch('/api/clients')
  const data = await upstream.json()
  return Response.json(data, { status: upstream.status })
}

export async function POST(request: Request) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const body = await request.text()
  const upstream = await apiFetch('/api/clients', { method: 'POST', body })
  const data = await upstream.json()
  return Response.json(data, { status: upstream.status })
}
