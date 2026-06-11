import { Building, ToggleLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminPage() {
  return <div className="space-y-5"><div><h1 className="luris-display text-3xl font-bold text-primary">Administracion SaaS</h1><p className="mt-1 text-sm text-muted-foreground">Organizaciones, usuarios, suscripciones y planes manuales.</p></div><div className="grid gap-4 lg:grid-cols-3">{['Individual', 'Profesional', 'Empresarial'].map((plan) => <Card key={plan}><CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-4 w-4 text-[#53665b]" /> {plan}</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-sm text-muted-foreground"><ToggleLeft className="h-4 w-4" /> Plan disponible para asignacion manual.</CardContent></Card>)}</div></div>
}
