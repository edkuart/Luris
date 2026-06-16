import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  FileText,
  FolderPlus,
  GitBranch,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { caseCreationWizard, caseTaskTemplates, clients } from '@/lib/mock-data'

const selectedTemplate = caseTaskTemplates.find((template) => template.id === caseCreationWizard.selectedTemplateId) ?? caseTaskTemplates[0]

const statusColor = {
  Completo: 'bg-[#e7efe8] text-[#53665b]',
  Listo: 'bg-[#e7efe8] text-[#53665b]',
  Pendiente: 'bg-[#f6efe2] text-[#8a6c39]',
  Revisar: 'bg-secondary text-[#6d6258]',
} as const

const severityColor = {
  Alto: 'text-destructive',
  Medio: 'text-[#b08d57]',
  Controlado: 'text-[#53665b]',
} as const

const flowSteps = [
  { label: 'Cliente', value: caseCreationWizard.selectedClientName, icon: Users },
  { label: 'Plantilla', value: selectedTemplate.title, icon: GitBranch },
  { label: 'Tareas', value: `${selectedTemplate.generatedTasks.length} tareas iniciales`, icon: ClipboardList },
  { label: 'Riesgos', value: `${caseCreationWizard.generatedRisks.length} controles`, icon: AlertTriangle },
  { label: 'Activacion', value: 'Revision final pendiente', icon: ShieldCheck },
]

export default function NewCasePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <Link href="/juicios" className="inline-flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a juicios
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Asistente operativo</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Nuevo expediente desde plantilla</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Simulacion del flujo principal: seleccionar cliente, elegir plantilla, confirmar responsables y previsualizar tareas, documentos y riesgos.
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
          Borrador: <span className="font-semibold text-primary">{caseCreationWizard.draftCaseNumber}</span>
        </div>
      </div>

      <section className="grid gap-3 lg:grid-cols-5">
        {flowSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card key={step.label}>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span>
                </div>
                <p className="mt-4 text-sm font-semibold text-primary">{step.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FolderPlus className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Datos de apertura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {caseCreationWizard.intakeFields.map((field) => (
                <div key={field.label} className="rounded-md border bg-secondary p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{field.label}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor[field.status]}`}>{field.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{field.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-md border bg-card p-4">
              <p className="text-sm font-semibold text-primary">Motivo de apertura</p>
              <p className="mt-2 text-sm text-muted-foreground">{caseCreationWizard.openingReason}</p>
              <p className="mt-3 text-sm text-muted-foreground">{caseCreationWizard.courtOrArea}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Users className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Clientes sugeridos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clients.slice(0, 4).map((client) => (
                <div
                  key={client.id}
                  className={`rounded-md border p-3 ${client.id === caseCreationWizard.selectedClientId ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                >
                  <p className="text-sm font-semibold">{client.name}</p>
                  <p className={client.id === caseCreationWizard.selectedClientId ? 'text-xs text-primary-foreground/80' : 'text-xs text-muted-foreground'}>
                    {client.type} · {client.activeCases} expedientes
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Scale className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Responsables</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-secondary p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Abogado</p>
                <p className="mt-1 text-sm font-semibold text-primary">{caseCreationWizard.responsible}</p>
              </div>
              <div className="rounded-md bg-secondary p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Secretaria</p>
                <p className="mt-1 text-sm font-semibold text-primary">{caseCreationWizard.secretary}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <GitBranch className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Plantilla aplicada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {caseTaskTemplates.map((template) => (
              <div
                key={template.id}
                className={`rounded-md border p-3 ${template.id === selectedTemplate.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              >
                <p className="text-sm font-semibold">{template.title}</p>
                <p className={template.id === selectedTemplate.id ? 'mt-1 text-xs text-primary-foreground/80' : 'mt-1 text-xs text-muted-foreground'}>
                  {template.area} · {template.generatedTasks.length} tareas · {template.requiredDocuments.length} documentos
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <ClipboardList className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Tareas que se generarian</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="py-3">Tarea</th>
                  <th>Rol</th>
                  <th>Vence</th>
                  <th>Prioridad</th>
                  <th>Fuente</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {selectedTemplate.generatedTasks.map((task) => (
                  <tr key={task.title}>
                    <td className="py-4 pr-4 font-semibold text-primary">{task.title}</td>
                    <td className="pr-4">{task.ownerRole}</td>
                    <td className="pr-4">{task.dueOffset}</td>
                    <td className="pr-4">{task.priority}</td>
                    <td className="text-muted-foreground">Plantilla {selectedTemplate.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <BriefcaseBusiness className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Hitos iniciales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {caseCreationWizard.generatedMilestones.map((milestone) => (
              <div key={milestone.title} className="rounded-md border bg-secondary p-3">
                <p className="text-sm font-semibold text-primary">{milestone.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{milestone.owner} · {milestone.due}</p>
                <p className="mt-2 text-sm text-muted-foreground">{milestone.source}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <AlertTriangle className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
            <CardTitle>Riesgos creados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {caseCreationWizard.generatedRisks.map((risk) => (
              <div key={risk.title} className="rounded-md border bg-secondary p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{risk.title}</p>
                  <span className={`text-xs font-semibold ${severityColor[risk.severity]}`}>{risk.severity}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{risk.owner} · {risk.due}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FileText className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Documentos solicitados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {caseCreationWizard.documentBuckets.map((bucket) => (
              <div key={bucket.title} className="rounded-md border bg-secondary p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{bucket.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor[bucket.status]}`}>{bucket.status}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bucket.documents.map((document) => (
                    <span key={document} className="rounded-full bg-card px-2 py-1 text-xs font-medium text-muted-foreground">{document}</span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <ShieldCheck className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
          <CardTitle>Revision antes de crear</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-3">
          {caseCreationWizard.reviewSteps.map((step) => (
            <div key={step.title} className="rounded-md border bg-secondary p-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#53665b]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-primary">{step.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{step.owner}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 rounded-md border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Resultado esperado</p>
          <p className="text-sm text-muted-foreground">Crear expediente, tareas, documentos requeridos, hitos y riesgos vinculados a la organizacion.</p>
        </div>
        <Link href="/revision" className="flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
          Enviar a revision del principal <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
