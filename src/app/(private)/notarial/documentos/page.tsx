import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  FileArchive,
  FileCheck2,
  FilePlus2,
  FileSignature,
  Send,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  notarialDocumentActions,
  notarialDocumentFlow,
  notarialDocumentStages,
  notarialInstruments,
} from '@/lib/mock-data'

const statusColor = {
  Pendiente: 'text-[#b08d57]',
  Recibido: 'text-[#53665b]',
  'En revision': 'text-[#b08d57]',
  Aprobado: 'text-[#53665b]',
  Emitido: 'text-[#53665b]',
  Entregado: 'text-[#53665b]',
} as const

const metrics = [
  { label: 'Documentos en flujo', value: String(notarialDocumentFlow.length), icon: FileArchive },
  { label: 'Pendientes', value: String(notarialDocumentFlow.filter((item) => item.status === 'Pendiente').length), icon: FilePlus2 },
  { label: 'En revision', value: String(notarialDocumentFlow.filter((item) => item.status === 'En revision').length), icon: FileSignature },
  { label: 'Aprobados/emitidos', value: String(notarialDocumentFlow.filter((item) => item.status === 'Aprobado' || item.status === 'Emitido').length), icon: FileCheck2 },
]

export default function NotarialDocumentsPage() {
  return (
    <div className="space-y-6">
      <Link href="/notarial" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a notarial
      </Link>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Documentos notariales</p>
        <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Recepcion, revision y emision</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Flujo visual para controlar documentos soporte, borradores, instrumentos firmados, testimonios y constancias de entrega.
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
              <CardContent><p className="text-3xl font-bold text-primary">{metric.value}</p></CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
        <Card>
          <CardHeader><CardTitle>Bandeja documental notarial</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="py-3">Documento</th>
                  <th>Instrumento</th>
                  <th>Categoria</th>
                  <th>Responsable</th>
                  <th>Actualizado</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {notarialDocumentFlow.map((document) => {
                  const instrument = notarialInstruments.find((item) => item.id === document.instrumentId)
                  return (
                    <tr key={document.id}>
                      <td className="py-4">
                        <p className="font-semibold text-primary">{document.name}</p>
                        <p className="text-xs text-muted-foreground">{document.nextAction}</p>
                      </td>
                      <td>
                        {instrument ? (
                          <Link href={`/notarial/${instrument.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                            {instrument.deedNumber}
                          </Link>
                        ) : '-'}
                      </td>
                      <td>{document.category}</td>
                      <td>{document.owner}</td>
                      <td>{document.updatedAt}</td>
                      <td><span className={`font-semibold ${statusColor[document.status]}`}>{document.status}</span></td>
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
              <CheckCircle2 className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Etapas del flujo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notarialDocumentStages.map((stage, index) => (
                <div key={stage.label} className="rounded-md border bg-secondary p-3">
                  <p className="text-sm font-semibold text-primary">{index + 1}. {stage.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stage.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Send className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Acciones disponibles</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              {notarialDocumentActions.map((action) => (
                <div key={action} className="rounded-md border bg-secondary px-3 py-2 font-semibold text-primary">{action}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
