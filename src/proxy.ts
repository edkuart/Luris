import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_COOKIE = 'luris_session'

const privateRoutes = [
  '/admin',
  '/calendario',
  '/clientes',
  '/configuracion',
  '/cumplimiento',
  '/dashboard',
  '/documentos',
  '/juicios',
  '/ia-juridica',
  '/escrituras',
  '/plantillas',
  '/productividad',
  '/revision',
  '/riesgos',
  '/tareas',
  '/usuarios',
]

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) return null
  return new TextEncoder().encode(secret)
}

export async function proxy(request: NextRequest) {
  const isPrivateRoute = privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  if (!isPrivateRoute) return NextResponse.next()
  if (process.env.AUTH_MODE === 'mock') return NextResponse.next()

  const secret = getAuthSecret()
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value

  if (!secret || !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(sessionCookie, secret)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/calendario/:path*',
    '/clientes/:path*',
    '/configuracion/:path*',
    '/cumplimiento/:path*',
    '/dashboard/:path*',
    '/documentos/:path*',
    '/juicios/:path*',
    '/ia-juridica/:path*',
    '/escrituras/:path*',
    '/plantillas/:path*',
    '/productividad/:path*',
    '/revision/:path*',
    '/riesgos/:path*',
    '/tareas/:path*',
    '/usuarios/:path*',
  ],
}
