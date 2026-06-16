import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarAgenda } from '@/components/transversal/calendar-agenda'
import { unifiedCalendar } from '@/lib/mock-data'

export default function CalendarioPage() {
  const items = unifiedCalendar()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="luris-display text-3xl font-bold text-primary">Calendario</h1>
        <p className="mt-1 text-sm text-muted-foreground">Agenda unica del despacho: audiencias judiciales y citas notariales, filtrables por pilar.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Agenda del despacho</CardTitle></CardHeader>
        <CardContent>
          <CalendarAgenda items={items} />
        </CardContent>
      </Card>
    </div>
  )
}
