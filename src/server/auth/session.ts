import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
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
  email: string
  name: string
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) throw new Error('AUTH_SECRET must be configured with at least 32 characters')
  return new TextEncoder().encode(secret)
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

function getSessionExpiration() {
  return new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
}

/** Crea la sesion persistida (AuthSession) y firma el JWT que viaja en cookie. */
export async function createSession(
  user: { id: string; email: string; name: string; role: UserRole; organizationId: string },
  meta?: { ipAddress?: string | null; userAgent?: string | null },
) {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = getSessionExpiration()

  const session = await prisma.authSession.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
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

  return { jwt, expiresAt }
}

async function verifySessionToken(jwt: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(jwt, getAuthSecret())
    const p = payload as SessionJwt
    if (!p.sessionId || !p.token || !p.userId) return null

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

export async function readSession(): Promise<SessionUser | null> {
  if (process.env.AUTH_MODE === 'mock') {
    return {
      id: 'mock-user-lic-principal',
      organizationId: 'mock-org-mayora',
      role: 'LICENCIADO_PRINCIPAL',
      email: process.env.DEMO_USER_EMAIL ?? 'demo@luris.gt',
      name: 'Lic. Eduardo Duarte',
      sessionId: 'mock-session',
    }
  }

  const cookieStore = await cookies()
  const raw = cookieStore.get(SESSION_COOKIE)?.value
  if (!raw) return null
  return verifySessionToken(raw)
}

export async function revokeSession(jwt: string): Promise<void> {
  try {
    const { payload } = await jwtVerify(jwt, getAuthSecret())
    const p = payload as SessionJwt
    await prisma.authSession.updateMany({
      where: { id: p.sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  } catch {
    // Token ya invalido — nada que revocar.
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

export function getSessionToken(): Promise<string | null> {
  return cookies().then((store) => store.get(SESSION_COOKIE)?.value ?? null)
}
