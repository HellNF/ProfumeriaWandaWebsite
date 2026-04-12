import { Suspense } from 'react'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { FilterBar } from '@/components/catalogo/FilterBar'
import { ProductGrid } from '@/components/catalogo/ProductGrid'

export const metadata: Metadata = {
  title: 'Catalogo',
  description:
    'Scopri il catalogo completo di Profumeria Wanda: profumi, cosmetici, pelletteria e molto altro.',
}

interface Props {
  searchParams: Promise<{ categoria?: string; promo?: string }>
}

export default async function CatalogoPage({ searchParams }: Props) {
  const { categoria, promo } = await searchParams

  const payload = await getPayload({ config: configPromise })

  const where: Where = {}
  if (categoria) where.categoria = { equals: categoria }
  if (promo === '1') where.inPromozione = { equals: true }

  const { docs: prodotti } = await payload.find({
    collection: 'prodotti',
    where,
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-10">
        <p className="text-wanda-fucsia text-xs tracking-[0.3em] uppercase mb-2">Collezione</p>
        <h1 className="font-serif text-4xl text-wanda-nero">Catalogo</h1>
      </div>

      <Suspense>
        <FilterBar />
      </Suspense>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ProductGrid prodotti={prodotti as any} />
    </main>
  )
}
