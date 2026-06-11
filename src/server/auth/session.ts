import { createHash, randomBytes } from 'node:crypto'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT, jwtVerify } from 'jose'
import type { UserRole } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const SESSION_COOKIE = 'luris_session'
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
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be configured with at least 32 characters')
  }
  return new TextEncoder().encode(secret)
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export function getSessionExpiration() {
  return new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
}

export async function createSessionCookie(user: {
  id: string
  email: string
  role: UserRole
  organizationId: string | null
}) {
  if (!user.organizationId) {
    throw new Error('User is not attached to an organization')
  }

  const token = randomBytes(32).toString('base64url')
  const expiresAt = getSessionExpiration()
  const headerStore = await headers()

  const session = await prisma.authSession.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt,
      ipAddress: headerStore.get('x-forwarded-for')?.split(',')[0]?.trim(),
      userAgent: headerStore.get('user-agent'),
    },
  })

  const jwt = await new SignJWT({
    sessionId: session.id,
    token,
    userId: user.id,
    organizationId: user.organizationId,
    role: user.role,
  } satisfies SessionJwt)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getAuthSecret())

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })

  return session
}

export async function readSession(): Promise<SessionUser | null> {
  if (process.env.AUTH_MODE === 'mock') {
    return {
      id: 'mock-user-lic-principal',
      organizationId: 'mock-org-mayora',
      role: 'LICENCIADO_PRINCIPAL',
      email: process.env.DEMO_USER_EMAIL ?? 'edkuart@gmail.com',
      name: 'Lic. Eduardo Duarte',
      sessionId: 'mock-session',
    }
  }

  const cookieStore = await cookies()
  const rawCookie = cookieStore.get(SESSION_COOKIE)?.value
  if (!rawCookie) return null

  try {
    const { payload } = await jwtVerify(rawCookie, getAuthSecret())
    const sessionPayload = payload as SessionJwt

    const session = await prisma.authSession.findFirst({
      where: {
        id: sessionPayload.sessionId,
        tokenHash: hashToken(sessionPayload.token),
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    })

    if (!session?.user.organizationId || session.user.status !== 'ACTIVE') {
      return null
    }

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

export async function requireSession() {
  const session = await readSession()
  if (!session) redirect('/login')
  return session
}

export async function requireApiSession() {
  const session = await readSession()
  if (!session) {
    return { session: null, response: Response.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { session, response: null }
}
