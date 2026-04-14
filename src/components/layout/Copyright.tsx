'use client'

import { useEffect, useState } from 'react'

export function Copyright({ nomeNegozio }: { nomeNegozio: string }) {
  const [year, setYear] = useState<number | string>('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setYear(new Date().getFullYear())
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span>© {year} {nomeNegozio}. Tutti i diritti riservati.</span>
  )
}
