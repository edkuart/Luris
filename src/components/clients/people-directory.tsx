'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FileSignature, Gavel, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { DirectoryPerson } from '@/lib/mock-data'

type Filter = 'todos' | 'juicios' | 'escrituras'

const filters: { key: Filter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'juicios', label: 'En juicios' },
  { key: 'escrituras', label: 'En escrituras' },
]

const roleBadge: Record<string, string> = {
  Cliente: 'border-[#53665b]/30 bg-[#53665b]/10 text-[#53665b]',
  Compareciente: 'border-[#b08d57]/30 bg-[#b08d57]/10 text-[#b08d57]',
}

export function PeopleDirectory({ people }: { people: DirectoryPerson[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('todos')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return people.filter((person) => {
      if (filter === 'juicios' && person.juicios === 0) return false
      if (filter === 'escrituras' && person.escrituras === 0) return false
      if (!q) return true
      return [person.name, person.dpi, person.nit, person.email].some((field) => field?.toLowerCase().includes(q))
    })
  }, [people, query, filter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-md border bg-card px-3 py-2 sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            placeholder="Buscar por nombre, DPI, NIT o correo"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors luris-focus',
                filter === f.key ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
            <tr>
              <th className="py-3">Nombre</th>
              <th>Rol</th>
              <th>DPI</th>
              <th>NIT</th>
              <th>Involucramiento</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {visible.map((person) => (
              <tr key={person.id} className="align-middle">
                <td className="py-4">
                  <Link href={person.href} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {person.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{person.type}</p>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {person.roles.map((role) => (
                      <span key={role} className={cn('rounded-full border px-2 py-0.5 text-xs font-semibold', roleBadge[role])}>
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{person.dpi ?? '-'}</td>
                <td>{person.nit ?? '-'}</td>
                <td>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Gavel className="h-3.5 w-3.5 text-[#53665b]" /> {person.juicios} juicios
                    </span>
                    <span className="flex items-center gap-1">
                      <FileSignature className="h-3.5 w-3.5 text-[#b08d57]" /> {person.escrituras} escrituras
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">Sin personas que coincidan con el filtro.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
