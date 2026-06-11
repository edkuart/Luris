import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  FileArchive,
  FileSignature,
  ScrollText,
  UserRoundCheck,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notarialInstruments } from '@/lib/mock-data'

const statusStyles = {
  Completo: 'text-[#53665b]',
  Pendiente: 'text-[#b08d57]',
  Revisar: 'text-destructive',
  Recibido: 'text-[#53665b]',
  Borrador: 'text-[#b08d57]',
  Emitido: 'text-[#53665b]',
} as const

export default async function NotarialInstrumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const instrument = notarialInstruments.find((item) => item.id === id)
  if (!instrument) notFound()

  return (
    <div className="space-y-5">
      <Link href="/notarial" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a notarial
      </Link>

      <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {instrument.protocolNumber} · {instrument.deedNumber}
          </p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">{instrument.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{instrument.clientName} · {instrument.type}</p>
          <Link href="/notarial/documentos" className="mt-2 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Abrir flujo documental notarial
          </Link>
        </div>
        <span className="w-fit rounded-full border bg-secondary px-3 py-1 text-sm font-semibold text-[#53665b]">{instrument.status}</span>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Notario</CardTitle></CardHeader>
          <CardContent><p className="text-sm font-semibold text-primary">{instrument.notary}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Fecha</CardTitle></CardHeader>
          <CardContent><p className="text-lg font-semibold text-primary">{instrument.date}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Folios</CardTitle></CardHeader>
          <CardContent><p className="text-lg font-semibold text-primary">{instrument.folioRange}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Siguiente paso</CardTitle></CardHeader>
          <CardContent><p className="text-sm font-semibold text-primary">{instrument.nextStep}</p></CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)]">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <UserRoundCheck className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Comparecientes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {instrument.comparecientes.map((party) => (
                <div key={`${party.name}-${party.role}`} className="rounded-md border bg-secondary p-3">
                  <p className="text-sm font-semibold text-primary">{party.name}</p>
                  <p className="text-xs text-muted-foreground">{party.role}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{party.idDocument} · NIT {party.nit}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <CheckCircle2 className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Checklist notarial</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {instrument.checklist.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border bg-secondary px-3 py-2">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-semibold ${statusStyles[item.status]}`}>{item.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileArchive className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Documentos del instrumento</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {instrument.documents.map((document) => (
                <div key={document.name} className="rounded-md border bg-secondary p-3">
                  <p className="text-sm font-semibold text-primary">{document.name}</p>
                  <p className={`mt-1 text-xs font-semibold ${statusStyles[document.status]}`}>{document.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ScrollText className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Linea de tiempo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {instrument.timeline.map((item) => (
                <div key={`${item.date}-${item.label}`} className="border-l-2 border-[#b08d57] pl-3">
                  <p className="text-sm font-semibold text-primary">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.date} · {item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <BookMarked className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Control de protocolo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Confirmar correlativo antes de autorizar.</p>
              <p>Registrar folios, comparecientes y documentos soporte.</p>
              <p>Preparar indice y testimonio al cierre del instrumento.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileSignature className="h-4 w-4 text-[#53665b]" />
              <CardTitle>Acciones preparadas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              {['Generar borrador', 'Marcar listo para firma', 'Registrar firma', 'Emitir testimonio', 'Archivar soporte'].map((action) => (
                <div key={action} className="rounded-md border bg-secondary px-3 py-2 font-semibold text-primary">{action}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
