'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

const CATEGORIES = [
  { value: '', label: 'Tutti' },
  { value: 'profumeria', label: 'Profumeria' },
  { value: 'cosmetici', label: 'Cosmetici' },
  { value: 'trucco', label: 'Trucco' },
  { value: 'pelletteria', label: 'Pelletteria' },
  { value: 'borse-valigie', label: 'Borse & Valigie' },
  { value: 'altro', label: 'Altro' },
]

export function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('categoria') ?? ''
  const onlyPromo = searchParams.get('promo') === '1'

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname, searchParams],
  )

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => updateFilter('categoria', value)}
          className={`px-4 py-2 text-xs tracking-wider uppercase border transition-colors duration-200 ${
            activeCategory === value
              ? 'bg-wanda-nero text-white border-wanda-nero'
              : 'bg-white text-wanda-nero border-gray-200 hover:border-wanda-nero'
          }`}
        >
          {label}
        </button>
      ))}

      <button
        onClick={() => updateFilter('promo', onlyPromo ? '' : '1')}
        aria-pressed={onlyPromo}
        className={`px-4 py-2 text-xs tracking-wider uppercase border transition-colors duration-200 ml-auto ${
          onlyPromo
            ? 'bg-wanda-fucsia text-white border-wanda-fucsia'
            : 'bg-white text-wanda-fucsia border-wanda-fucsia hover:bg-wanda-fucsia hover:text-white'
        }`}
      >
        Solo in promozione
      </button>
    </div>
  )
}
