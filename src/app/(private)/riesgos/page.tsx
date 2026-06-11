import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileWarning,
  ShieldAlert,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { riskDeadlines, riskOperatingRules, riskWorkflowTemplates } from '@/lib/mock-data'

const severityColor = {
  Critico: 'text-destructive',
  Alto: 'text-[#b08d57]',
  Medio: 'text-[#6d6258]',
  Controlado: 'text-[#53665b]',
} as const

const statusColor = {
  Bloqueado: 'text-destructive',
  'En preparacion': 'text-[#b08d57]',
  Listo: 'text-[#53665b]',
  'Sin confirmar': 'text-[#6d6258]',
} as const

const checklistColor = {
  Listo: 'bg-[#e7efe8] text-[#53665b]',
  Pendiente: 'bg-[#f6efe2] text-[#8a6c39]',
  Bloqueado: 'bg-[#f8e7e1] text-destructive',
  Revisar: 'bg-secondary text-[#6d6258]',
} as const

const metrics = [
  {
    label: 'Riesgos criticos',
    value: String(riskDeadlines.filter((risk) => risk.severity === 'Critico').length),
    helper: 'Requieren decision hoy',
    icon: ShieldAlert,
  },
  {
    label: 'Bloqueados',
    value: String(riskDeadlines.filter((risk) => risk.status === 'Bloqueado').length),
    helper: 'Falta soporte o confirmacion',
    icon: FileWarning,
  },
  {
    label: 'Proximas 72 horas',
    value: String(riskDeadlines.filter((risk) => risk.daysLeft <= 3).length),
    helper: 'Audiencias, firmas y vencimientos',
    icon: CalendarClock,
  },
  {
    label: 'Listos para cerrar',
    value: String(riskDeadlines.filter((risk) => risk.status === 'Listo').length),
    helper: 'Solo falta constancia o cierre',
    icon: CheckCircle2,
  },
]

export default function RisksPage() {
  const criticalRisks = riskDeadlines.filter((risk) => risk.severity === 'Critico' || risk.status === 'Bloqueado')

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Centro de control</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Riesgos y vencimientos</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Control operativo para plazos judiciales, firmas notariales, entregas documentales y bloqueos del equipo.
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
          <Link href="/plantillas" className="flex items-center gap-2 font-semibold text-primary luris-focus">
            Ver plantillas de tareas <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
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

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <AlertTriangle className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
            <CardTitle>Tablero de vencimientos</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="py-3">Asunto</th>
                  <th>Fecha</th>
                  <th>Area</th>
                  <th>Riesgo</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                  <th>Accion siguiente</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {riskDeadlines.map((risk) => (
                  <tr key={risk.id} className="align-top">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-primary">{risk.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{risk.matter}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{risk.clientName}</p>
                    </td>
                    <td className="pr-4">
                      <p className="font-semibold text-primary">{risk.dueDate}</p>
                      <p className="text-xs text-muted-foreground">{risk.dueTime} · {risk.daysLeft} dias</p>
                    </td>
                    <td className="pr-4">{risk.area}</td>
                    <td className={`pr-4 font-semibold ${severityColor[risk.severity]}`}>{risk.severity}</td>
                    <td className={`pr-4 font-semibold ${statusColor[risk.status]}`}>{risk.status}</td>
                    <td className="pr-4">
                      <p className="font-medium text-primary">{risk.owner}</p>
                      <p className="text-xs text-muted-foreground">Suplente: {risk.backupOwner}</p>
                    </td>
                    <td className="max-w-[260px] pr-4 text-muted-foreground">{risk.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ShieldAlert className="h-4 w-4 text-destructive" aria-hidden="true" />
              <CardTitle>Bloqueos a resolver</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalRisks.map((risk) => (
                <div key={risk.id} className="rounded-md border bg-secondary p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{risk.title}</p>
                    <span className={`text-xs font-semibold ${severityColor[risk.severity]}`}>{risk.severity}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{risk.owner} · {risk.dueDate} {risk.dueTime}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{risk.blocker}</p>
                  <p className="mt-2 text-xs font-semibold text-primary">{risk.escalation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ClipboardList className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Reglas operativas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {riskOperatingRules.map((rule) => (
                <p key={rule} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{rule}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {riskDeadlines.slice(0, 4).map((risk) => (
          <Card key={risk.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{risk.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{risk.source}</p>
                </div>
                <span className={`text-sm font-semibold ${statusColor[risk.status]}`}>{risk.status}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                {risk.checklist.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border bg-card px-3 py-2">
                    <span className="min-w-0 text-sm text-muted-foreground">{item.label}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${checklistColor[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                {risk.nextAction} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {riskWorkflowTemplates.map((flow) => (
          <Card key={flow.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
                <CardTitle>{flow.title}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">{flow.trigger}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {flow.steps.map((step, index) => (
                <div key={step.label} className="rounded-md border bg-secondary p-3">
                  <p className="text-sm font-semibold text-primary">{index + 1}. {step.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{step.owner} · {step.due}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{step.control}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
