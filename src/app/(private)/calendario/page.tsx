import { CalendarDays, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { hearings } from '@/lib/mock-data'

export default function CalendarioPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="luris-display text-3xl font-bold text-primary">Calendario judicial</h1>
        <p className="mt-1 text-sm text-muted-foreground">Agenda por expediente, tipo de evento, juzgado y responsable.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {hearings.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="flex items-start gap-2 text-sm leading-5">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#53665b]" /> {event.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-primary">{event.date} · {event.time}</p>
              <p>{event.court}</p>
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {event.location}</p>
              <p>{event.caseNumber}</p>
              <span className="inline-flex rounded-full border bg-secondary px-2 py-1 text-xs font-semibold text-[#53665b]">{event.type}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
