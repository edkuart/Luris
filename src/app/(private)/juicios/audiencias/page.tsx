import Link from 'next/link'
import { CalendarClock, MapPin, UserRoundCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { caseFiles, hearings } from '@/lib/mock-data'

const caseIdByNumber = new Map(caseFiles.map((c) => [c.caseNumber, c.id]))

export default function JuiciosAudienciasPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Agenda judicial</p>
        <h2 className="luris-display mt-1 text-2xl font-bold text-primary">Audiencias y vencimientos</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Eventos vinculados a expedientes: audiencias, vencimientos, presentaciones y reuniones.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Proximos eventos</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {hearings.map((event) => {
            const caseId = caseIdByNumber.get(event.caseNumber)
            return (
              <div key={event.id} className="rounded-lg border bg-secondary p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
                      <p className="font-semibold text-primary">{event.title}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{event.court}</p>
                  </div>
                  <span className="w-fit rounded-full border bg-card px-2 py-1 text-xs font-semibold text-[#53665b]">{event.type}</span>
                </div>
                <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                  <p className="flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {event.date} · {event.time}</p>
                  <p className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</p>
                  <p className="flex items-center gap-1"><UserRoundCheck className="h-3.5 w-3.5" /> {event.responsible}</p>
                </div>
                <div className="mt-2">
                  {caseId ? (
                    <Link href={`/juicios/${caseId}`} className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
                      {event.caseNumber} · ver expediente
                    </Link>
                  ) : (
                    <span className="text-xs text-muted-foreground">{event.caseNumber}</span>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
