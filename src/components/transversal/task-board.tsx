'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PillarFilter, pillarBadgeClass, type PillarValue } from './pillar-filter'
import type { TaskMock } from '@/lib/mock-data'

const statuses = ['Pendiente', 'En proceso', 'Completada'] as const

export function TaskBoard({ tasks }: { tasks: TaskMock[] }) {
  const [pillar, setPillar] = useState<PillarValue>('todos')
  const visible = tasks.filter((task) => pillar === 'todos' || task.pillar === pillar)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{visible.length} tareas</p>
        <PillarFilter value={pillar} onChange={setPillar} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {statuses.map((status) => {
          const column = visible.filter((task) => task.status === status)
          return (
            <div key={status} className="min-h-52 rounded-md border bg-secondary p-4">
              <p className="mb-3 flex items-center justify-between text-sm font-semibold text-primary">
                {status}
                <span className="rounded-full border bg-card px-2 py-0.5 text-xs text-muted-foreground">{column.length}</span>
              </p>
              <div className="space-y-3">
                {column.map((task) => (
                  <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-primary">{task.title}</p>
                      <span className="text-xs font-semibold text-[#b08d57]">{task.priority}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{task.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{task.assignedTo} · {task.dueDate}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={cn('rounded-full border px-2 py-0.5 text-xs font-semibold', pillarBadgeClass(task.pillar))}>{task.pillar}</span>
                      <span className="text-xs text-muted-foreground">{task.caseNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
