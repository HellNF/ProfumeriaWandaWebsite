import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  description: 'Profumeria Wanda - Profumi, Cosmetici e Pelletteria a Verona',
  title: 'Profumeria Wanda',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
