'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type WorkspaceTab = { href: string; label: string; icon?: LucideIcon }

/**
 * Sub-navegacion por pestañas para un workspace (Escrituras, Juicios, ...).
 * El tab activo se resuelve por coincidencia exacta de ruta; las vistas de
 * detalle (p. ej. /escrituras/[id]) no marcan ningun tab.
 */
export function WorkspaceTabs({ tabs }: { tabs: WorkspaceTab[] }) {
  const pathname = usePathname()

  return (
    <div className="flex gap-1 overflow-x-auto border-b">
      {tabs.map((tab) => {
        const active = pathname === tab.href
        const Icon = tab.icon
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors luris-focus',
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-primary',
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
