import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations'
import { recordAuditEvent } from '@/server/audit/audit-events'
import { verifyPassword } from '@/server/auth/password'
import { createSessionCookie } from '@/server/auth/session'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json({ error: 'Credenciales invalidas' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  })

  if (!user || user.status !== 'ACTIVE' || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return Response.json({ error: 'Correo o contrasena incorrectos' }, { status: 401 })
  }

  await createSessionCookie(user)

  const headerStore = await headers()
  await recordAuditEvent({
    organizationId: user.organizationId,
    userId: user.id,
    action: 'auth.login',
    entityType: 'User',
    entityId: user.id,
    ipAddress: headerStore.get('x-forwarded-for')?.split(',')[0]?.trim(),
    metadata: { email: user.email, role: user.role },
  })

  return Response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
  })
}
