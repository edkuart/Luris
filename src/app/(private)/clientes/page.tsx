import { ClientCreateForm } from '@/components/clients/client-create-form'
import { PeopleDirectory } from '@/components/clients/people-directory'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPeopleDirectory, type DirectoryPerson } from '@/lib/mock-data'
import { requireSession } from '@/server/auth/session'
import { listClients } from '@/server/clients'

export default async function PersonasPage() {
  const session = await requireSession()

  // Directorio unificado de personas. En modo mock se deriva de los datos de
  // ejemplo (clientes + comparecientes). Con datos reales se listan los clientes
  // desde la DB; los comparecientes notariales se sumaran al crear su modulo.
  let people: DirectoryPerson[]
  if (process.env.AUTH_MODE === 'mock') {
    people = buildPeopleDirectory()
  } else {
    const clients = await listClients(session.organizationId)
    people = clients.map((client) => ({
      id: client.id,
      name: client.name,
      type: client.nit ? 'Cliente / sociedad' : 'Cliente',
      dpi: client.dpi,
      nit: client.nit,
      email: client.email,
      phone: client.phone,
      address: client.address,
      roles: ['Cliente'],
      juicios: client._count.caseFiles,
      escrituras: 0,
      href: `/clientes/${client.id}`,
    }))
  }

  const totalJuicios = people.filter((p) => p.juicios > 0).length
  const totalEscrituras = people.filter((p) => p.escrituras > 0).length

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="luris-display text-3xl font-bold text-primary">Personas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Directorio unico de clientes y comparecientes. {people.length} personas · {totalJuicios} en juicios · {totalEscrituras} en escrituras.
          </p>
        </div>
      </div>

      <ClientCreateForm />

      <Card>
        <CardHeader>
          <CardTitle>Directorio de personas</CardTitle>
        </CardHeader>
        <CardContent>
          <PeopleDirectory people={people} />
        </CardContent>
      </Card>
    </div>
  )
}
