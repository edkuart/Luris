import { CheckSquare2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { tasks } from '@/lib/mock-data'

const statuses = ['Pendiente', 'En proceso', 'Completada'] as const

export default function TareasPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="luris-display text-3xl font-bold text-primary">Tareas</h1>
          <p className="mt-1 text-sm text-muted-foreground">Asignaciones por usuario, fecha limite, estado y expediente relacionado.</p>
        </div>
        <Button><CheckSquare2 className="h-4 w-4" /> Nueva tarea</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Tablero operativo</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {statuses.map((status) => (
            <div key={status} className="min-h-52 rounded-md border bg-secondary p-4">
              <p className="mb-3 text-sm font-semibold text-primary">{status}</p>
              <div className="space-y-3">
                {tasks.filter((task) => task.status === status).map((task) => (
                  <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-primary">{task.title}</p>
                      <span className="text-xs font-semibold text-[#b08d57]">{task.priority}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{task.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{task.assignedTo} · {task.dueDate}</p>
                    <p className="text-xs text-muted-foreground">{task.caseNumber}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
