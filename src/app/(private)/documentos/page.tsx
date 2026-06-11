import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  FileArchive,
  FileCheck2,
  FileClock,
  FilePlus2,
  FolderOpen,
  History,
  Send,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  documentDeliveries,
  documentFolders,
  documentGovernanceRules,
  documentReviewQueue,
  documents,
  documentVersions,
} from '@/lib/mock-data'

const documentStatusColor = {
  Vigente: 'text-[#53665b]',
  'En revision': 'text-[#b08d57]',
  Borrador: 'text-[#6d6258]',
} as const

const reviewStatusColor = {
  Pendiente: 'text-[#b08d57]',
  Observado: 'text-destructive',
  Aprobado: 'text-[#53665b]',
} as const

const versionStatusColor = {
  Borrador: 'text-[#6d6258]',
  'En revision': 'text-[#b08d57]',
  Aprobada: 'text-[#53665b]',
  Presentada: 'text-[#53665b]',
  Archivada: 'text-muted-foreground',
} as const

const folderHealthColor = {
  Completa: 'text-[#53665b]',
  Revisar: 'text-[#b08d57]',
  Incompleta: 'text-destructive',
} as const

const deliveryStatusColor = {
  Preparada: 'text-[#b08d57]',
  Enviada: 'text-[#53665b]',
  Entregada: 'text-[#53665b]',
  Pendiente: 'text-destructive',
} as const

const metrics = [
  {
    label: 'Documentos',
    value: String(documents.length),
    helper: `${documentVersions.length} versiones registradas`,
    icon: FileArchive,
  },
  {
    label: 'En revision',
    value: String(documentReviewQueue.filter((review) => review.status !== 'Aprobado').length),
    helper: 'Pendientes u observados',
    icon: FileClock,
  },
  {
    label: 'Versiones vigentes',
    value: String(documents.filter((document) => document.status === 'Vigente').length),
    helper: 'Aprobadas para uso',
    icon: CheckCircle2,
  },
  {
    label: 'Entregas activas',
    value: String(documentDeliveries.filter((delivery) => delivery.status !== 'Entregada').length),
    helper: 'Requieren constancia',
    icon: Send,
  },
]

export default function DocumentosPage() {
  const latestVersions = documentVersions.slice().sort((a, b) => b.version - a.version).slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Repositorio del despacho</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Documentos y versiones</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Centro operativo para controlar versiones, revision del principal, carpetas por expediente, entregas y auditoria documental.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/revision" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-semibold text-primary luris-focus">
            <FileCheck2 className="h-4 w-4" aria-hidden="true" />
            Bandeja de revision
          </Link>
          <div className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
            Subir documento
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

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FileArchive className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Repositorio por expediente</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="py-3">Documento</th>
                  <th>Expediente</th>
                  <th>Tipo</th>
                  <th>Version</th>
                  <th>Estado</th>
                  <th>Subido por</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {documents.map((document) => (
                  <tr key={document.id} className="align-top">
                    <td className="py-4 pr-4">
                      <Link href={`/documentos/${document.id}`} className="font-semibold text-primary underline-offset-4 hover:underline luris-focus">
                        {document.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">{document.caseTitle}</p>
                    </td>
                    <td className="pr-4">{document.caseNumber}</td>
                    <td className="pr-4">{document.fileType} · {document.size}</td>
                    <td className="pr-4">v{document.version}</td>
                    <td className={`pr-4 font-semibold ${documentStatusColor[document.status]}`}>{document.status}</td>
                    <td className="pr-4">
                      <p>{document.uploadedBy}</p>
                      <p className="text-xs text-muted-foreground">{document.uploadedAt}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileClock className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
              <CardTitle>Revision documental</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documentReviewQueue.map((review) => (
                <div key={review.id} className="rounded-md border bg-secondary p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{review.title}</p>
                    <span className={`text-xs font-semibold ${reviewStatusColor[review.status]}`}>{review.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{review.caseNumber} · {review.dueAt}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{review.nextAction}</p>
                </div>
              ))}
              <Link href="/revision" className="flex items-center gap-2 pt-1 text-sm font-semibold text-primary luris-focus">
                Enviar seleccionados a revision <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ShieldCheck className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Reglas documentales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {documentGovernanceRules.map((rule) => (
                <p key={rule} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{rule}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <History className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Historial de versiones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {latestVersions.map((version) => (
              <div key={version.id} className="rounded-md border bg-secondary p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{version.label} · v{version.version}</p>
                  <span className={`text-xs font-semibold ${versionStatusColor[version.status]}`}>{version.status}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{version.author} · {version.createdAt}</p>
                <p className="mt-2 text-sm text-muted-foreground">{version.changeNote}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FolderOpen className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Carpetas por expediente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documentFolders.map((folder) => (
              <div key={folder.id} className="rounded-md border bg-secondary p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{folder.name}</p>
                  <span className={`text-xs font-semibold ${folderHealthColor[folder.health]}`}>{folder.health}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{folder.caseNumber} · {folder.documents} documentos</p>
                <p className="mt-2 text-sm text-muted-foreground">{folder.latestActivity}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Send className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
            <CardTitle>Entregas y presentaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documentDeliveries.map((delivery) => (
              <div key={delivery.id} className="rounded-md border bg-secondary p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{delivery.documentName}</p>
                  <span className={`text-xs font-semibold ${deliveryStatusColor[delivery.status]}`}>{delivery.status}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{delivery.method} · {delivery.dueAt}</p>
                <p className="mt-2 text-sm text-muted-foreground">{delivery.recipient}</p>
                <p className="mt-2 text-xs font-semibold text-primary">{delivery.proof}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="flex items-center gap-3 pt-5 text-sm text-muted-foreground">
          <FilePlus2 className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
          El flujo real debe guardar archivos fuera de la BD, registrar metadatos, versionar cada cambio y auditar toda entrega o aprobacion.
        </CardContent>
      </Card>
    </div>
  )
}
