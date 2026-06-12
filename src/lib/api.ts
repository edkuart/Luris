import { getSessionToken } from '@/server/auth/session'

function apiUrl(path: string) {
  const base = process.env.API_URL
  if (!base) throw new Error('API_URL environment variable is not set')
  return `${base}${path}`
}

export async function apiFetch(path: string, init?: RequestInit) {
  const token = await getSessionToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const response = await fetch(apiUrl(path), { ...init, headers })
  return response
}
