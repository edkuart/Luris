import Link from 'next/link'
import {
  AlertTriangle,
  FileSignature,
  LibraryBig,
  PenLine,
  ScrollText,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  notarialDocumentTypes,
  notarialIndexEntries,
  notarialInstruments,
  notarialWorkflow,
} from '@/lib/mock-data'

const metrics = [
  { label: 'Instrumentos en protocolo', value: String(notarialInstruments.length), icon: LibraryBig },
  { label: 'Pendientes de firma', value: String(notarialInstruments.filter((i) => i.status === 'Pendiente de firma').length), icon: FileSignature },
  { label: 'Actas y legalizaciones', value: '2', icon: PenLine },
  { label: 'Testimonios emitidos', value: '1', icon: ScrollText },
]

// Etapas reales del flujo notarial guatemalteco, mapeadas al estado del instrumento.
const pipelineStages = [
  { key: 'En preparacion', label: 'En preparacion', hint: 'Ingreso · revision documental · redaccion' },
  { key: 'Pendiente de firma', label: 'Pendiente de firma', hint: 'Cita de firma programada' },
  { key: 'Firmado', label: 'Firmado', hint: 'Aviso AGP: testimonio especial ≤ 25 dias habiles', alert: true },
  { key: 'Testimonio emitido', label: 'Testimonio / Entrega', hint: 'Emision y constancia de retiro' },
  { key: 'Archivado', label: 'Archivado', hint: 'Indice y soporte resguardado' },
] as const

export default function EscriturasResumenPage() {
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

      {/* Pipeline por etapa — centro del workspace */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="luris-display text-lg font-bold text-primary">Flujo de instrumentos por etapa</h2>
          <p className="text-xs text-muted-foreground">Arrastre conceptual: ingreso → firma → testimonio → entrega</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          {pipelineStages.map((stage) => {
            const items = notarialInstruments.filter((i) => i.status === stage.key)
            return (
              <div key={stage.key} className="flex flex-col rounded-lg border bg-secondary/60">
                <div className="border-b px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-primary">{stage.label}</p>
                    <span className="rounded-full border bg-card px-2 py-0.5 text-xs font-semibold text-[#53665b]">{items.length}</span>
                  </div>
                  <p className={`mt-1 flex items-start gap-1 text-[11px] ${'alert' in stage && stage.alert ? 'font-semibold text-[#b08d57]' : 'text-muted-foreground'}`}>
                    {'alert' in stage && stage.alert && <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />}
                    {stage.hint}
                  </p>
                </div>
                <div className="flex-1 space-y-2 p-2">
                  {items.length === 0 && <p className="px-1 py-3 text-center text-xs text-muted-foreground">Sin instrumentos</p>}
                  {items.map((instrument) => (
                    <Link
                      key={instrument.id}
                      href={`/escrituras/${instrument.id}`}
                      className="block rounded-md border bg-card p-3 transition-colors hover:border-[#b08d57] hover:shadow-sm luris-focus"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        {instrument.protocolNumber} · {instrument.deedNumber}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary">{instrument.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{instrument.clientName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{instrument.type}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Flujo notarial recomendado</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {notarialWorkflow.map((step, index) => (
              <div key={step.title} className="rounded-md border bg-secondary p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{index + 1}. {step.title}</p>
                  <span className="rounded-full border bg-card px-2 py-0.5 text-xs font-semibold text-[#53665b]">{step.status}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
                <p className="mt-2 text-xs text-muted-foreground">{step.owner} · {step.due}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Indice notarial preliminar</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {notarialIndexEntries.map((entry) => (
              <div key={`${entry.number}-${entry.act}`} className="border-b pb-3 last:border-b-0 last:pb-0">
                <p className="text-sm font-semibold text-primary">No. {entry.number} · {entry.act}</p>
                <p className="text-xs text-muted-foreground">{entry.date} · {entry.grantors}</p>
                <p className="mt-1 text-xs font-semibold text-[#53665b]">{entry.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Documentos requeridos</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {notarialDocumentTypes.map((document) => (
              <p key={document} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{document}</p>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
