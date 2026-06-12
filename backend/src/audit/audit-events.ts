import type { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

type AuditEvent = {
  organizationId?: string | null
  userId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  ipAddress?: string | null
  metadata?: Prisma.InputJsonValue
}

export function recordAuditEvent(event: AuditEvent) {
  return prisma.auditLog.create({ data: event })
}
