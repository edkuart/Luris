import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { riskDeadlines } from '@/lib/mock-data'

const judicialRisks = riskDeadlines.filter((r) => r.area === 'Judicial')

const severityColor = {
  Critico: 'text-destructive',
  Alto: 'text-[#b08d57]',
  Medio: 'text-[#53665b]',
  Controlado: 'text-[#53665b]',
} as const

const checklistColor = {
  Listo: 'text-[#53665b]',
  Pendiente: 'text-[#b08d57]',
  Bloqueado: 'text-destructive',
  Revisar: 'text-destructive',
} as const

export default function JuiciosPlazosPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Control de plazos</p>
        <h2 className="luris-display mt-1 text-2xl font-bold text-primary">Plazos criticos judiciales</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Vencimientos con responsable, bloqueos, accion siguiente y ruta de escalamiento.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {judicialRisks.map((risk) => (
          <Card key={risk.id}>
            <CardHeader className="space-y-0">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{risk.title}</CardTitle>
                <span className={`flex shrink-0 items-center gap-1 text-xs font-semibold ${severityColor[risk.severity]}`}>
                  <AlertTriangle className="h-3.5 w-3.5" /> {risk.severity}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{risk.matter} · {risk.clientName}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                <p><span className="font-semibold text-primary">Vence:</span> {risk.dueDate} {risk.dueTime} ({risk.daysLeft} dias)</p>
                <p><span className="font-semibold text-primary">Responsable:</span> {risk.owner}</p>
                <p><span className="font-semibold text-primary">Respaldo:</span> {risk.backupOwner}</p>
                <p><span className="font-semibold text-primary">Estado:</span> {risk.status}</p>
              </div>
              <p className="rounded-md bg-secondary p-2 text-xs text-muted-foreground"><span className="font-semibold text-[#b08d57]">Bloqueo:</span> {risk.blocker}</p>
              <p className="text-xs text-muted-foreground"><span className="font-semibold text-primary">Accion siguiente:</span> {risk.nextAction}</p>
              <div className="space-y-1">
                {risk.checklist.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2 border-b pb-1 text-xs last:border-b-0 last:pb-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={`font-semibold ${checklistColor[item.status]}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
