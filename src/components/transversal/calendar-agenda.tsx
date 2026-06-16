'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PillarFilter, pillarBadgeClass, type PillarValue } from './pillar-filter'
import type { CalendarItem } from '@/lib/mock-data'

export function CalendarAgenda({ items }: { items: CalendarItem[] }) {
  const [pillar, setPillar] = useState<PillarValue>('todos')
  const visible = items.filter((item) => pillar === 'todos' || item.pillar === pillar)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{visible.length} eventos</p>
        <PillarFilter value={pillar} onChange={setPillar} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visible.map((event) => (
          <Card key={event.id}>
            <CardHeader className="pb-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={cn('rounded-full border px-2 py-0.5 text-xs font-semibold', pillarBadgeClass(event.pillar))}>{event.pillar}</span>
                <span className="rounded-full border bg-secondary px-2 py-0.5 text-xs font-semibold text-[#53665b]">{event.kind}</span>
              </div>
              <CardTitle className="flex items-start gap-2 text-sm leading-5">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#53665b]" aria-hidden="true" /> {event.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-primary">{event.date} · {event.time}</p>
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {event.location}</p>
              <Link href={event.href} className="block text-xs font-semibold text-primary underline-offset-4 hover:underline">
                {event.reference} · {event.responsible}
              </Link>
            </CardContent>
          </Card>
        ))}
        {visible.length === 0 && <p className="text-sm text-muted-foreground">Sin eventos para este pilar.</p>}
      </div>
    </div>
  )
}
