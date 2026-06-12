import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/requireAuth'
import { recordAuditEvent } from '../audit/audit-events'

export const clientsRouter = Router()

clientsRouter.use(requireAuth)

const clientSchema = z.object({
  name: z.string().min(2).max(180),
  dpi: z.string().max(32).optional(),
  nit: z.string().max(32).optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().max(40).optional(),
  address: z.string().max(300).optional(),
  notes: z.string().max(2000).optional(),
})

function normalizeClient(input: z.infer<typeof clientSchema>) {
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

clientsRouter.get('/', async (req, res) => {
  const clients = await prisma.client.findMany({
    where: { organizationId: req.sessionUser.organizationId },
    include: { _count: { select: { caseFiles: true } } },
    orderBy: { updatedAt: 'desc' },
  })
  res.json({ clients })
})

clientsRouter.post('/', async (req, res) => {
  const parsed = clientSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Datos de cliente invalidos' })
    return
  }

  const client = await prisma.client.create({
    data: { ...normalizeClient(parsed.data), organizationId: req.sessionUser.organizationId },
  })

  await recordAuditEvent({
    organizationId: req.sessionUser.organizationId,
    userId: req.sessionUser.id,
    action: 'client.create',
    entityType: 'Client',
    entityId: client.id,
    ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip,
    metadata: { name: client.name },
  })

  res.status(201).json({ client })
})

clientsRouter.get('/:id', async (req, res) => {
  const client = await prisma.client.findFirst({
    where: { id: req.params.id, organizationId: req.sessionUser.organizationId },
    include: {
      caseFiles: {
        orderBy: { updatedAt: 'desc' },
        select: { id: true, title: true, caseNumber: true, court: true, status: true, updatedAt: true },
      },
    },
  })

  if (!client) {
    res.status(404).json({ error: 'Cliente no encontrado' })
    return
  }

  res.json({ client })
})

clientsRouter.patch('/:id', async (req, res) => {
  const parsed = clientSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Datos de cliente invalidos' })
    return
  }

  const existing = await prisma.client.findFirst({
    where: { id: req.params.id, organizationId: req.sessionUser.organizationId },
  })
  if (!existing) {
    res.status(404).json({ error: 'Cliente no encontrado' })
    return
  }

  const client = await prisma.client.update({
    where: { id: existing.id },
    data: normalizeClient(parsed.data),
  })

  await recordAuditEvent({
    organizationId: req.sessionUser.organizationId,
    userId: req.sessionUser.id,
    action: 'client.update',
    entityType: 'Client',
    entityId: client.id,
    ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip,
    metadata: { name: client.name },
  })

  res.json({ client })
})
