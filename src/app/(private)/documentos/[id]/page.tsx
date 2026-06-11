import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileArchive,
  FileCheck2,
  FileText,
  History,
  MessageSquareText,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  documentAuditEvents,
  documentComments,
  documentDeliveries,
  documentReviewQueue,
  documents,
  documentVersions,
} from '@/lib/mock-data'

const documentStatusColor = {
  Vigente: 'text-[#53665b]',
  'En revision': 'text-[#b08d57]',
  Borrador: 'text-[#6d6258]',
} as const

const versionStatusColor = {
  Borrador: 'text-[#6d6258]',
  'En revision': 'text-[#b08d57]',
  Aprobada: 'text-[#53665b]',
  Presentada: 'text-[#53665b]',
  Archivada: 'text-muted-foreground',
} as const

const reviewStatusColor = {
  Pendiente: 'text-[#b08d57]',
  Observado: 'text-destructive',
  Aprobado: 'text-[#53665b]',
} as const

const checklistColor = {
  Completo: 'bg-[#e7efe8] text-[#53665b]',
  Pendiente: 'bg-[#f6efe2] text-[#8a6c39]',
  Revisar: 'bg-secondary text-[#6d6258]',
} as const

const commentStatusColor = {
  Abierto: 'text-destructive',
  Resuelto: 'text-[#53665b]',
  Informativo: 'text-[#6d6258]',
} as const

const deliveryStatusColor = {
  Preparada: 'text-[#b08d57]',
  Enviada: 'text-[#53665b]',
  Entregada: 'text-[#53665b]',
  Pendiente: 'text-destructive',
} as const

export function generateStaticParams() {
  return documents.map((document) => ({ id: document.id }))
}

export default async function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const document = documents.find((item) => item.id === id)
  if (!document) notFound()

  const versions = documentVersions.filter((version) => version.documentId === document.id)
  const currentVersion = versions.find((version) => version.version === document.version) ?? versions.at(-1)
  const review = documentReviewQueue.find((item) => item.documentId === document.id)
  const comments = documentComments.filter((comment) => comment.documentId === document.id)
  const auditEvents = documentAuditEvents.filter((event) => event.documentId === document.id)
  const delivery = documentDeliveries.find((item) => document.name.includes(item.documentName) || item.documentName.includes(document.name.split('.')[0]))

  return (
    <div className="space-y-6">
      <Link href="/documentos" className="inline-flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a documentos
      </Link>

      <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">{document.caseNumber}</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">{document.name}</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{document.caseTitle}</p>
        </div>
        <span className={`w-fit rounded-full border bg-secondary px-3 py-1 text-sm font-semibold ${documentStatusColor[document.status]}`}>
          {document.status}
        </span>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Version vigente</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-primary">v{document.version}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Tipo y tamano</CardTitle></CardHeader>
          <CardContent><p className="text-sm font-semibold text-primary">{document.fileType} · {document.size}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Responsable de carga</CardTitle></CardHeader>
          <CardContent><p className="text-sm font-semibold text-primary">{document.uploadedBy}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Ultima actividad</CardTitle></CardHeader>
          <CardContent><p className="text-sm font-semibold text-primary">{document.uploadedAt}</p></CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileArchive className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Version actual</CardTitle>
            </CardHeader>
            <CardContent>
              {currentVersion ? (
                <div className="rounded-md border bg-secondary p-4">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-sm font-semibold text-primary">{currentVersion.label} · v{currentVersion.version}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{currentVersion.author} · {currentVersion.createdAt}</p>
                    </div>
                    <span className={`text-xs font-semibold ${versionStatusColor[currentVersion.status]}`}>{currentVersion.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{currentVersion.changeNote}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Sin versiones registradas.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <History className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Historial de versiones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {versions.map((version) => (
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
              <MessageSquareText className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Comentarios de revision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {comments.length ? (
                comments.map((comment) => (
                  <div key={comment.id} className="rounded-md border bg-secondary p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-primary">{comment.author}</p>
                      <span className={`text-xs font-semibold ${commentStatusColor[comment.status]}`}>{comment.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{comment.role} · {comment.createdAt}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sin comentarios registrados para este documento.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <FileCheck2 className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Revision y aprobacion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {review ? (
                <>
                  <div className="rounded-md border bg-secondary p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-primary">{review.title}</p>
                      <span className={`text-xs font-semibold ${reviewStatusColor[review.status]}`}>{review.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Revisor: {review.reviewer} · {review.dueAt}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{review.nextAction}</p>
                  </div>
                  <div className="grid gap-2">
                    {review.checklist.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border bg-card px-3 py-2">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${checklistColor[item.status]}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/revision" className="flex items-center gap-2 text-sm font-semibold text-primary luris-focus">
                    Abrir bandeja de revision <FileText className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Este documento no tiene revision pendiente.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Send className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Entrega o presentacion</CardTitle>
            </CardHeader>
            <CardContent>
              {delivery ? (
                <div className="rounded-md border bg-secondary p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{delivery.documentName}</p>
                    <span className={`text-xs font-semibold ${deliveryStatusColor[delivery.status]}`}>{delivery.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{delivery.method} · {delivery.dueAt}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{delivery.recipient}</p>
                  <p className="mt-2 text-xs font-semibold text-primary">{delivery.proof}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Sin entrega o presentacion vinculada todavia.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ShieldCheck className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
              <CardTitle>Bitacora documental</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {auditEvents.length ? (
                auditEvents.map((event) => (
                  <div key={event.id} className="border-l-2 border-[#b08d57] pl-3">
                    <p className="text-xs font-semibold text-primary">{event.time} · {event.actor}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">{event.action}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{event.detail}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sin eventos de auditoria registrados.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Card>
        <CardContent className="grid gap-3 pt-5 md:grid-cols-3">
          <div className="flex gap-3 rounded-md bg-secondary p-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#53665b]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">Version clara</p>
              <p className="mt-1 text-sm text-muted-foreground">La ficha separa version vigente, historial y estado documental.</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-md bg-secondary p-3">
            <Clock3 className="h-5 w-5 shrink-0 text-[#b08d57]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">Revision antes de uso</p>
              <p className="mt-1 text-sm text-muted-foreground">Los documentos observados o pendientes pasan por revision del principal.</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-md bg-secondary p-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#53665b]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">Trazabilidad</p>
              <p className="mt-1 text-sm text-muted-foreground">Toda version, comentario y aprobacion queda lista para auditoria futura.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
