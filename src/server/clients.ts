import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { recordAuditEvent } from '@/server/audit/audit-events'

export const clientSchema = z.object({
  name: z.string().min(2).max(180),
  dpi: z.string().max(32).optional(),
  nit: z.string().max(32).optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().max(40).optional(),
  address: z.string().max(300).optional(),
  notes: z.string().max(2000).optional(),
})

export type ClientInput = z.infer<typeof clientSchema>

function normalizeClient(input: ClientInput) {
  return {
    name: input.name.trim(),
    dpi: input.dpi?.trim() || null,
    nit: input.nit?.trim() || null,
    email: input.email?.trim() || null,
    phone: input.phone?.trim() || null,
    address: input.address?.trim() || null,
    notes: input.notes?.trim() || null,
  }
}

export function listClients(organizationId: string) {
  return prisma.client.findMany({
    where: { organizationId },
    include: { _count: { select: { caseFiles: true } } },
    orderBy: { updatedAt: 'desc' },
  })
}

export function getClient(organizationId: string, id: string) {
  return prisma.client.findFirst({
    where: { id, organizationId },
    include: {
      caseFiles: {
        orderBy: { updatedAt: 'desc' },
        select: { id: true, title: true, caseNumber: true, court: true, status: true, updatedAt: true },
      },
    },
  })
}

export async function createClient(
  actor: { organizationId: string; id: string },
  input: ClientInput,
  ipAddress?: string | null,
) {
  const client = await prisma.client.create({
    data: { ...normalizeClient(input), organizationId: actor.organizationId },
  })

  await recordAuditEvent({
    organizationId: actor.organizationId,
    userId: actor.id,
    action: 'client.create',
    entityType: 'Client',
    entityId: client.id,
    ipAddress: ipAddress ?? null,
    metadata: { name: client.name },
  })

  return client
}

export async function updateClient(
  actor: { organizationId: string; id: string },
  id: string,
  input: ClientInput,
  ipAddress?: string | null,
) {
  const existing = await prisma.client.findFirst({ where: { id, organizationId: actor.organizationId } })
  if (!existing) return null

  const client = await prisma.client.update({ where: { id: existing.id }, data: normalizeClient(input) })

  await recordAuditEvent({
    organizationId: actor.organizationId,
    userId: actor.id,
    action: 'client.update',
    entityType: 'Client',
    entityId: client.id,
    ipAddress: ipAddress ?? null,
    metadata: { name: client.name },
  })

  return client
}
