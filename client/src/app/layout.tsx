import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Danse Macabre',
  description: 'Tienda de esoterismo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
