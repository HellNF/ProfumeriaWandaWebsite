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
    <div className="mb-12 space-y-3">
      {/* Riga 1: Categorie (scroll orizzontale) + toggle promo */}
      <div className="flex items-center gap-2 bg-wanda-surface-low rounded-xl p-2">
        {/* Scroll area con fade sui bordi */}
        <div className="relative flex-1 min-w-0">
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 w-max">
              {CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateFilter('categoria', value)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all duration-200 ${
                    activeCategory === value
                      ? 'bg-wanda-fucsia text-white shadow-sm'
                      : 'bg-transparent text-wanda-text-soft hover:bg-white hover:text-wanda-fucsia'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* Fade destra per indicare scroll */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-wanda-surface-low to-transparent pointer-events-none" />
        </div>

        {/* Divider + toggle promo — sempre visibile a destra */}
        <div className="shrink-0 flex items-center gap-3 border-l border-wanda-outline/20 pl-3">
          <label className="flex items-center cursor-pointer gap-2">
            <span className="text-xs font-bold text-wanda-text-soft whitespace-nowrap hidden sm:block">Offerte</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={onlyPromo}
                onChange={() => updateFilter('promo', onlyPromo ? '' : '1')}
                aria-label="Mostra solo prodotti in promozione"
              />
              <div className="w-10 h-5 bg-wanda-surface-mid rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-wanda-fucsia" />
            </div>
          </label>
        </div>
      </div>

      {/* Riga 2: Genere */}
      <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-wanda-outline/5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-wanda-outline shrink-0 mr-1">Per:</span>
        {GENDERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateFilter('destinatario', value)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              activeGender === value
                ? 'bg-wanda-nero text-white'
                : 'text-wanda-text-soft hover:bg-wanda-surface-low'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
