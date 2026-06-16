'use client'

import Link from 'next/link'
import { AlertTriangle, CalendarClock, Rows3, Upload } from 'lucide-react'
import { WorkspaceTabs, type WorkspaceTab } from '@/components/layout/workspace-tabs'
import { buttonVariants } from '@/components/ui/button'

const tabs: WorkspaceTab[] = [
  { href: '/juicios', label: 'Resumen', icon: Rows3 },
  { href: '/juicios/audiencias', label: 'Audiencias', icon: CalendarClock },
  { href: '/juicios/plazos', label: 'Plazos criticos', icon: AlertTriangle },
]

export default function JuiciosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Juicios · Litigio</p>
          <h1 className="luris-display mt-1 text-3xl font-bold text-primary">Gestion de expedientes</h1>
        </div>
        <Link href="/juicios/nuevo" className={buttonVariants()}>
          <Upload className="h-4 w-4" /> Nuevo expediente
        </Link>
      </div>

      <WorkspaceTabs tabs={tabs} />

      <div>{children}</div>
    </div>
  )
}
