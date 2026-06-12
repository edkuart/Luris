import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { jwtVerify } from 'jose'
import type { UserRole } from '@prisma/client'

export const SESSION_COOKIE = 'luris_session'

export type SessionUser = {
  id: string
  organizationId: string
  role: UserRole
  email: string
  name: string
  sessionId: string
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) throw new Error('AUTH_SECRET must be configured with at least 32 characters')
  return new TextEncoder().encode(secret)
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
  const raw = cookieStore.get(SESSION_COOKIE)?.value
  if (!raw) return null

  try {
    const { payload } = await jwtVerify(raw, getAuthSecret())
    const p = payload as {
      sessionId: string
      userId: string
      organizationId: string
      role: UserRole
      email: string
      name: string
    }

    if (!p.userId || !p.organizationId || !p.sessionId) return null

    return {
      id: p.userId,
      organizationId: p.organizationId,
      role: p.role,
      email: p.email ?? '',
      name: p.name ?? '',
      sessionId: p.sessionId,
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

export function getSessionToken(): Promise<string | null> {
  return cookies().then((store) => store.get(SESSION_COOKIE)?.value ?? null)
}
