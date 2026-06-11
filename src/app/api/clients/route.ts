import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { clientSchema } from '@/lib/validations'
import { recordAuditEvent } from '@/server/audit/audit-events'
import { requireApiSession } from '@/server/auth/session'

function normalizeClient(input: unknown) {
  const parsed = clientSchema.parse(input)
  return {
    name: parsed.name.trim(),
    dpi: parsed.dpi?.trim() || null,
    nit: parsed.nit?.trim() || null,
    email: parsed.email?.trim() || null,
    phone: parsed.phone?.trim() || null,
    address: parsed.address?.trim() || null,
    notes: parsed.notes?.trim() || null,
  }
}

export async function GET() {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response

  const clients = await prisma.client.findMany({
    where: { organizationId: auth.session.organizationId },
    include: { _count: { select: { caseFiles: true } } },
    orderBy: { updatedAt: 'desc' },
  })

  return Response.json({ clients })
}

export async function POST(request: Request) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response

  const body = await request.json().catch(() => null)
  const parsed = clientSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Datos de cliente invalidos' }, { status: 400 })
  }

  const client = await prisma.client.create({
    data: {
      ...normalizeClient(parsed.data),
      organizationId: auth.session.organizationId,
    },
  })

  const headerStore = await headers()
  await recordAuditEvent({
    organizationId: auth.session.organizationId,
    userId: auth.session.id,
    action: 'client.create',
    entityType: 'Client',
    entityId: client.id,
    ipAddress: headerStore.get('x-forwarded-for')?.split(',')[0]?.trim(),
    metadata: { name: client.name },
  })

  return Response.json({ client }, { status: 201 })
}
