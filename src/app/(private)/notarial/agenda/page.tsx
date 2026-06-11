import Link from 'next/link'
import { ArrowLeft, CalendarClock, CheckCircle2, Clock, MapPin, UserRoundCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notarialAppointmentFlow, notarialAppointments, notarialInstruments } from '@/lib/mock-data'

const statusColor = {
  Programada: 'text-[#53665b]',
  'Preparacion pendiente': 'text-[#b08d57]',
  'Lista para firma': 'text-[#53665b]',
  Completada: 'text-[#53665b]',
  Listo: 'text-[#53665b]',
  Pendiente: 'text-[#b08d57]',
  Revisar: 'text-destructive',
} as const

const metrics = [
  { label: 'Citas notariales', value: String(notarialAppointments.length), helper: 'Agenda operativa', icon: CalendarClock },
  { label: 'Firmas programadas', value: String(notarialAppointments.filter((item) => item.type === 'Firma').length), helper: 'Con preparacion previa', icon: UserRoundCheck },
  { label: 'Entregas', value: String(notarialAppointments.filter((item) => item.type === 'Entrega').length), helper: 'Con constancia de retiro', icon: CheckCircle2 },
  { label: 'Pendientes de preparar', value: String(notarialAppointments.filter((item) => item.status === 'Preparacion pendiente').length), helper: 'Requieren atencion', icon: Clock },
]

export default function NotarialAgendaPage() {
  return (
    <div className="space-y-6">
      <Link href="/notarial" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a notarial
      </Link>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Agenda notarial</p>
        <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Recepcion, firma, entrega y cierre</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Control de citas notariales con preparacion previa, comparecientes, documentos originales y acciones de cierre.
        </p>
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
              <CardContent>
                <p className="text-3xl font-bold text-primary">{metric.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.helper}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <Card>
          <CardHeader><CardTitle>Citas programadas</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {notarialAppointments.map((appointment) => {
              const instrument = notarialInstruments.find((item) => item.id === appointment.instrumentId)
              return (
                <div key={appointment.id} className="rounded-lg border bg-secondary p-4">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        {appointment.date} · {appointment.time} · {appointment.type}
                      </p>
                      <p className="mt-1 font-semibold text-primary">{appointment.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{appointment.clientName}</p>
                      {instrument ? (
                        <Link href={`/notarial/${instrument.id}`} className="mt-1 inline-flex text-xs font-semibold text-primary underline-offset-4 hover:underline">
                          {instrument.deedNumber} · {instrument.protocolNumber}
                        </Link>
                      ) : null}
                    </div>
                    <span className={`w-fit rounded-full border bg-card px-2 py-1 text-xs font-semibold ${statusColor[appointment.status]}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {appointment.location}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {appointment.attendees.map((attendee) => (
                      <span key={attendee} className="rounded-full border bg-card px-2 py-1 text-xs text-muted-foreground">{attendee}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader><CardTitle>Flujo de cita</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {notarialAppointmentFlow.map((step, index) => (
                <div key={step.label} className="rounded-md border bg-secondary p-3">
                  <p className="text-sm font-semibold text-primary">{index + 1}. {step.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {notarialAppointments.slice(0, 3).map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle>Preparacion · {appointment.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {appointment.preparation.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border bg-secondary px-3 py-2">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-semibold ${statusColor[item.status]}`}>{item.status}</span>
                </div>
              ))}
              <div className="rounded-md border bg-card px-3 py-2 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Cierre:</span> {appointment.closeout}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
