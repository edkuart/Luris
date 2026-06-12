import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/server/auth/session'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  const apiUrl = process.env.API_URL
  if (!apiUrl) {
    return Response.json({ error: 'Configuracion de servidor incompleta' }, { status: 500 })
  }

  const upstream = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => null)

  if (!upstream) {
    return Response.json({ error: 'No se pudo conectar al servidor' }, { status: 503 })
  }

  const data = await upstream.json().catch(() => null)

  if (!upstream.ok) {
    return Response.json(data ?? { error: 'Error al iniciar sesion' }, { status: upstream.status })
  }

  const { token, expiresAt, user } = data as { token: string; expiresAt: string; user: unknown }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(expiresAt),
  })

  return Response.json({ user })
}
