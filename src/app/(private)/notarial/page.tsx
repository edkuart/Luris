import Link from 'next/link'
import {
  BookMarked,
  ClipboardCheck,
  FileSignature,
  FileText,
  LibraryBig,
  PenLine,
  ScrollText,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  firmProfile,
  notarialDocumentTypes,
  notarialIndexEntries,
  notarialInstruments,
  notarialWorkflow,
} from '@/lib/mock-data'

const metrics = [
  { label: 'Instrumentos en protocolo', value: String(notarialInstruments.length), icon: LibraryBig },
  { label: 'Pendientes de firma', value: String(notarialInstruments.filter((item) => item.status === 'Pendiente de firma').length), icon: FileSignature },
  { label: 'Actas y legalizaciones', value: '2', icon: PenLine },
  { label: 'Testimonios emitidos', value: '1', icon: ScrollText },
]

const modules = [
  { title: 'Protocolo', detail: 'Control de correlativos, folios, instrumentos y cierre.', icon: BookMarked },
  { title: 'Escrituras publicas', detail: 'Compraventas, mandatos, sociedades, poderes y contratos.', icon: FileSignature },
  { title: 'Actas notariales', detail: 'Declaraciones, requerimientos, hechos y presencia notarial.', icon: ClipboardCheck },
  { title: 'Legalizaciones', detail: 'Firmas, autenticas y control de comparecientes.', icon: ShieldCheck },
  { title: 'Testimonios', detail: 'Emision, entrega, versiones y constancias de retiro.', icon: ScrollText },
  { title: 'Comparecientes', detail: 'DPI, NIT, representacion, poderes y contactos relacionados.', icon: Users },
  { title: 'Agenda notarial', detail: 'Recepcion, preparacion, firma, entrega y cierre de citas.', icon: ClipboardCheck },
  { title: 'Generador documental', detail: 'Plantillas, campos obligatorios y borradores revisables.', icon: PenLine },
]

export default function NotarialPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Modulo notarial · {firmProfile.name}</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Protocolo y gestion notarial</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Ambiente preparado para escrituras publicas, actas, legalizaciones, testimonios, comparecientes e indice notarial.
          </p>
        </div>
        <div className="rounded-lg border bg-secondary px-4 py-3 text-sm">
          <p className="font-semibold text-primary">{firmProfile.notary}</p>
          <p className="text-muted-foreground">{firmProfile.notarialRegister}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/notarial/agenda" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
              Agenda notarial
            </Link>
            <Link href="/notarial/documentos" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
              Flujo documental
            </Link>
            <Link href="/notarial/comparecientes" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
              Comparecientes
            </Link>
            <Link href="/notarial/generador" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
              Generador
            </Link>
            <Link href="/notarial/configuracion" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
              Correlativos y plantillas
            </Link>
          </div>
        </div>
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

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <Card>
          <CardHeader><CardTitle>Instrumentos recientes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {notarialInstruments.map((instrument) => (
              <div key={instrument.id} className="rounded-lg border bg-secondary p-4">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      {instrument.protocolNumber} · {instrument.deedNumber}
                    </p>
                    <Link href={`/notarial/${instrument.id}`} className="mt-1 block font-semibold text-primary underline-offset-4 hover:underline">
                      {instrument.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">{instrument.clientName} · {instrument.type}</p>
                  </div>
                  <span className="w-fit rounded-full border bg-card px-2 py-1 text-xs font-semibold text-[#53665b]">{instrument.status}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{instrument.nextStep}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {instrument.parties.map((party) => (
                    <span key={party} className="rounded-full border bg-card px-2 py-1 text-xs text-muted-foreground">{party}</span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4">
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
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <LibraryBig className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Submodulos notariales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <Link
                  key={module.title}
                  href={
                    module.title === 'Comparecientes'
                      ? '/notarial/comparecientes'
                      : module.title === 'Agenda notarial'
                        ? '/notarial/agenda'
                        : module.title === 'Generador documental'
                          ? '/notarial/generador'
                          : '/notarial'
                  }
                  className="rounded-md border bg-secondary p-3 underline-offset-4 hover:border-[#b08d57] hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#53665b]" />
                    <p className="text-sm font-semibold text-primary">{module.title}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{module.detail}</p>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FileText className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Documentos requeridos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notarialDocumentTypes.map((document) => (
              <p key={document} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{document}</p>
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
      </section>
    </div>
  )
}
