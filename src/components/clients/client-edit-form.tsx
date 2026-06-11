'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type ClientFormValue = {
  id: string
  name: string
  dpi: string | null
  nit: string | null
  email: string | null
  phone: string | null
  address: string | null
  notes: string | null
}

export function ClientEditForm({ client }: { client: ClientFormValue }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const form = new FormData(event.currentTarget)
    const response = await fetch(`/api/clients/${client.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form)),
    })

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null
      setError(data?.error ?? 'No se pudo actualizar el cliente.')
      setSubmitting(false)
      return
    }

    router.refresh()
    setSubmitting(false)
  }

  return (
    <form className="grid gap-3 rounded-lg border bg-card p-4 shadow-sm lg:grid-cols-2" onSubmit={handleSubmit}>
      <Input name="name" defaultValue={client.name} placeholder="Nombre completo o razon social" required />
      <Input name="nit" defaultValue={client.nit ?? ''} placeholder="NIT" />
      <Input name="dpi" defaultValue={client.dpi ?? ''} placeholder="DPI" />
      <Input name="email" type="email" defaultValue={client.email ?? ''} placeholder="Correo" />
      <Input name="phone" defaultValue={client.phone ?? ''} placeholder="Telefono" />
      <Input name="address" defaultValue={client.address ?? ''} placeholder="Direccion" />
      <textarea
        name="notes"
        defaultValue={client.notes ?? ''}
        className="min-h-24 rounded-md border bg-card px-3 py-2 text-sm shadow-sm luris-focus lg:col-span-2"
        placeholder="Observaciones"
      />
      {error ? <p className="rounded-md border bg-secondary px-3 py-2 text-sm text-destructive lg:col-span-2">{error}</p> : null}
      <div className="lg:col-span-2">
        <Button type="submit" disabled={submitting}>
          <Save className="h-4 w-4" /> {submitting ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  )
}
