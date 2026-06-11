'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function MockLoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')

    if (!emailPattern.test(email)) {
      setError('Ingrese un correo valido.')
      return
    }

    if (password.length < 8) {
      setError('Ingrese una contrasena de al menos 8 caracteres.')
      return
    }

    setError('')
    setSubmitting(true)

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null
      setError(data?.error ?? 'No se pudo iniciar sesion.')
      setSubmitting(false)
      return
    }

    router.replace('/dashboard')
    router.refresh()
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Correo
        </label>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="licenciado@despacho.gt" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-foreground">
          Contrasena
        </label>
        <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
      </div>
      {error ? <p className="rounded-md border bg-secondary px-3 py-2 text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Ingresando...' : 'Iniciar sesion'}
      </Button>
    </form>
  )
}
