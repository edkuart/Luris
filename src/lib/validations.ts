import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const clientSchema = z.object({
  name: z.string().min(2).max(180),
  dpi: z.string().max(32).optional(),
  nit: z.string().max(32).optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().max(40).optional(),
  address: z.string().max(300).optional(),
  notes: z.string().max(2000).optional(),
})

export const caseFileSchema = z.object({
  clientId: z.string().min(1),
  title: z.string().min(3).max(220),
  caseNumber: z.string().max(80).optional(),
  court: z.string().max(180).optional(),
  type: z.string().max(120).optional(),
  responsibleUserId: z.string().optional(),
  description: z.string().max(4000).optional(),
})
