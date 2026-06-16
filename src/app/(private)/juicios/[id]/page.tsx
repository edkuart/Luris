import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  FileArchive,
  FileText,
  Landmark,
  MessageSquareText,
  Rows3,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { caseFiles, caseTimeline, documents, hearings, tasks } from '@/lib/mock-data'

const tabs = [
  { label: 'Resumen', icon: Rows3 },
  { label: 'Documentos', icon: FileArchive },
  { label: 'Tareas', icon: ClipboardList },
  { label: 'Calendario', icon: CalendarDays },
  { label: 'Linea de tiempo', icon: FileText },
  { label: 'Notas', icon: MessageSquareText },
]

export default async function CaseFileDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const caseFile = caseFiles.find((item) => item.id === id)
  if (!caseFile) notFound()

  const relatedDocuments = documents.filter((document) => document.caseNumber === caseFile.caseNumber)
  const relatedTasks = tasks.filter((task) => task.caseNumber === caseFile.caseNumber)
  const relatedHearings = hearings.filter((event) => event.caseNumber === caseFile.caseNumber)

  return (
    <div className="space-y-5">
      <Link href="/juicios" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a juicios
      </Link>

      <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">{caseFile.caseNumber}</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">{caseFile.title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{caseFile.description}</p>
        </div>
        <span className="w-fit rounded-full border bg-secondary px-3 py-1 text-sm font-semibold text-[#53665b]">{caseFile.status}</span>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Cliente</CardTitle></CardHeader>
          <CardContent><p className="text-lg font-semibold text-primary">{caseFile.clientName}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Juzgado / area</CardTitle></CardHeader>
          <CardContent><p className="text-sm font-semibold text-primary">{caseFile.court}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Responsable</CardTitle></CardHeader>
          <CardContent><p className="text-lg font-semibold text-primary">{caseFile.responsible}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Fecha clave</CardTitle></CardHeader>
          <CardContent><p className="text-lg font-semibold text-primary">{caseFile.importantDate}</p></CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="grid gap-2 pt-5 sm:grid-cols-2 lg:grid-cols-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <div key={tab.label} className="flex h-14 items-center gap-3 rounded-md border bg-secondary px-3">
                <Icon className="h-4 w-4 shrink-0 text-[#53665b]" />
                <span className="text-sm font-semibold">{tab.label}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Landmark className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Resumen del expediente</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
              <p><span className="font-semibold text-primary">Tipo:</span> {caseFile.type}</p>
              <p><span className="font-semibold text-primary">Estado:</span> {caseFile.status}</p>
              <p><span className="font-semibold text-primary">Tareas abiertas:</span> {caseFile.tasksOpen}</p>
              <p><span className="font-semibold text-primary">Documentos:</span> {caseFile.documentsCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileArchive className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Documentos del expediente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedDocuments.length ? (
                relatedDocuments.map((document) => (
                  <div key={document.id} className="rounded-md border bg-secondary p-3">
                    <Link href={`/documentos/${document.id}`} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                      {document.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">v{document.version} · {document.uploadedBy} · {document.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sin documentos asociados en el mock actual.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ClipboardList className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Tareas y seguimiento</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {relatedTasks.length ? (
                relatedTasks.map((task) => (
                  <div key={task.id} className="rounded-md border bg-secondary p-3">
                    <p className="text-sm font-semibold text-primary">{task.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{task.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{task.assignedTo} · {task.dueDate} · {task.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sin tareas asociadas en el mock actual.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <CalendarDays className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Calendario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedHearings.length ? (
                relatedHearings.map((event) => (
                  <div key={event.id} className="rounded-md bg-secondary p-3">
                    <p className="text-sm font-semibold text-primary">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} · {event.time} · {event.location}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sin eventos asociados en el mock actual.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Linea de tiempo</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {caseTimeline.map((item) => (
                <div key={item.label} className="border-l-2 border-[#b08d57] pl-3">
                  <p className="text-sm font-semibold text-primary">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.date} · {item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notas internas</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Validar documentos antes de presentacion o firma.</p>
              <p>Registrar toda comunicacion relevante en timeline auditable.</p>
              <p>Evitar eliminaciones definitivas; usar baja logica futura.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
