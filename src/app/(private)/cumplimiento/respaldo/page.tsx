import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="luris-display text-3xl font-bold text-primary">Politica de respaldo</h1>
        <p className="mt-1 text-sm text-muted-foreground">Documento base para backups, restauracion, continuidad operativa y evidencias.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Borrador interno</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>Este documento existe como estructura inicial. Debe ser revisado por asesoria legal antes de usarse con clientes reales.</p>
          <p>La version final debera considerar legislacion aplicable, obligaciones contractuales, seguridad de informacion y politicas de cada organizacion.</p>
        </CardContent>
      </Card>
    </div>
  )
}
