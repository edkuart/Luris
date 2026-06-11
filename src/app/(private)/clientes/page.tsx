import Link from 'next/link'
import { Search } from 'lucide-react'
import { ClientCreateForm } from '@/components/clients/client-create-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { prisma } from '@/lib/prisma'
import { clients as mockClients } from '@/lib/mock-data'
import { requireSession } from '@/server/auth/session'

export default async function ClientesPage() {
  const session = await requireSession()
  const clients =
    process.env.AUTH_MODE === 'mock'
      ? mockClients.map((client) => ({
          id: client.id,
          name: client.name,
          dpi: client.dpi === '-' ? null : client.dpi,
          nit: client.nit,
          email: client.email,
          phone: client.phone,
          address: client.address,
          updatedAt: new Date('2026-06-11T12:00:00-06:00'),
          _count: { caseFiles: client.activeCases },
        }))
      : await prisma.client.findMany({
          where: { organizationId: session.organizationId },
          include: { _count: { select: { caseFiles: true } } },
          orderBy: { updatedAt: 'desc' },
        })

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="luris-display text-3xl font-bold text-primary">Clientes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Personas y sociedades con expedientes vinculados al despacho.</p>
        </div>
      </div>

      <ClientCreateForm />

      <Card>
        <CardHeader>
          <CardTitle>Registro de clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2 rounded-md border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" placeholder="Buscar por nombre, DPI, NIT, correo o expediente" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr><th className="py-3">Nombre</th><th>DPI</th><th>NIT</th><th>Telefono</th><th>Correo</th><th>Expedientes</th><th>Actualizado</th></tr>
              </thead>
              <tbody className="divide-y">
                {clients.map((client) => (
                  <tr key={client.id} className="align-middle">
                    <td className="py-4">
                      <Link href={`/clientes/${client.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                        {client.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{client.address ?? 'Sin direccion registrada'}</p>
                    </td>
                    <td>{client.dpi ?? '-'}</td>
                    <td>{client.nit ?? '-'}</td>
                    <td>{client.phone ?? '-'}</td>
                    <td>{client.email ?? '-'}</td>
                    <td>{client._count.caseFiles}</td>
                    <td className="text-muted-foreground">{client.updatedAt.toLocaleDateString('es-GT')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
