import { ClientCreateForm } from '@/components/clients/client-create-form'
import { PeopleDirectory } from '@/components/clients/people-directory'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPeopleDirectory } from '@/lib/mock-data'
import { requireSession } from '@/server/auth/session'

export default async function PersonasPage() {
  await requireSession()

  // Directorio unificado: clientes de juicios + comparecientes de escrituras.
  // Hoy se deriva de los datos mock; al conectar backend se reemplaza por un
  // endpoint de personas con su involucramiento por pilar.
  const people = buildPeopleDirectory()

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
