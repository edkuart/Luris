'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  AlertTriangle,
  Bot,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileArchive,
  FileText,
  Gauge,
  Inbox,
  ListChecks,
  LockKeyhole,
  Menu,
  Plus,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'
import { firmProfile } from '@/lib/mock-data'
import { ACTIVE_PILLARS, FUTURE_PILLARS } from '@/lib/pillars'
import { cn } from '@/lib/utils'

// INICIO
const inicioNav = [{ href: '/dashboard', label: 'Dashboard', icon: Gauge }]

// TRABAJO — pilares centrales, derivados del registro unico de pilares
const trabajoNav = ACTIVE_PILLARS.map((pillar) => ({ href: pillar.href, label: pillar.label, icon: pillar.icon }))
const nextPillar = FUTURE_PILLARS[0]

// TRANSVERSAL — herramientas compartidas por ambos pilares
const transversalNav = [
  { href: '/clientes', label: 'Personas', icon: Users },
  { href: '/documentos', label: 'Documentos', icon: FileArchive },
  { href: '/calendario', label: 'Calendario', icon: CalendarDays },
  { href: '/tareas', label: 'Tareas', icon: ClipboardList },
]

// CONTROL — vistas de supervision (plegable, colapsado por defecto)
const controlNav = [
  { href: '/productividad', label: 'Productividad', icon: Activity },
  { href: '/revision', label: 'Revision', icon: Inbox },
  { href: '/riesgos', label: 'Riesgos', icon: AlertTriangle },
  { href: '/plantillas', label: 'Plantillas', icon: ListChecks },
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

type NavItem = (typeof trabajoNav | typeof adminNav | typeof policyNav)[number]

function GroupLabel({ collapsed, children }: { collapsed: boolean; children: React.ReactNode }) {
  if (collapsed) return null
  return (
    <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{children}</p>
  )
}

function NavLink({ item, collapsed, onClick }: { item: NavItem; collapsed: boolean; onClick?: () => void }) {
  const pathname = usePathname()
  const Icon = item.icon
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={cn(
        'flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-[#6d6258] transition-colors hover:bg-[#f2eadc] hover:text-primary luris-focus',
        active && 'bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground',
        collapsed && 'justify-center px-0',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  // Desktop ≥1280px via external store (sin setState en efecto).
  const isDesktop = useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia('(min-width: 1280px)')
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(min-width: 1280px)').matches,
    () => true,
  )
  const [openOverride, setOpenOverride] = useState<boolean | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [controlOpen, setControlOpen] = useState(false)
  const pathname = usePathname()

  // En desktop arranca abierto; en movil cerrado. El usuario lo sobrescribe con
  // el hamburguesa/colapso. El cierre al navegar en movil lo hace closeOnMobile
  // desde el onClick de cada enlace (no hace falta un efecto sobre pathname).
  const open = openOverride ?? isDesktop

  const closeOnMobile = () => {
    if (!isDesktop) setOpenOverride(false)
  }

  // Control queda expandido si el usuario lo abre o si la ruta activa es de Control.
  const controlActive = controlNav.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  const controlExpanded = controlOpen || controlActive

  const sidebarWidth = collapsed ? 'w-16' : 'w-72'

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 xl:hidden"
          onClick={() => setOpenOverride(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-[#fffdf8] transition-all duration-300 ease-in-out',
          sidebarWidth,
          open ? 'translate-x-0 shadow-xl xl:shadow-none' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center border-b px-4 py-5', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-3 luris-focus">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                <Scale className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="luris-display text-xl font-bold leading-none text-primary">Luris</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">Gestion juridica inteligente</p>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm luris-focus">
              <Scale className="h-5 w-5" aria-hidden="true" />
            </Link>
          )}
          {/* Close button on mobile / collapse toggle on desktop */}
          <button
            onClick={() => collapsed ? setCollapsed(false) : (!isDesktop ? setOpenOverride(false) : setCollapsed(true))}
            className={cn(
              'hidden xl:flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-[#f2eadc] hover:text-primary',
              collapsed && 'hidden',
            )}
            aria-label="Colapsar menu"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOpenOverride(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-[#f2eadc] hover:text-primary xl:hidden"
            aria-label="Cerrar menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className={cn('flex-1 space-y-5 overflow-y-auto py-5', collapsed ? 'px-2' : 'px-4')}>
          {/* INICIO */}
          <div className="space-y-1">
            {inicioNav.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} onClick={closeOnMobile} />
            ))}
          </div>

          {/* TRABAJO — pilares centrales */}
          <div className="space-y-1 border-t pt-5">
            <GroupLabel collapsed={collapsed}>Trabajo</GroupLabel>
            {trabajoNav.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} onClick={closeOnMobile} />
            ))}
            {/* Slot reservado para el siguiente pilar del registro (enabled: false) */}
            {!collapsed && nextPillar && (
              <div
                className="flex h-10 items-center gap-3 rounded-md border border-dashed border-[#e2d8c6] px-3 text-sm font-medium text-muted-foreground/70"
                title={`${nextPillar.label}: ${nextPillar.description} (proximamente)`}
              >
                <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{nextPillar.label} · proximamente</span>
              </div>
            )}
          </div>

          {/* TRANSVERSAL — herramientas compartidas */}
          <div className="space-y-1 border-t pt-5">
            <GroupLabel collapsed={collapsed}>Transversal</GroupLabel>
            {transversalNav.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} onClick={closeOnMobile} />
            ))}
          </div>

          {/* CONTROL — plegable */}
          <div className="space-y-1 border-t pt-5">
            {collapsed ? (
              controlNav.map((item) => (
                <NavLink key={item.href} item={item} collapsed={collapsed} onClick={closeOnMobile} />
              ))
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setControlOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary luris-focus"
                  aria-expanded={controlExpanded}
                >
                  <span>Control</span>
                  <ChevronDown className={cn('h-4 w-4 transition-transform', controlExpanded && 'rotate-180')} aria-hidden="true" />
                </button>
                {controlExpanded &&
                  controlNav.map((item) => (
                    <NavLink key={item.href} item={item} collapsed={collapsed} onClick={closeOnMobile} />
                  ))}
              </>
            )}
          </div>

          {/* ADMINISTRACION */}
          <div className="space-y-1 border-t pt-5">
            <GroupLabel collapsed={collapsed}>Administracion</GroupLabel>
            {adminNav.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} onClick={closeOnMobile} />
            ))}
          </div>

          {/* CUMPLIMIENTO */}
          <div className="space-y-1 border-t pt-5">
            {policyNav.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} onClick={closeOnMobile} />
            ))}
          </div>
        </nav>

        {/* Footer org info */}
        {!collapsed && (
          <div className="border-t px-5 py-4">
            <div className="rounded-lg border bg-secondary p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Organizacion</p>
              <p className="mt-1 truncate text-sm font-semibold text-primary">{firmProfile.name}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">{firmProfile.city} · Plan {firmProfile.plan}</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main area */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          open && !collapsed && 'xl:pl-72',
          open && collapsed && 'xl:pl-16',
        )}
      >
        <header className="sticky top-0 z-20 border-b bg-[#fffdf8]/92 backdrop-blur">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">

            {/* Hamburger — always visible */}
            <button
              onClick={() => {
                if (isDesktop) {
                  if (collapsed) { setCollapsed(false); setOpenOverride(true) }
                  else if (open) { setCollapsed(true) }
                  else { setOpenOverride(true) }
                } else {
                  setOpenOverride(!open)
                }
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-[#f2eadc] hover:text-primary"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo — shown when sidebar is closed */}
            {(!open || collapsed) && (
              <Link href="/dashboard" className="flex items-center gap-2 luris-focus">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="luris-display text-lg font-bold text-primary">Luris</span>
              </Link>
            )}

            {/* Search */}
            <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-md border bg-card px-3 py-2 sm:flex xl:max-w-md">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="truncate text-sm text-muted-foreground">Buscar personas, escrituras, juicios o documentos</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold leading-tight">{firmProfile.principal}</p>
                <p className="text-xs text-muted-foreground">Licenciado Principal</p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#53665b] text-sm font-bold text-white">
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
