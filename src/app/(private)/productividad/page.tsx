import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  ClipboardList,
  FileWarning,
  Gauge,
  Scale,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  hearings,
  notarialAppointments,
  notarialInstruments,
  productivityAlerts,
  productivityQueues,
  riskDeadlines,
  tasks,
  teamWorkload,
} from '@/lib/mock-data'

const loadColor = {
  Normal: 'text-[#53665b]',
  Alta: 'text-[#b08d57]',
  Critica: 'text-destructive',
} as const

const severityColor = {
  Normal: 'text-[#53665b]',
  Media: 'text-[#b08d57]',
  Alta: 'text-destructive',
} as const

const metrics = [
  { label: 'Carga total abierta', value: String(teamWorkload.reduce((sum, member) => sum + member.openTasks, 0)), helper: 'Tareas activas del equipo', icon: ClipboardList },
  { label: 'Alertas criticas', value: String(productivityAlerts.filter((alert) => alert.severity === 'Alta').length), helper: 'Requieren atencion hoy', icon: AlertTriangle },
  { label: 'Instrumentos pendientes', value: String(notarialInstruments.filter((item) => item.status !== 'Archivado').length), helper: 'Protocolo y documentos', icon: Scale },
  { label: 'Agenda proxima', value: String(hearings.length + notarialAppointments.length), helper: 'Audiencias y citas', icon: CalendarClock },
]

export default function ProductivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Productividad del despacho</p>
        <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Carga de trabajo y alertas operativas</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Vista ejecutiva para coordinar abogados, secretarias, notario, vencimientos, documentos y citas.
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
              <CardContent>
                <p className="text-3xl font-bold text-primary">{metric.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.helper}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Users className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Carga por miembro del equipo</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr><th className="py-3">Equipo</th><th>Rol</th><th>Casos</th><th>Tareas</th><th>Vencidas</th><th>Notarial</th><th>Carga</th></tr>
              </thead>
              <tbody className="divide-y">
                {teamWorkload.map((member) => (
                  <tr key={member.id}>
                    <td className="py-4">
                      <p className="font-semibold text-primary">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.nextDeadline}</p>
                    </td>
                    <td>{member.role}</td>
                    <td>{member.activeCases}</td>
                    <td>{member.openTasks}</td>
                    <td>{member.overdueTasks}</td>
                    <td>{member.notarialItems}</td>
                    <td><span className={`font-semibold ${loadColor[member.load]}`}>{member.load}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileWarning className="h-4 w-4 text-[#b08d57]" />
              <CardTitle>Alertas operativas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {productivityAlerts.map((alert) => (
                <div key={alert.title} className="rounded-md border bg-secondary p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{alert.title}</p>
                    <span className={`text-xs font-semibold ${severityColor[alert.severity]}`}>{alert.severity}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{alert.area} · {alert.owner}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{alert.detail}</p>
                </div>
              ))}
              <Link href="/riesgos" className="flex items-center gap-2 pt-1 text-sm font-semibold text-primary luris-focus">
                Ver matriz de riesgos ({riskDeadlines.filter((risk) => risk.status === 'Bloqueado').length} bloqueados)
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {productivityQueues.map((queue) => (
          <Card key={queue.label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">{queue.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{queue.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{queue.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <BriefcaseBusiness className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Tareas prioritarias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.filter((task) => task.status !== 'Completada').map((task) => (
              <div key={task.id} className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.assignedTo} · {task.dueDate} · {task.priority}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CalendarClock className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Agenda judicial proxima</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hearings.slice(0, 3).map((event) => (
              <div key={event.id} className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date} · {event.time} · {event.responsible}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Gauge className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Citas notariales proximas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notarialAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">{appointment.title}</p>
                <p className="text-xs text-muted-foreground">{appointment.date} · {appointment.time} · {appointment.responsible}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
