import { Suspense } from 'react'
import type { Metadata } from 'next'
import { FilterBar } from '@/components/catalogo/FilterBar'
import { ProductGrid } from '@/components/catalogo/ProductGrid'
import { ProductGridSkeleton } from '@/components/catalogo/ProductSkeleton'
import {
  hasCatalogFilters,
  parseCatalogSearchParams,
  type CatalogSearchParams,
} from '@/lib/catalog'
import { getCatalogProducts, getStoreSettings } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getStoreSettings()
  return {
    title: 'Catalogo',
    description: `Scopri il catalogo completo di ${settings.nomeNegozio}: profumi, cosmetici, pelletteria e molto altro.`,
  }
}

interface Props {
  searchParams: Promise<CatalogSearchParams>
}

async function CatalogoContent({ searchParams }: Props) {
  const filters = parseCatalogSearchParams(await searchParams)
  const prodotti = await getCatalogProducts(filters)
  const filtraggioAttivo = hasCatalogFilters(filters)

  return <ProductGrid prodotti={prodotti} filtraggioAttivo={filtraggioAttivo} />
}

export default async function CatalogoPage({ searchParams }: Props) {
  return (
    <main className="pb-32 min-h-screen">
      {/* Editorial Header Section */}
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-48 md:pb-12">
        <div className="wanda-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            <div className="lg:col-span-8 space-y-6 md:space-y-8 reveal-on-scroll">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-wanda-fucsia/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-wanda-fucsia">
                  Atelier Wanda
                </span>
              </div>
              
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.9] tracking-tighter text-wanda-nero max-w-4xl">
                La nostra <br />
                <span className="italic font-medium text-wanda-fucsia/90">Selezione</span>
              </h1>
            </div>

            <div className="lg:col-span-4 reveal-on-scroll reveal-delay-200">
              <p className="text-base md:text-xl text-wanda-text-soft/70 leading-relaxed font-body max-w-sm italic">
                Ogni pezzo è un racconto di bellezza, scelto con la cura e l&apos;amore che ci contraddistinguono dal 1960.
              </p>
            </div>

          </div>
        </div>

        {/* Background Atmospheric Detail */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-wanda-surface-low/30 -z-10 -skew-x-12 translate-x-1/4 pointer-events-none" />
      </section>

      <div className="wanda-container -mt-4 md:mt-0">
        {/* FilterBar wrapped in its own Suspense to comply with Next.js dynamic rendering rules */}
        <Suspense fallback={<div className="h-24 md:h-32 w-full bg-wanda-surface-low/20 animate-pulse rounded-full mb-12 md:mb-20" />}>
          <FilterBar />
        </Suspense>

        <Suspense
          fallback={
            <div className="space-y-16">
              <ProductGridSkeleton count={8} />
            </div>
          }
        >
          <CatalogoContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  )
}


