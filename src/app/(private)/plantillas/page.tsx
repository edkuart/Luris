import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  FileText,
  GitBranch,
  ShieldCheck,
  Timer,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { caseTaskTemplates, templateOperatingRules } from '@/lib/mock-data'

const riskColor = {
  Alto: 'text-destructive',
  Medio: 'text-[#b08d57]',
  Controlado: 'text-[#53665b]',
} as const

const priorityColor = {
  Alta: 'text-destructive',
  Media: 'text-[#b08d57]',
  Normal: 'text-[#53665b]',
} as const

const totalGeneratedTasks = caseTaskTemplates.reduce((sum, template) => sum + template.generatedTasks.length, 0)
const totalDocuments = caseTaskTemplates.reduce((sum, template) => sum + template.requiredDocuments.length, 0)

const metrics = [
  {
    label: 'Plantillas activas',
    value: String(caseTaskTemplates.length),
    helper: 'Civil, familia, laboral, notarial y documental',
    icon: GitBranch,
  },
  {
    label: 'Tareas generables',
    value: String(totalGeneratedTasks),
    helper: 'Con responsable y prioridad',
    icon: ClipboardList,
  },
  {
    label: 'Controles documentales',
    value: String(totalDocuments),
    helper: 'Checklist previo al cierre',
    icon: FileText,
  },
  {
    label: 'Plantillas de alto riesgo',
    value: String(caseTaskTemplates.filter((template) => template.riskLevel === 'Alto').length),
    helper: 'Enlazan con riesgos y vencimientos',
    icon: ShieldCheck,
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Flujos reutilizables</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Plantillas de tareas por expediente</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Base operativa para iniciar expedientes con fases, responsables, documentos requeridos, controles y riesgos.
          </p>
        </div>
        <Link href="/juicios/nuevo" className="rounded-md border bg-card px-4 py-3 text-sm font-semibold text-primary luris-focus">
          Crear expediente con plantilla
        </Link>
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
            <BriefcaseBusiness className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Catalogo de plantillas</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="py-3">Plantilla</th>
                  <th>Tipo</th>
                  <th>Area</th>
                  <th>Riesgo</th>
                  <th>Responsable</th>
                  <th>Duracion</th>
                  <th>Disparador</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {caseTaskTemplates.map((template) => (
                  <tr key={template.id} className="align-top">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-primary">{template.title}</p>
                      <p className="mt-1 max-w-[280px] text-xs text-muted-foreground">{template.objective}</p>
                    </td>
                    <td className="pr-4">{template.caseType}</td>
                    <td className="pr-4">{template.area}</td>
                    <td className={`pr-4 font-semibold ${riskColor[template.riskLevel]}`}>{template.riskLevel}</td>
                    <td className="pr-4">{template.recommendedOwner}</td>
                    <td className="pr-4">{template.estimatedDuration}</td>
                    <td className="max-w-[260px] pr-4 text-muted-foreground">{template.trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ShieldCheck className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Reglas de aplicacion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {templateOperatingRules.map((rule) => (
                <p key={rule} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{rule}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Timer className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
              <CardTitle>Aplicacion sugerida</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">Al crear expediente</p>
                <p className="mt-1 text-sm text-muted-foreground">Seleccionar plantilla, confirmar responsable y generar tareas iniciales.</p>
              </div>
              <div className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">Al recibir audiencia o firma</p>
                <p className="mt-1 text-sm text-muted-foreground">Crear riesgo, completar checklist y activar recordatorios de preparacion.</p>
              </div>
              <div className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">Al cerrar fase</p>
                <p className="mt-1 text-sm text-muted-foreground">Exigir documentos, control de auditoria y siguiente paso del expediente.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {caseTaskTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{template.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{template.caseType}</p>
                </div>
                <span className={`text-sm font-semibold ${riskColor[template.riskLevel]}`}>{template.riskLevel}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 lg:grid-cols-3">
                {template.stages.map((stage, index) => (
                  <div key={stage.title} className="rounded-md border bg-secondary p-3">
                    <p className="text-sm font-semibold text-primary">{index + 1}. {stage.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stage.responsible} · {stage.due}</p>
                    <div className="mt-3 space-y-2">
                      {stage.tasks.map((task) => (
                        <div key={task} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#53665b]" aria-hidden="true" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                <div className="rounded-md border bg-card p-3">
                  <p className="text-sm font-semibold text-primary">Tareas que genera</p>
                  <div className="mt-3 space-y-2">
                    {template.generatedTasks.map((task) => (
                      <div key={task.title} className="flex items-start justify-between gap-3 border-b pb-2 last:border-b-0 last:pb-0">
                        <div>
                          <p className="text-sm text-muted-foreground">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.ownerRole} · {task.dueOffset}</p>
                        </div>
                        <span className={`shrink-0 text-xs font-semibold ${priorityColor[task.priority]}`}>{task.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border bg-card p-3">
                  <p className="text-sm font-semibold text-primary">Documentos y controles</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {template.requiredDocuments.map((document) => (
                      <span key={document} className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                        {document}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    {template.auditControls.map((control) => (
                      <div key={control} className="flex gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#53665b]" aria-hidden="true" />
                        <span>{control}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-primary">
                {template.handoff} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
