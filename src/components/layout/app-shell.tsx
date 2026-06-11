'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  AlertTriangle,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  FileArchive,
  FileText,
  Gauge,
  Inbox,
  LibraryBig,
  ListChecks,
  LockKeyhole,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { firmProfile } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const primaryNav = [
  { href: '/dashboard', label: 'Dashboard', icon: Gauge },
  { href: '/productividad', label: 'Productividad', icon: Activity },
  { href: '/revision', label: 'Revision', icon: Inbox },
  { href: '/riesgos', label: 'Riesgos', icon: AlertTriangle },
  { href: '/plantillas', label: 'Plantillas', icon: ListChecks },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/expedientes', label: 'Expedientes', icon: BriefcaseBusiness },
  { href: '/notarial', label: 'Notarial', icon: LibraryBig },
  { href: '/documentos', label: 'Documentos', icon: FileArchive },
  { href: '/calendario', label: 'Calendario judicial', icon: CalendarDays },
  { href: '/tareas', label: 'Tareas', icon: ClipboardList },
]

const adminNav = [
  { href: '/usuarios', label: 'Usuarios y roles', icon: ShieldCheck },
  { href: '/configuracion', label: 'Despacho', icon: Settings },
  { href: '/admin', label: 'Admin SaaS', icon: Building2 },
  { href: '/ia-juridica', label: 'IA Juridica', icon: Bot },
]

const policyNav = [
  { href: '/cumplimiento/privacidad', label: 'Privacidad', icon: LockKeyhole },
  { href: '/cumplimiento/terminos', label: 'Terminos', icon: FileText },
]

type NavItem = (typeof primaryNav | typeof adminNav | typeof policyNav)[number]

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const Icon = item.icon
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-[#6d6258] transition-colors hover:bg-[#f2eadc] hover:text-primary luris-focus',
        active && 'bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-[#fffdf8] xl:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-5">
            <Link href="/dashboard" className="flex items-center gap-3 luris-focus">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                <Scale className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="luris-display text-xl font-bold leading-none text-primary">Luris</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">Gestion juridica inteligente</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
            <div className="space-y-1">
              {primaryNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
            <div className="space-y-1 border-t pt-5">
              {adminNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
            <div className="space-y-1 border-t pt-5">
              {policyNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </nav>

          <div className="border-t px-5 py-4">
            <div className="rounded-lg border bg-secondary p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Organizacion</p>
              <p className="mt-1 truncate text-sm font-semibold text-primary">{firmProfile.name}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">{firmProfile.city} · Plan {firmProfile.plan}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="xl:pl-72">
        <header className="sticky top-0 z-20 border-b bg-[#fffdf8]/92 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/dashboard" className="flex items-center gap-2 xl:hidden luris-focus">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                <Scale className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="luris-display text-lg font-bold text-primary">Luris</span>
            </Link>
            <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-md border bg-card px-3 py-2 sm:flex xl:max-w-md">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="truncate text-sm text-muted-foreground">Buscar clientes, expedientes, audiencias o documentos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold leading-tight">{firmProfile.principal}</p>
                <p className="text-xs text-muted-foreground">Licenciado Principal</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#53665b] text-sm font-bold text-white">
                {firmProfile.principalInitials}
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
