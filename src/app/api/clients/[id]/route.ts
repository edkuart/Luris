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

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response

  const { id } = await context.params
  const client = await prisma.client.findFirst({
    where: { id, organizationId: auth.session.organizationId },
    include: {
      caseFiles: {
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          caseNumber: true,
          court: true,
          status: true,
          updatedAt: true,
        },
      },
    },
  })

  if (!client) return Response.json({ error: 'Cliente no encontrado' }, { status: 404 })
  return Response.json({ client })
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession()
  if (!auth.session) return auth.response

  const { id } = await context.params
  const body = await request.json().catch(() => null)
  const parsed = clientSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Datos de cliente invalidos' }, { status: 400 })
  }

  const existing = await prisma.client.findFirst({
    where: { id, organizationId: auth.session.organizationId },
  })
  if (!existing) return Response.json({ error: 'Cliente no encontrado' }, { status: 404 })

  const client = await prisma.client.update({
    where: { id: existing.id },
    data: normalizeClient(parsed.data),
  })

  const headerStore = await headers()
  await recordAuditEvent({
    organizationId: auth.session.organizationId,
    userId: auth.session.id,
    action: 'client.update',
    entityType: 'Client',
    entityId: client.id,
    ipAddress: headerStore.get('x-forwarded-for')?.split(',')[0]?.trim(),
    metadata: { name: client.name },
  })

  return Response.json({ client })
}
