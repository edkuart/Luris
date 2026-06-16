import { cookies, headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/server/auth/password'
import { createSession, SESSION_COOKIE } from '@/server/auth/session'
import { recordAuditEvent } from '@/server/audit/audit-events'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null
  const email = body?.email
  const password = body?.password

  if (!email || typeof email !== 'string' || !password || typeof password !== 'string' || password.length < 8) {
    return Response.json({ error: 'Credenciales invalidas' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })

  if (!user || user.status !== 'ACTIVE' || !verifyPassword(password, user.passwordHash)) {
    return Response.json({ error: 'Correo o contrasena incorrectos' }, { status: 401 })
  }

  if (!user.organizationId) {
    return Response.json({ error: 'Usuario sin organizacion asignada' }, { status: 403 })
  }

  const headerStore = await headers()
  const { jwt, expiresAt } = await createSession(
    { id: user.id, email: user.email, name: user.name, role: user.role, organizationId: user.organizationId },
    {
      ipAddress: headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
      userAgent: headerStore.get('user-agent'),
    },
  )

  await recordAuditEvent({
    organizationId: user.organizationId,
    userId: user.id,
    action: 'auth.login',
    entityType: 'User',
    entityId: user.id,
    metadata: { email: user.email, role: user.role },
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })

  return Response.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, organizationId: user.organizationId },
  })
}
