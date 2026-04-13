'use client'

import { useEffect, useState } from 'react'

export function Copyright({ nomeNegozio }: { nomeNegozio: string }) {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <span>© {year ?? ''} {nomeNegozio}. Tutti i diritti riservati.</span>
  )
}
