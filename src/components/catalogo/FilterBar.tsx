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
  { value: 'idee-regalo', label: 'Idee Regalo' },
  { value: 'altro', label: 'Altro' },
]

const GENDERS = [
  { value: '', label: 'Tutti' },
  { value: 'donna', label: 'Donna' },
  { value: 'uomo', label: 'Uomo' },
  { value: 'unisex', label: 'Unisex' },
]

export function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('categoria') ?? ''
  const activeGender = searchParams.get('destinatario') ?? ''
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
    <div className="space-y-6 mb-12">
      {/* Categorie */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-wanda-surface-low p-4 rounded-xl">
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateFilter('categoria', value)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                activeCategory === value
                  ? 'bg-wanda-fucsia text-white shadow-md'
                  : 'bg-white text-wanda-text-soft hover:text-wanda-fucsia border border-wanda-outline/10 hover:border-wanda-fucsia/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-l border-wanda-outline/20 pl-6 h-full">
          <label className="flex items-center cursor-pointer gap-3">
            <span className="text-sm font-bold text-wanda-text-soft">Solo in promozione</span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={onlyPromo}
                onChange={() => updateFilter('promo', onlyPromo ? '' : '1')}
              />
              <div className="w-11 h-6 bg-wanda-surface-mid rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-wanda-fucsia"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Destinatario (Solo se categoria non è Altro o Borse) */}
      <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-wanda-outline/5 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold uppercase tracking-widest text-wanda-text-soft px-4 shrink-0">Filtra per:</span>
        <div className="flex gap-2">
          {GENDERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateFilter('destinatario', value)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeGender === value
                  ? 'bg-wanda-nero text-white'
                  : 'bg-wanda-surface-low text-wanda-text-soft hover:bg-wanda-surface-mid'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
