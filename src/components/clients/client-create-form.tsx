'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ClientCreateForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form)),
    })

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null
      setError(data?.error ?? 'No se pudo crear el cliente.')
      setSubmitting(false)
      return
    }

    const data = (await response.json()) as { client: { id: string } }
    router.push(`/clientes/${data.client.id}`)
    router.refresh()
  }

  return (
    <form className="grid gap-3 rounded-lg border bg-card p-4 shadow-sm lg:grid-cols-2" onSubmit={handleSubmit}>
      <div className="lg:col-span-2">
        <p className="text-sm font-semibold text-primary">Crear cliente</p>
        <p className="mt-1 text-sm text-muted-foreground">Se vinculara automaticamente a la organizacion activa.</p>
      </div>
      <Input name="name" placeholder="Nombre completo o razon social" required />
      <Input name="nit" placeholder="NIT" />
      <Input name="dpi" placeholder="DPI" />
      <Input name="email" type="email" placeholder="Correo" />
      <Input name="phone" placeholder="Telefono" />
      <Input name="address" placeholder="Direccion" />
      <textarea
        name="notes"
        className="min-h-20 rounded-md border bg-card px-3 py-2 text-sm shadow-sm luris-focus lg:col-span-2"
        placeholder="Observaciones"
      />
      {error ? <p className="rounded-md border bg-secondary px-3 py-2 text-sm text-destructive lg:col-span-2">{error}</p> : null}
      <div className="lg:col-span-2">
        <Button type="submit" disabled={submitting}>
          <UserPlus className="h-4 w-4" /> {submitting ? 'Creando...' : 'Crear cliente'}
        </Button>
      </div>
    </form>
  )
}
