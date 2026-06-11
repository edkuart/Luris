import { Bot, FileSearch, PenLine, Route } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const future = [
  { label: 'Resumir expedientes', icon: FileSearch },
  { label: 'Buscar dentro de documentos', icon: FileSearch },
  { label: 'Crear borradores', icon: PenLine },
  { label: 'Analizar linea de tiempo', icon: Route },
]

export default function IaJuridicaPage() {
  return <div className="space-y-5"><div><h1 className="luris-display text-3xl font-bold text-primary">IA Juridica</h1><p className="mt-1 text-sm text-muted-foreground">Modulo reservado para OpenAI o Anthropic; sin llamadas reales en esta fase.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{future.map((item) => { const Icon = item.icon; return <Card key={item.label}><CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Icon className="h-4 w-4 text-[#53665b]" /> {item.label}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Arquitectura preparada, implementacion pendiente.</CardContent></Card> })}</div><Card><CardContent className="flex items-center gap-3 pt-5 text-sm text-muted-foreground"><Bot className="h-4 w-4 text-[#b08d57]" /> Las futuras respuestas deberan respetar permisos, organizacion y auditoria por expediente.</CardContent></Card></div>
}
