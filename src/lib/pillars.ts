import type { LucideIcon } from 'lucide-react'
import { FileSignature, Gavel, Scale } from 'lucide-react'

/**
 * Registro central de pilares de trabajo del despacho.
 *
 * Este archivo es la unica fuente de verdad para las areas de trabajo. Agregar
 * un tercer pilar (p. ej. Consultoria) se hace aqui: poner `enabled: true`,
 * crear su ruta y conectar sus datos. El sidebar, el slot "Nueva area" y los
 * filtros transversales se actualizan automaticamente desde este registro.
 */

export type PillarKey = 'Escrituras' | 'Juicios' | 'Consultoria'

export type PillarDef = {
  key: PillarKey
  label: string
  href: string
  icon: LucideIcon
  description: string
  /** Clases Tailwind para el badge de pilar en vistas transversales. */
  badgeClass: string
  enabled: boolean
}

export const PILLARS: PillarDef[] = [
  {
    key: 'Escrituras',
    label: 'Escrituras',
    href: '/escrituras',
    icon: FileSignature,
    description: 'Gestion notarial',
    badgeClass: 'border-[#b08d57]/30 bg-[#b08d57]/10 text-[#b08d57]',
    enabled: true,
  },
  {
    key: 'Juicios',
    label: 'Juicios',
    href: '/juicios',
    icon: Gavel,
    description: 'Litigio',
    badgeClass: 'border-[#53665b]/30 bg-[#53665b]/10 text-[#53665b]',
    enabled: true,
  },
  {
    key: 'Consultoria',
    label: 'Consultoria',
    href: '/consultoria',
    icon: Scale,
    description: 'Asesoria no contenciosa',
    badgeClass: 'border-[#6d6258]/30 bg-[#6d6258]/10 text-[#6d6258]',
    enabled: false,
  },
]

export const ACTIVE_PILLARS = PILLARS.filter((pillar) => pillar.enabled)
export const FUTURE_PILLARS = PILLARS.filter((pillar) => !pillar.enabled)

export function pillarBadgeClass(key: PillarKey): string {
  return PILLARS.find((pillar) => pillar.key === key)?.badgeClass ?? ''
}
