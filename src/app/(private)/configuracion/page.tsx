import { Building2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ConfiguracionPage() {
  return <div className="space-y-5"><div><h1 className="luris-display text-3xl font-bold text-primary">Configuracion del despacho</h1><p className="mt-1 text-sm text-muted-foreground">Datos legales, NIT, usuarios, seguridad y almacenamiento.</p></div><Card><CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[#53665b]" /> Bufete Demo Guatemala</CardTitle></CardHeader><CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"><p>Razon social: pendiente</p><p>NIT: pendiente</p><p>Almacenamiento: configurable</p><p>MFA: preparado</p></CardContent></Card></div>
}
