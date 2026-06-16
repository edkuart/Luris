'use client'

import Link from 'next/link'
import { CalendarClock, FileText, PenLine, Rows3, Settings2, Users } from 'lucide-react'
import { WorkspaceTabs, type WorkspaceTab } from '@/components/layout/workspace-tabs'
import { buttonVariants } from '@/components/ui/button'
import { firmProfile } from '@/lib/mock-data'

const tabs: WorkspaceTab[] = [
  { href: '/escrituras', label: 'Resumen', icon: Rows3 },
  { href: '/escrituras/agenda', label: 'Agenda', icon: CalendarClock },
  { href: '/escrituras/comparecientes', label: 'Comparecientes', icon: Users },
  { href: '/escrituras/documentos', label: 'Documentos', icon: FileText },
  { href: '/escrituras/generador', label: 'Generador', icon: PenLine },
  { href: '/escrituras/configuracion', label: 'Protocolo y plantillas', icon: Settings2 },
]

export default function EscriturasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Escrituras · {firmProfile.name}</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Gestion notarial</h1>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="rounded-lg border bg-secondary px-4 py-2 text-sm">
            <p className="font-semibold text-primary">{firmProfile.notary}</p>
            <p className="text-xs text-muted-foreground">{firmProfile.notarialRegister}</p>
          </div>
          <Link href="/escrituras/generador" className={buttonVariants()}>
            <PenLine className="h-4 w-4" /> Nuevo instrumento
          </Link>
        </div>
      </div>

      <WorkspaceTabs tabs={tabs} />

      <div>{children}</div>
    </div>
  )
}
