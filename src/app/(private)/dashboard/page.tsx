import Link from 'next/link'
import { AlertTriangle, ArrowRight, CalendarDays, FileText, Inbox, ListChecks, ShieldAlert, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  caseFiles,
  clients,
  dashboardAlerts,
  dashboardMetrics,
  documents,
  firmProfile,
  hearings,
  principalReviewQueue,
  riskDeadlines,
  tasks,
  workflowSteps,
} from '@/lib/mock-data'

export default function DashboardPage() {
  const priorityTasks = tasks.filter((task) => task.status !== 'Completada').slice(0, 3)
  const nextHearings = hearings.slice(0, 3)
  const recentDocuments = documents.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Panel privado · {firmProfile.name}</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Dashboard juridico</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Resumen operativo para expediente, agenda, documentos y tareas del despacho.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">Jueves, 11 de junio de 2026</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => {
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
          <CardHeader>
            <CardTitle>Flujo principal preparado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="flex gap-3 rounded-md border bg-secondary px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-card text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-primary">{index + 1}. {step.title}</p>
                      <span className="rounded-full border bg-card px-2 py-0.5 text-xs font-semibold text-[#53665b]">{step.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Responsable: {step.owner}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <AlertTriangle className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
              <CardTitle>Alertas importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {dashboardAlerts.map((alert) => (
                <p key={alert} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{alert}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clientes recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clients.slice(0, 4).map((client) => (
                <div key={client.id} className="rounded-md bg-secondary px-3 py-2">
                  <p className="truncate text-sm font-semibold text-primary">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.activeCases} expedientes · {client.lastActivity}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CalendarDays className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Proximas audiencias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextHearings.map((event) => (
              <div key={event.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <p className="text-sm font-semibold text-primary">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date} · {event.time} · {event.court}</p>
                <p className="text-xs text-muted-foreground">{event.caseNumber}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Users className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Tareas del equipo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityTasks.map((task) => (
              <div key={task.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{task.title}</p>
                  <span className="text-xs font-semibold text-[#b08d57]">{task.priority}</span>
                </div>
                <p className="text-sm text-muted-foreground">{task.assignedTo} · {task.dueDate}</p>
                <p className="text-xs text-muted-foreground">{task.caseNumber}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FileText className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Documentos recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDocuments.map((document) => (
              <div key={document.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <p className="text-sm font-semibold text-primary">{document.name}</p>
                <p className="text-sm text-muted-foreground">v{document.version} · {document.uploadedBy} · {document.uploadedAt}</p>
                <p className="text-xs text-muted-foreground">{document.caseNumber}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Siguiente expediente recomendado</p>
            <p className="text-sm text-muted-foreground">{caseFiles[0].title} · {caseFiles[0].court}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/riesgos" className="flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              {riskDeadlines.filter((risk) => risk.severity === 'Critico').length} riesgos criticos
            </Link>
            <Link href="/revision" className="flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
              <Inbox className="h-4 w-4" aria-hidden="true" />
              {principalReviewQueue.length} revisiones
            </Link>
            <Link href="/plantillas" className="flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
              <ListChecks className="h-4 w-4" aria-hidden="true" />
              Plantillas
            </Link>
            <Link href="/productividad" className="flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
              Abrir productividad <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
