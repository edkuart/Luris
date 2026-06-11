import Link from 'next/link'
import { BriefcaseBusiness, CalendarDays, FileText, ListChecks, MessageSquareText, Rows3, Upload } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { caseFiles, caseTimeline } from '@/lib/mock-data'

const tabs = [
  { label: 'Resumen', icon: Rows3 },
  { label: 'Documentos', icon: FileText },
  { label: 'Tareas', icon: ListChecks },
  { label: 'Calendario', icon: CalendarDays },
  { label: 'Linea de tiempo', icon: BriefcaseBusiness },
  { label: 'Notas', icon: MessageSquareText },
]

export default function ExpedientesPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="luris-display text-3xl font-bold text-primary">Expedientes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Casos por cliente, juzgado, tipo de proceso, estado y responsable.</p>
        </div>
        <Link href="/expedientes/nuevo" className={buttonVariants()}>
          <Upload className="h-4 w-4" /> Nuevo expediente
        </Link>
      </div>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)]">
        <Card>
          <CardHeader><CardTitle>Expedientes activos</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {caseFiles.map((caseFile) => (
              <div key={caseFile.id} className="rounded-lg border bg-secondary p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <Link href={`/expedientes/${caseFile.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                      {caseFile.caseNumber} | {caseFile.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">{caseFile.clientName}</p>
                  </div>
                  <span className="w-fit rounded-full border bg-card px-2 py-1 text-xs font-semibold text-[#53665b]">{caseFile.status}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{caseFile.court} · {caseFile.type}</p>
                <p className="mt-1 text-xs text-muted-foreground">Responsable: {caseFile.responsible} · {caseFile.tasksOpen} tareas · {caseFile.documentsCount} documentos</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card>
            <CardHeader><CardTitle>Vista individual preparada</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return <div key={tab.label} className="flex h-16 items-center gap-3 rounded-md border bg-card px-4"><Icon className="h-5 w-5 text-[#53665b]" /><span className="text-sm font-semibold">{tab.label}</span></div>
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Linea de tiempo ejemplo</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {caseTimeline.map((item) => (
                <div key={item.label} className="border-l-2 border-[#b08d57] pl-3">
                  <p className="text-sm font-semibold text-primary">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.date} · {item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
