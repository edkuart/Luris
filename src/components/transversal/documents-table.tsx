'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PillarFilter, pillarBadgeClass, type PillarValue } from './pillar-filter'
import type { DocItem } from '@/lib/mock-data'

export function DocumentsTable({ docs }: { docs: DocItem[] }) {
  const [pillar, setPillar] = useState<PillarValue>('todos')
  const visible = docs.filter((doc) => pillar === 'todos' || doc.pillar === pillar)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{visible.length} documentos</p>
        <PillarFilter value={pillar} onChange={setPillar} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b text-xs uppercase tracking-[0.08em] text-muted-foreground">
            <tr>
              <th className="py-3">Documento</th>
              <th>Pilar</th>
              <th>Referencia</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {visible.map((doc) => (
              <tr key={doc.id} className="align-top">
                <td className="py-4 pr-4">
                  <Link href={doc.href} className="font-semibold text-primary underline-offset-4 hover:underline luris-focus">{doc.name}</Link>
                </td>
                <td className="pr-4">
                  <span className={cn('rounded-full border px-2 py-0.5 text-xs font-semibold', pillarBadgeClass(doc.pillar))}>{doc.pillar}</span>
                </td>
                <td className="pr-4">{doc.reference}</td>
                <td className="pr-4">{doc.kind}</td>
                <td className="pr-4 text-muted-foreground">{doc.status}</td>
                <td className="pr-4">{doc.owner}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">Sin documentos para este pilar.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
