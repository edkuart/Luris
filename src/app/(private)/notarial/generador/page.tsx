import Link from 'next/link'
import { ArrowLeft, ClipboardCheck, FileText, PenLine, Send, Wand2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notarialGeneratorActions, notarialGeneratorTemplates } from '@/lib/mock-data'

const statusColor = {
  Completo: 'text-[#53665b]',
  Pendiente: 'text-[#b08d57]',
  Revisar: 'text-destructive',
} as const

export default function NotarialGeneratorPage() {
  const activeTemplate = notarialGeneratorTemplates[0]

  return (
    <div className="space-y-6">
      <Link href="/notarial" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a notarial
      </Link>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Generador documental notarial</p>
        <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Plantillas, campos y borradores</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Flujo visual para seleccionar tipo de instrumento, validar campos obligatorios y preparar un borrador revisable.
        </p>
      </div>

      <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Wand2 className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Plantillas disponibles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notarialGeneratorTemplates.map((template) => (
              <div
                key={template.id}
                className={`rounded-md border p-3 ${template.id === activeTemplate.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              >
                <p className="text-sm font-semibold">{template.name}</p>
                <p className={`mt-1 text-xs ${template.id === activeTemplate.id ? 'text-[#eadfce]' : 'text-muted-foreground'}`}>
                  {template.instrumentType}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileText className="h-4 w-4 text-[#53665b]" />
              <CardTitle>{activeTemplate.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{activeTemplate.description}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {activeTemplate.requiredFields.map((field) => (
                  <div key={field.label} className="rounded-md border bg-secondary p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-primary">{field.label}</p>
                      <span className={`text-xs font-semibold ${statusColor[field.status]}`}>{field.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{field.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <ClipboardCheck className="h-4 w-4 text-[#53665b]" />
                <CardTitle>Clausulas base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {activeTemplate.clauses.map((clause, index) => (
                  <div key={clause} className="flex items-center gap-3 rounded-md border bg-secondary px-3 py-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-card text-xs font-bold text-primary">{index + 1}</span>
                    <span className="text-sm text-muted-foreground">{clause}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <PenLine className="h-4 w-4 text-[#53665b]" />
                <CardTitle>Previsualizacion de borrador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-64 rounded-md border bg-secondary p-5 text-sm leading-7 text-primary">
                  {activeTemplate.preview}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <Send className="h-4 w-4 text-[#53665b]" />
          <CardTitle>Acciones preparadas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          {notarialGeneratorActions.map((action) => (
            <div key={action} className="rounded-md border bg-secondary px-3 py-2 text-sm font-semibold text-primary">{action}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
