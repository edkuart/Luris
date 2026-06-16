import { CheckSquare2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TaskBoard } from '@/components/transversal/task-board'
import { tasks } from '@/lib/mock-data'

export default function TareasPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="luris-display text-3xl font-bold text-primary">Tareas</h1>
          <p className="mt-1 text-sm text-muted-foreground">Asignaciones de juicios y escrituras por usuario, fecha limite y estado.</p>
        </div>
        <Button><CheckSquare2 className="h-4 w-4" /> Nueva tarea</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Tablero operativo</CardTitle></CardHeader>
        <CardContent>
          <TaskBoard tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  )
}
