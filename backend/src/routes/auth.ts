import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { verifyPassword } from '../auth/password'
import { createSession, revokeSession } from '../auth/session'
import { recordAuditEvent } from '../audit/audit-events'

export const authRouter = Router()

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || typeof email !== 'string' || !password || typeof password !== 'string' || password.length < 8) {
    res.status(400).json({ error: 'Credenciales invalidas' })
    return
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  })

  if (!user || user.status !== 'ACTIVE' || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({ error: 'Correo o contrasena incorrectos' })
    return
  }

  if (!user.organizationId) {
    res.status(403).json({ error: 'Usuario sin organizacion asignada' })
    return
  }

  const { jwt, expiresAt } = await createSession(
    { id: user.id, email: user.email, name: user.name, role: user.role, organizationId: user.organizationId },
    req,
  )

  await recordAuditEvent({
    organizationId: user.organizationId,
    userId: user.id,
    action: 'auth.login',
    entityType: 'User',
    entityId: user.id,
    ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip,
    metadata: { email: user.email, role: user.role },
  })

  res.json({
    token: jwt,
    expiresAt: expiresAt.toISOString(),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
  })
})

authRouter.post('/logout', async (req, res) => {
  const auth = req.headers.authorization
  if (auth?.startsWith('Bearer ')) {
    await revokeSession(auth.slice(7))
  }
  res.json({ ok: true })
})
