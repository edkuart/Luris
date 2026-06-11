import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luris | Gestion Juridica Inteligente',
  description: 'Plataforma SaaS privada para despachos juridicos de Guatemala.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full" style={{ '--font-ui': 'Inter, Source Sans 3, system-ui, sans-serif', '--font-display': 'Merriweather, Georgia, serif' } as React.CSSProperties}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
