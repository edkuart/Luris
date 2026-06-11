import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { readSession, SESSION_COOKIE } from '@/server/auth/session'

export async function POST() {
  const session = await readSession()
  if (session) {
    await prisma.authSession.updateMany({
      where: { id: session.sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  }

  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)

  return Response.json({ ok: true })
}
