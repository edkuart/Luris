import { headers } from 'next/headers'
import { requireApiSession } from '@/server/auth/session'
import { clientSchema, createClient, listClients } from '@/server/clients'

export async function GET() {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const clients = await listClients(auth.session.organizationId)
  return Response.json({ clients })
}

export async function POST(request: Request) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response!

  const parsed = clientSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: 'Datos de cliente invalidos' }, { status: 400 })
  }

  const ipAddress = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const client = await createClient(auth.session, parsed.data, ipAddress)
  return Response.json({ client }, { status: 201 })
}
