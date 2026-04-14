import { Suspense } from 'react'
import type { Metadata } from 'next'
import { FilterBar } from '@/components/catalogo/FilterBar'
import { ProductGrid } from '@/components/catalogo/ProductGrid'
import { ProductGridSkeleton } from '@/components/catalogo/ProductSkeleton'
import { getCatalogProducts, getStoreSettings } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getStoreSettings()
  return {
    title: 'Catalogo',
    description: `Scopri il catalogo completo di ${settings.nomeNegozio}: profumi, cosmetici, pelletteria e molto altro.`,
  }
}

interface Props {
  searchParams: Promise<{ categoria?: string; promo?: string; destinatario?: string }>
}

async function CatalogoContent({ searchParams }: Props) {
  const { categoria, promo, destinatario } = await searchParams
  const prodotti = await getCatalogProducts({
    categoria,
    promo: promo === '1',
    destinatario,
  })

  return (
    <>
      <FilterBar />
      <ProductGrid prodotti={prodotti} />
    </>
  )
}

export default async function CatalogoPage({ searchParams }: Props) {
  return (
    <main className="wanda-container pt-32 pb-20 min-h-screen space-y-12">
      {/* Header Section from Stitch */}
      <header className="text-center lg:text-left space-y-4 reveal-on-scroll">
        <h1 className="font-headline text-4xl md:text-6xl text-wanda-nero font-bold tracking-tight">
          La nostra selezione per te
        </h1>
        <p className="text-wanda-text-soft text-lg max-w-2xl leading-relaxed">
          Ogni prodotto è scelto con amore, pensando alla tua storia e alla tua bellezza. 
          Scopri l&apos;essenza dell&apos;artigianalità italiana e dei marchi internazionali più amati.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-12">
            <div className="h-20 bg-wanda-surface-low rounded-xl animate-pulse" />
            <ProductGridSkeleton count={6} />
          </div>
        }
      >
        <CatalogoContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
