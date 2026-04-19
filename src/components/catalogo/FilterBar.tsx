'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { CATALOG_CATEGORIES, CATALOG_GENDERS } from '@/lib/catalog'

const ALL_CATEGORIES_OPTION = { value: '', label: 'Tutte le Collezioni' } as const
const ALL_GENDERS_OPTION = { value: '', label: 'Tutti' } as const

export function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const categoryOptions = [ALL_CATEGORIES_OPTION, ...CATALOG_CATEGORIES]

  const activeCategory = searchParams.get('categoria') ?? ''
  const activeGender = searchParams.get('destinatario') ?? ''
  const onlyPromo = searchParams.get('promo') === '1'
  const activeCategoryLabel =
    categoryOptions.find((category) => category.value === activeCategory)?.label ??
    ALL_CATEGORIES_OPTION.label

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      const qs = params.toString()
      const url = qs ? `${pathname}?${qs}` : pathname

      startTransition(() => {
        router.replace(url, { scroll: false })
      })
    },
    [router, pathname, searchParams],
  )

  const clearAll = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
  }, [pathname, router])

  const isFiltered = !!(activeCategory || activeGender || onlyPromo)

  return (
    <section
      aria-label="Filtri catalogo"
      className={`mb-20 space-y-8 transition-opacity duration-500 ${isPending ? 'pointer-events-none opacity-60' : 'opacity-100'}`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-wanda-fucsia">
              Categorie
            </p>
            <span className="hidden h-1 w-1 rounded-full bg-wanda-nero/20 sm:block" />
            <p className="text-sm text-wanda-text-soft/75">
              {activeCategory ? activeCategoryLabel : `${categoryOptions.length} categorie visibili`}
            </p>
          </div>

          {activeCategory && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => updateFilter('categoria', '')}
              className="rounded-full bg-wanda-surface-low px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-wanda-fucsia transition-all duration-300 hover:bg-wanda-surface-mid/60 active:scale-95"
            >
              Mostra tutto
            </button>
          )}
        </div>

        <div
          role="toolbar"
          aria-label="Filtro per categoria"
          className="flex lg:flex-wrap gap-2.5 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          {categoryOptions.map(({ value, label }) => {
            const isActive = activeCategory === value
            const isAllOption = value === ''

            return (
              <button
                key={value}
                type="button"
                disabled={isPending}
                aria-pressed={isActive}
                aria-label={label}
                onClick={() => updateFilter('categoria', value)}
                className={`group/category inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 lg:px-4 lg:py-3 text-left transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] shrink-0 ${
                  isActive
                    ? 'bg-wanda-nero text-white shadow-lg'
                    : 'bg-wanda-surface-low/70 text-wanda-nero hover:bg-wanda-surface-low'
                } ${
                  isAllOption ? 'pr-6 lg:pr-5' : ''
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? 'bg-white/12 text-white'
                      : 'bg-white/75 text-wanda-fucsia'
                  }`}
                >
                  {isActive ? <CheckIcon className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </span>
                <span className={`text-sm font-bold tracking-tight ${isAllOption ? 'pr-1' : ''}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Secondary Controls */}
      <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 px-1">
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          <div
            role="toolbar"
            aria-label="Filtro per destinatario"
            className="flex rounded-full border border-wanda-nero/5 bg-wanda-surface-low/30 p-1"
          >
            {[ALL_GENDERS_OPTION, ...CATALOG_GENDERS].map(({ value, label }) => {
              const isActive = activeGender === value
              return (
                <button
                  key={value}
                  type="button"
                  disabled={isPending}
                  aria-pressed={isActive}
                  onClick={() => updateFilter('destinatario', value)}
                  className={`px-4 lg:px-5 py-2.5 lg:py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 active:scale-95 ${
                    isActive
                      ? 'bg-white text-wanda-nero shadow-sm'
                      : 'text-wanda-nero/30 hover:text-wanda-nero/60'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={() => updateFilter('promo', onlyPromo ? '' : '1')}
            className={`group/promo flex items-center gap-3 px-5 py-2.5 lg:py-2 rounded-full border transition-all duration-500 active:scale-95 ${
              onlyPromo
                ? 'bg-wanda-fucsia/10 border-wanda-fucsia/20 text-wanda-fucsia'
                : 'bg-transparent border-wanda-nero/5 text-wanda-nero/40 hover:border-wanda-fucsia/20 hover:text-wanda-fucsia/60'
            }`}
            aria-pressed={onlyPromo}
            aria-label="Mostra solo prodotti in promozione"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Promozioni</span>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500 ${
              onlyPromo ? 'bg-wanda-fucsia text-white' : 'bg-wanda-surface-mid/50 group-hover/promo:bg-wanda-fucsia/20'
            }`}>
              {onlyPromo && <CheckIcon className="w-3 h-3" />}
            </div>
          </button>
        </div>

        {isFiltered && (
          <button
            type="button"
            disabled={isPending}
            onClick={clearAll}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-wanda-fucsia hover:opacity-70 transition-all active:scale-95"
          >
            <Cross1Icon className="w-3 h-3" />
            <span>Reset Filtri</span>
          </button>
        )}
      </div>
    </section>
  )
}


