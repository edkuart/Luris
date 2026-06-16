import { cookies } from 'next/headers'
import { SESSION_COOKIE, getSessionToken, revokeSession } from '@/server/auth/session'

export async function POST() {
  const token = await getSessionToken()
  if (token) await revokeSession(token)

  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)

  return Response.json({ ok: true })
}
