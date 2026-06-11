import { AppShell } from '@/components/layout/app-shell'
import { requireSession } from '@/server/auth/session'

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  await requireSession()
  return <AppShell>{children}</AppShell>
}
