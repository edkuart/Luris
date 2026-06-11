import { MailPlus, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { firmProfile, workflowSteps } from '@/lib/mock-data'

const roles = [
  { name: 'Super Admin', detail: 'Administra organizaciones, planes y seguridad global.' },
  { name: 'Licenciado Principal', detail: 'Administra el despacho completo y puede invitar usuarios.' },
  { name: 'Abogado Asociado', detail: 'Trabaja casos asignados, tareas y documentos.' },
  { name: 'Secretaria Senior', detail: 'Crea clientes, expedientes, calendario y documentos segun permisos.' },
  { name: 'Secretaria Limitada', detail: 'Opera modulos asignados sin eliminar informacion sensible.' },
  { name: 'Cliente Invitado', detail: 'Rol futuro para ver avances autorizados.' },
]

export default function UsuariosPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="luris-display text-3xl font-bold text-primary">Usuarios y roles</h1>
          <p className="mt-1 text-sm text-muted-foreground">Invitaciones por correo con permisos por organizacion.</p>
        </div>
        <Button><MailPlus className="h-4 w-4" /> Invitar usuario</Button>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Invitacion preparada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border bg-secondary p-4">
              <p className="font-semibold text-primary">{firmProfile.invitedSecretary}</p>
              <p className="text-muted-foreground">{firmProfile.invitedSecretaryEmail}</p>
              <p className="mt-2 text-xs text-muted-foreground">Rol sugerido: Secretaria Senior · Estado: Pendiente de aceptar</p>
            </div>
            <p className="text-muted-foreground">El envio real de correo sigue mockeado. El backend debera crear token, expiracion, auditoria y pantalla de aceptacion.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Flujo Licenciado Principal a Secretaria</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {workflowSteps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="rounded-md border bg-secondary p-3">
                  <Icon className="h-4 w-4 text-[#53665b]" aria-hidden="true" />
                  <p className="mt-2 text-sm font-semibold text-primary">{step.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.name}>
            <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#53665b]" /> {role.name}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{role.detail}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
