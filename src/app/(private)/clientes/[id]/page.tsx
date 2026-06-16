import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BriefcaseBusiness, FileSignature } from 'lucide-react'
import { ClientEditForm } from '@/components/clients/client-edit-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { apiFetch } from '@/lib/api'
import { caseFiles, clients as mockClients, notarialInstruments } from '@/lib/mock-data'
import { requireSession } from '@/server/auth/session'

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession()
  const { id } = await params

  const mockClient = mockClients.find((item) => item.id === id)

  const client =
    process.env.AUTH_MODE === 'mock' && mockClient
      ? {
          id: mockClient.id,
          name: mockClient.name,
          dpi: mockClient.dpi === '-' ? null : mockClient.dpi,
          nit: mockClient.nit,
          email: mockClient.email,
          phone: mockClient.phone,
          address: mockClient.address,
          notes: mockClient.notes,
          caseFiles: caseFiles
            .filter((cf) => cf.clientId === mockClient.id)
            .map((cf) => ({
              id: cf.id,
              title: cf.title,
              caseNumber: cf.caseNumber,
              court: cf.court,
              status: cf.status,
            })),
        }
      : await apiFetch(`/api/clients/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => d?.client ?? null)

  if (!client) notFound()

  const notarialItems = notarialInstruments.filter((instrument) => instrument.clientName === client.name)

  return (
    <div className="space-y-5">
      <Link href="/clientes" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a personas
      </Link>

      <div>
        <h1 className="luris-display text-3xl font-bold text-primary">{client.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Persona con expedientes de juicio e instrumentos notariales asociados.</p>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
        <Card>
          <CardHeader><CardTitle>Datos del cliente</CardTitle></CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <p><span className="font-semibold text-primary">DPI:</span> {client.dpi ?? '-'}</p>
            <p><span className="font-semibold text-primary">NIT:</span> {client.nit ?? '-'}</p>
            <p><span className="font-semibold text-primary">Correo:</span> {client.email ?? '-'}</p>
            <p><span className="font-semibold text-primary">Telefono:</span> {client.phone ?? '-'}</p>
            <p><span className="font-semibold text-primary">Direccion:</span> {client.address ?? '-'}</p>
            <p><span className="font-semibold text-primary">Observaciones:</span> {client.notes ?? '-'}</p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Editar cliente</CardTitle></CardHeader>
            <CardContent>
              <ClientEditForm client={client} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <BriefcaseBusiness className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Juicios asociados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {client.caseFiles.length ? (
                client.caseFiles.map((cf: { id: string; title: string; caseNumber: string | null; court: string | null; status: string }) => (
                  <Link key={cf.id} href={`/juicios/${cf.id}`} className="block rounded-md border bg-secondary p-3 transition-colors hover:border-[#b08d57]">
                    <p className="text-sm font-semibold text-primary">{cf.caseNumber ?? 'Sin numero'} · {cf.title}</p>
                    <p className="text-xs text-muted-foreground">{cf.court ?? 'Sin juzgado'} · {cf.status}</p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Esta persona aun no tiene juicios asociados.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileSignature className="h-4 w-4 text-[#b08d57]" />
              <CardTitle>Escrituras asociadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notarialItems.length ? (
                notarialItems.map((instrument) => (
                  <Link key={instrument.id} href={`/escrituras/${instrument.id}`} className="block rounded-md border bg-secondary p-3 transition-colors hover:border-[#b08d57]">
                    <p className="text-sm font-semibold text-primary">{instrument.protocolNumber} · {instrument.title}</p>
                    <p className="text-xs text-muted-foreground">{instrument.type} · {instrument.status}</p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Esta persona aun no comparece en escrituras.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
