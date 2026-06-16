import Link from 'next/link'
import { BookOpenCheck, FileCog, Hash, LibraryBig, Settings2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { firmProfile, notarialCorrelatives, notarialTemplates } from '@/lib/mock-data'

const policies = [
  'Bloquear salto de correlativo sin autorizacion del Notario.',
  'Registrar motivo y usuario si un instrumento queda anulado.',
  'Exigir checklist documental antes de marcar listo para firma.',
  'Separar borrador, instrumento firmado, testimonio y constancia de entrega.',
]

export default function NotarialSettingsPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Configuracion notarial</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Correlativos, plantillas y controles</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Preparacion de reglas internas para protocolo, escrituras, actas, legalizaciones y testimonios.
          </p>
          <Link href="/escrituras/generador" className="mt-2 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Abrir generador documental
          </Link>
        </div>
        <div className="rounded-lg border bg-secondary px-4 py-3 text-sm">
          <p className="font-semibold text-primary">{firmProfile.notary}</p>
          <p className="text-muted-foreground">{firmProfile.notarialRegister}</p>
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Hash className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Correlativos activos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {notarialCorrelatives.map((item) => (
              <div key={item.label} className="rounded-md border bg-secondary p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{item.label}</p>
                  <span className="rounded-full border bg-card px-2 py-1 text-xs font-semibold text-[#53665b]">{item.status}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Prefijo: {item.prefix}</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <p className="rounded-md bg-card px-3 py-2"><span className="text-muted-foreground">Actual</span><br /><strong>{item.current}</strong></p>
                  <p className="rounded-md bg-card px-3 py-2"><span className="text-muted-foreground">Siguiente</span><br /><strong>{item.next}</strong></p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Settings2 className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Reglas internas sugeridas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {policies.map((policy) => (
              <p key={policy} className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">{policy}</p>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <LibraryBig className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Estructura de expediente notarial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {['Solicitud', 'Comparecientes', 'Documentos soporte', 'Borrador', 'Firma', 'Testimonio', 'Archivo'].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-md border bg-secondary px-3 py-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-card text-xs font-bold text-primary">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FileCog className="h-4 w-4 text-[#53665b]" />
            <CardTitle>Plantillas notariales</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <tr><th className="py-3">Plantilla</th><th>Categoria</th><th>Responsable</th><th>Actualizada</th><th>Estado</th></tr>
              </thead>
              <tbody className="divide-y">
                {notarialTemplates.map((template) => (
                  <tr key={template.name}>
                    <td className="py-4 font-semibold text-primary">{template.name}</td>
                    <td>{template.category}</td>
                    <td>{template.owner}</td>
                    <td>{template.lastUpdated}</td>
                    <td><span className="rounded-full border bg-secondary px-2 py-1 text-xs font-semibold text-[#53665b]">{template.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="flex items-center gap-3 pt-5 text-sm text-muted-foreground">
          <BookOpenCheck className="h-4 w-4 text-[#b08d57]" />
          Esta configuracion es mock visual; al conectar base real debe persistirse por organizacion y quedar auditada.
        </CardContent>
      </Card>
    </div>
  )
}
