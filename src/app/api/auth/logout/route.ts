import { cookies } from 'next/headers'
import { SESSION_COOKIE, getSessionToken } from '@/server/auth/session'

export async function POST() {
  const token = await getSessionToken()

  if (token && process.env.API_URL) {
    await fetch(`${process.env.API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => null)
  }

  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)

  return Response.json({ ok: true })
}
