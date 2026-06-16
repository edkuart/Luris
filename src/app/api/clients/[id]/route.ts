import { headers } from 'next/headers'
import { requireApiSession } from '@/server/auth/session'
import { clientSchema, getClient, updateClient } from '@/server/clients'

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const { id } = await context.params
  const client = await getClient(auth.session.organizationId, id)
  if (!client) return Response.json({ error: 'Cliente no encontrado' }, { status: 404 })

  return Response.json({ client })
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const { id } = await context.params
  const parsed = clientSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: 'Datos de cliente invalidos' }, { status: 400 })
  }

  const ipAddress = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const client = await updateClient(auth.session, id, parsed.data, ipAddress)
  if (!client) return Response.json({ error: 'Cliente no encontrado' }, { status: 404 })

  return Response.json({ client })
}
