'use client'

import { LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACTIVE_PILLARS, type PillarKey } from '@/lib/pillars'

export { pillarBadgeClass } from '@/lib/pillars'

export type PillarValue = 'todos' | PillarKey

export function PillarFilter({ value, onChange }: { value: PillarValue; onChange: (v: PillarValue) => void }) {
  // Opciones derivadas del registro: "Todos" + cada pilar activo.
  const options = [
    { key: 'todos' as const, label: 'Todos', icon: LayoutGrid },
    ...ACTIVE_PILLARS.map((pillar) => ({ key: pillar.key, label: pillar.label, icon: pillar.icon })),
  ]

  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => {
        const Icon = option.icon
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={cn(
              'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors luris-focus',
              value === option.key ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary',
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
