import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileWarning,
  Gavel,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { firmProfile, principalReviewPolicies, principalReviewQueue } from '@/lib/mock-data'

const priorityColor = {
  Alta: 'text-destructive',
  Media: 'text-[#b08d57]',
  Normal: 'text-[#53665b]',
} as const

const statusColor = {
  Pendiente: 'text-[#b08d57]',
  Observado: 'text-destructive',
  'Listo para aprobar': 'text-[#53665b]',
} as const

const evidenceColor = {
  Completo: 'bg-[#e7efe8] text-[#53665b]',
  Pendiente: 'bg-[#f6efe2] text-[#8a6c39]',
  Revisar: 'bg-secondary text-[#6d6258]',
} as const

const sourceIcon = {
  Expediente: ClipboardCheck,
  Documento: FileCheck2,
  Riesgo: AlertTriangle,
  Notarial: Gavel,
  'Tarea critica': FileWarning,
} as const

const metrics = [
  {
    label: 'Pendientes de revision',
    value: String(principalReviewQueue.filter((item) => item.status !== 'Listo para aprobar').length),
    helper: 'Requieren decision del principal',
    icon: ClipboardCheck,
  },
  {
    label: 'Alta prioridad',
    value: String(principalReviewQueue.filter((item) => item.priority === 'Alta').length),
    helper: 'Plazos o firmas cercanas',
    icon: AlertTriangle,
  },
  {
    label: 'Listos para aprobar',
    value: String(principalReviewQueue.filter((item) => item.status === 'Listo para aprobar').length),
    helper: 'Sin bloqueos criticos',
    icon: CheckCircle2,
  },
  {
    label: 'Con observaciones',
    value: String(principalReviewQueue.filter((item) => item.status === 'Observado').length),
    helper: 'Necesitan cambios o bloqueo',
    icon: FileWarning,
  },
]

export default function PrincipalReviewPage() {
  const nextItem = principalReviewQueue[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Control del Licenciado Principal</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Bandeja de revision y aprobaciones</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Vista para aprobar expedientes, documentos, tareas criticas y actos notariales antes de activarlos, presentarlos o cerrarlos.
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
          Revisor: <span className="font-semibold text-primary">{firmProfile.principal}</span>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
                <Icon className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{metric.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.helper}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <ClipboardCheck className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Cola de revision</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="py-3">Solicitud</th>
                  <th>Origen</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Solicitado por</th>
                  <th>Vence</th>
                  <th>Decision sugerida</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {principalReviewQueue.map((item) => {
                  const Icon = sourceIcon[item.source]
                  return (
                    <tr key={item.id} className="align-top">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-primary">{item.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.matter}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.clientName}</p>
                      </td>
                      <td className="pr-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
                          <span>{item.source}</span>
                        </div>
                      </td>
                      <td className={`pr-4 font-semibold ${priorityColor[item.priority]}`}>{item.priority}</td>
                      <td className={`pr-4 font-semibold ${statusColor[item.status]}`}>{item.status}</td>
                      <td className="pr-4">
                        <p>{item.requestedBy}</p>
                        <p className="text-xs text-muted-foreground">{item.submittedAt}</p>
                      </td>
                      <td className="pr-4">{item.dueAt}</td>
                      <td className="font-semibold text-primary">{item.decision}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Clock3 className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
              <CardTitle>Siguiente decision</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-secondary p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">{nextItem.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{nextItem.matter}</p>
                  </div>
                  <span className={`text-xs font-semibold ${priorityColor[nextItem.priority]}`}>{nextItem.priority}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{nextItem.summary}</p>
                <p className="mt-3 text-sm font-semibold text-primary">{nextItem.decision}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ShieldCheck className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Politicas de aprobacion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {principalReviewPolicies.map((policy) => (
                <div key={policy.title} className="rounded-md border bg-secondary p-3">
                  <p className="text-sm font-semibold text-primary">{policy.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{policy.appliesTo}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{policy.rule}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {principalReviewQueue.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
                </div>
                <span className={`shrink-0 text-sm font-semibold ${statusColor[item.status]}`}>{item.status}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.blockers.length > 0 ? (
                <div className="rounded-md border bg-[#fff7f3] p-3">
                  <p className="text-sm font-semibold text-primary">Bloqueos u observaciones</p>
                  <div className="mt-2 space-y-2">
                    {item.blockers.map((blocker) => (
                      <div key={blocker} className="flex gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" aria-hidden="true" />
                        <span>{blocker}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-md border bg-secondary p-3">
                  <p className="text-sm font-semibold text-primary">Sin bloqueos criticos</p>
                  <p className="mt-1 text-sm text-muted-foreground">Puede aprobarse si la evidencia final coincide con la entrega.</p>
                </div>
              )}

              <div className="grid gap-2 sm:grid-cols-2">
                {item.evidence.map((evidence) => (
                  <div key={evidence.label} className="flex items-center justify-between gap-3 rounded-md border bg-card px-3 py-2">
                    <span className="text-sm text-muted-foreground">{evidence.label}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${evidenceColor[evidence.status]}`}>{evidence.status}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">Bitacora</p>
                <div className="mt-3 space-y-3">
                  {item.auditTrail.map((entry) => (
                    <div key={`${item.id}-${entry.time}-${entry.action}`} className="border-l-2 border-[#b08d57] pl-3">
                      <p className="text-xs font-semibold text-primary">{entry.time} · {entry.actor}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{entry.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardContent className="grid gap-3 pt-5 md:grid-cols-3">
          <div className="flex gap-3 rounded-md bg-secondary p-3">
            <UserCheck className="h-5 w-5 shrink-0 text-[#53665b]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">Responsabilidad clara</p>
              <p className="mt-1 text-sm text-muted-foreground">Cada item conserva solicitante, revisor y decision esperada.</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-md bg-secondary p-3">
            <FileCheck2 className="h-5 w-5 shrink-0 text-[#53665b]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">Evidencia verificable</p>
              <p className="mt-1 text-sm text-muted-foreground">La aprobacion depende de documentos, version y checklist.</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-md bg-secondary p-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#53665b]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">Auditoria futura</p>
              <p className="mt-1 text-sm text-muted-foreground">Listo para registrar aprobaciones reales cuando vuelva la BD.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
