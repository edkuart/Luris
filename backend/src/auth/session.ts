import { createHash, randomBytes } from 'node:crypto'
import { SignJWT, jwtVerify } from 'jose'
import type { Request } from 'express'
import type { UserRole } from '@prisma/client'
import { prisma } from '../lib/prisma'

const SESSION_DAYS = 7

export type SessionUser = {
  id: string
  organizationId: string
  role: UserRole
  email: string
  name: string
  sessionId: string
}

type SessionJwt = {
  sessionId: string
  token: string
  userId: string
  organizationId: string
  role: UserRole
  email: string
  name: string
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) throw new Error('AUTH_SECRET must be at least 32 characters')
  return new TextEncoder().encode(secret)
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export function getSessionExpiration() {
  return new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
}

export async function createSession(
  user: { id: string; email: string; name: string; role: UserRole; organizationId: string },
  req: Request,
) {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = getSessionExpiration()

  const session = await prisma.authSession.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt,
      ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip,
      userAgent: req.headers['user-agent'],
    },
  })

  const jwt = await new SignJWT({
    sessionId: session.id,
    token,
    userId: user.id,
    organizationId: user.organizationId,
    role: user.role,
    email: user.email,
    name: user.name,
  } satisfies SessionJwt)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getAuthSecret())

  return { jwt, expiresAt, sessionId: session.id }
}

export async function verifySession(bearer: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(bearer, getAuthSecret())
    const p = payload as SessionJwt

    const session = await prisma.authSession.findFirst({
      where: {
        id: p.sessionId,
        tokenHash: hashToken(p.token),
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    })

    if (!session?.user.organizationId || session.user.status !== 'ACTIVE') return null

    return {
      id: session.user.id,
      organizationId: session.user.organizationId,
      role: session.user.role,
      email: session.user.email,
      name: session.user.name,
      sessionId: session.id,
    }
  } catch {
    return null
  }
}

export async function revokeSession(bearer: string): Promise<void> {
  try {
    const { payload } = await jwtVerify(bearer, getAuthSecret())
    const p = payload as SessionJwt
    await prisma.authSession.updateMany({
      where: { id: p.sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  } catch {
    // Token already invalid — nothing to revoke
  }
}
