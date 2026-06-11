import Link from 'next/link'
import { FileText, LockKeyhole, Scale, ShieldCheck } from 'lucide-react'
import { MockLoginForm } from '@/components/auth/mock-login-form'
import { brandSignals, firmProfile } from '@/lib/mock-data'

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,1.05fr)]">
      <section className="hidden border-r bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#b08d57] text-primary shadow-sm">
            <Scale className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="luris-display text-2xl font-bold leading-none">Luris</p>
            <p className="mt-1 text-sm text-[#e7d9c2]">Gestion Juridica Inteligente</p>
          </div>
        </div>

        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b08d57]">Sistema privado para despachos</p>
          <h1 className="luris-display mt-4 text-4xl font-bold leading-tight">Operacion juridica sobria, auditada y lista para crecer.</h1>
          <p className="mt-5 text-base leading-7 text-[#e7d9c2]">
            Expedientes, documentos, agenda, tareas y permisos bajo una experiencia cerrada para equipos legales de Guatemala.
          </p>
        </div>

        <div className="grid gap-3 text-sm text-[#eadfce]">
          {brandSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-[#b08d57]" aria-hidden="true" />
              {signal}
            </div>
          ))}
          <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-[#b08d57]" aria-hidden="true" /> Auditoria de acciones sensibles</div>
          <div className="flex items-center gap-3"><LockKeyhole className="h-4 w-4 text-[#b08d57]" aria-hidden="true" /> Preparado para MFA y documentos seguros</div>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Scale className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="luris-display text-2xl font-bold leading-none text-primary">Luris</p>
              <p className="mt-1 text-sm text-muted-foreground">Gestion Juridica Inteligente</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-7 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Acceso privado</p>
              <h2 className="luris-display mt-2 text-3xl font-bold text-primary">Luris</h2>
              <p className="mt-2 text-sm text-muted-foreground">{firmProfile.legalName}</p>
            </div>

            <MockLoginForm />

            <div className="mt-5 text-center">
              <Link href="#" className="text-sm font-medium text-primary underline-offset-4 hover:underline luris-focus">
                ¿Olvido su contrasena?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
