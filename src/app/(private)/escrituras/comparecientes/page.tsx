import Link from 'next/link'
import { FileWarning, IdCard, ShieldCheck, UserRoundCheck, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notarialInstruments, notarialParties, notarialPartyRequirements } from '@/lib/mock-data'

const statusColor = {
  Completo: 'text-[#53665b]',
  'Documento pendiente': 'text-[#b08d57]',
  'Revisar representacion': 'text-destructive',
  Vigente: 'text-[#53665b]',
  Pendiente: 'text-[#b08d57]',
  Vencido: 'text-destructive',
  Revisar: 'text-destructive',
} as const

const metrics = [
  { label: 'Comparecientes', value: String(notarialParties.length), icon: Users },
  { label: 'Completos', value: String(notarialParties.filter((party) => party.status === 'Completo').length), icon: ShieldCheck },
  { label: 'Documentos pendientes', value: String(notarialParties.filter((party) => party.status === 'Documento pendiente').length), icon: FileWarning },
  { label: 'Representacion a revisar', value: String(notarialParties.filter((party) => party.status === 'Revisar representacion').length), icon: IdCard },
]

export default function NotarialPartiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Comparecientes notariales</p>
        <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Identidad, representacion y documentos</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Control visual de personas, sociedades, representantes y mandatarios vinculados a instrumentos notariales.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
                <Icon className="h-4 w-4 text-[#53665b]" />
              </CardHeader>
              <CardContent><p className="text-3xl font-bold text-primary">{metric.value}</p></CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <UserRoundCheck className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Registro de comparecientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notarialParties.map((party) => (
              <div key={party.id} className="rounded-lg border bg-secondary p-4">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                  <div>
                    <p className="font-semibold text-primary">{party.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{party.type} · {party.representation}</p>
                    <p className="mt-1 text-xs text-muted-foreground">DPI {party.dpi} · NIT {party.nit}</p>
                  </div>
                  <span className={`w-fit rounded-full border bg-card px-2 py-1 text-xs font-semibold ${statusColor[party.status]}`}>{party.status}</span>
                </div>
                <div className="mt-3 grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
                  <p>{party.phone}</p>
                  <p>{party.email}</p>
                  <p className="md:col-span-2">{party.address}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {party.instruments.map((instrumentId) => {
                    const instrument = notarialInstruments.find((item) => item.id === instrumentId)
                    return instrument ? (
                      <Link key={instrumentId} href={`/escrituras/${instrument.id}`} className="rounded-full border bg-card px-2 py-1 text-xs font-semibold text-primary underline-offset-4 hover:underline">
                        {instrument.deedNumber}
                      </Link>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader><CardTitle>Requisitos base</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {notarialPartyRequirements.map((requirement) => (
                <p key={requirement} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{requirement}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Alertas</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {notarialParties.flatMap((party) => party.alerts.map((alert) => ({ party: party.name, alert }))).length ? (
                notarialParties.flatMap((party) =>
                  party.alerts.map((alert) => (
                    <div key={`${party.id}-${alert}`} className="rounded-md border bg-secondary px-3 py-2">
                      <p className="text-sm font-semibold text-primary">{party.name}</p>
                      <p className="text-xs text-muted-foreground">{alert}</p>
                    </div>
                  )),
                )
              ) : (
                <p className="text-sm text-muted-foreground">Sin alertas pendientes.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {notarialParties.slice(0, 4).map((party) => (
          <Card key={party.id}>
            <CardHeader><CardTitle>Documentos · {party.name}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {party.documents.map((document) => (
                <div key={document.name} className="flex items-center justify-between gap-3 rounded-md border bg-secondary px-3 py-2">
                  <span className="text-sm text-muted-foreground">{document.name}</span>
                  <span className={`text-xs font-semibold ${statusColor[document.status]}`}>{document.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
