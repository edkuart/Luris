import { prisma } from '@/lib/prisma'
import type { AuditAction } from '@/types/domain'
import type { Prisma } from '@prisma/client'

export type AuditEvent = {
  organizationId?: string | null
  userId?: string | null
  action: AuditAction | string
  entityType: string
  entityId?: string | null
  ipAddress?: string | null
  metadata?: Prisma.InputJsonValue
}

export async function recordAuditEvent(event: AuditEvent) {
  return prisma.auditLog.create({
    data: {
      organizationId: event.organizationId ?? null,
      userId: event.userId ?? null,
      action: event.action,
      entityType: event.entityType,
      entityId: event.entityId ?? null,
      ipAddress: event.ipAddress ?? null,
      metadata: event.metadata,
    },
  })
}
