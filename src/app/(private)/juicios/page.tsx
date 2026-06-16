import Link from 'next/link'
import { AlertTriangle, BriefcaseBusiness, CalendarClock, ClipboardList } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { caseFiles, hearings, riskDeadlines } from '@/lib/mock-data'

const judicialRisks = riskDeadlines.filter((r) => r.area === 'Judicial')

const metrics = [
  { label: 'Expedientes activos', value: String(caseFiles.length), icon: BriefcaseBusiness },
  { label: 'Audiencias programadas', value: String(hearings.filter((h) => h.type === 'Audiencia').length), icon: CalendarClock },
  { label: 'Plazos criticos', value: String(judicialRisks.filter((r) => r.severity === 'Critico' || r.severity === 'Alto').length), icon: AlertTriangle },
  { label: 'Tareas abiertas', value: String(caseFiles.reduce((sum, c) => sum + c.tasksOpen, 0)), icon: ClipboardList },
]

// Etapas del proceso judicial guatemalteco (civil / familia / laboral / mercantil).
const pipelineStages = [
  { key: 'Demanda', label: 'Demanda', hint: 'Preparacion y presentacion' },
  { key: 'Emplazamiento', label: 'Emplazamiento', hint: 'Notificacion y plazo al demandado' },
  { key: 'Prueba/Audiencias', label: 'Prueba / Audiencias', hint: 'Conciliacion, excepciones y prueba' },
  { key: 'Sentencia', label: 'Sentencia', hint: 'En espera o dictada' },
  { key: 'Impugnacion', label: 'Impugnacion', hint: 'Apelacion: 3 dias desde notificacion' },
] as const

export default function JuiciosResumenPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
                <Icon className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              </CardHeader>
              <CardContent><p className="text-3xl font-bold text-primary">{metric.value}</p></CardContent>
            </Card>
          )
        })}
      </section>

      {/* Pipeline por etapa procesal — centro del workspace */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="luris-display text-lg font-bold text-primary">Expedientes por etapa procesal</h2>
          <p className="text-xs text-muted-foreground">Demanda → emplazamiento → prueba → sentencia → impugnacion</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          {pipelineStages.map((stage) => {
            const items = caseFiles.filter((c) => c.stage === stage.key)
            return (
              <div key={stage.key} className="flex flex-col rounded-lg border bg-secondary/60">
                <div className="border-b px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-primary">{stage.label}</p>
                    <span className="rounded-full border bg-card px-2 py-0.5 text-xs font-semibold text-[#53665b]">{items.length}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{stage.hint}</p>
                </div>
                <div className="flex-1 space-y-2 p-2">
                  {items.length === 0 && <p className="px-1 py-3 text-center text-xs text-muted-foreground">Sin expedientes</p>}
                  {items.map((caseFile) => (
                    <Link
                      key={caseFile.id}
                      href={`/juicios/${caseFile.id}`}
                      className="block rounded-md border bg-card p-3 transition-colors hover:border-[#b08d57] hover:shadow-sm luris-focus"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">{caseFile.caseNumber}</p>
                      <p className="mt-1 text-sm font-semibold text-primary">{caseFile.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{caseFile.clientName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{caseFile.type}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CalendarClock className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Proximas audiencias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hearings.map((event) => (
              <div key={event.id} className="rounded-md border bg-secondary p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-primary">{event.title}</p>
                  <span className="shrink-0 rounded-full border bg-card px-2 py-0.5 text-xs font-semibold text-[#53665b]">{event.type}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{event.date} · {event.time} · {event.court}</p>
                <p className="mt-1 text-xs text-muted-foreground">{event.caseNumber} · {event.responsible}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <AlertTriangle className="h-4 w-4 text-[#b08d57]" />
            <CardTitle>Plazos criticos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {judicialRisks.map((risk) => (
              <div key={risk.id} className="rounded-md border bg-secondary p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-primary">{risk.title}</p>
                  <span className="shrink-0 rounded-full border bg-card px-2 py-0.5 text-xs font-semibold text-[#b08d57]">{risk.severity}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{risk.matter}</p>
                <p className="mt-1 text-xs text-muted-foreground">Vence {risk.dueDate} {risk.dueTime} · {risk.daysLeft} dias · {risk.owner}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
