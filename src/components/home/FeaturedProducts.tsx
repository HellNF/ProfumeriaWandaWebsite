// src/components/home/FeaturedProducts.tsx
import Link from 'next/link'
import { ProductGrid } from '@/components/catalogo/ProductGrid'

interface Foto {
  immagine: { url: string; alt?: string } | string | null
}

interface Prodotto {
  id: string
  nome: string
  marca?: string | null
  prezzo?: number | null
  inPromozione?: boolean | null
  prezzoScontato?: number | null
  disponibile?: boolean | null
  foto?: Foto[] | null
}

interface FeaturedProductsProps {
  prodotti: Prodotto[]
}

export function FeaturedProducts({ prodotti }: FeaturedProductsProps) {
  if (prodotti.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-wanda-fucsia text-xs tracking-[0.3em] uppercase mb-2">Selezione</p>
          <h2 className="font-serif text-3xl text-wanda-nero">In evidenza</h2>
        </div>
        <Link
          href="/catalogo"
          className="text-sm tracking-wider uppercase text-wanda-gray-mid hover:text-wanda-nero transition-colors hidden md:block"
          aria-label="Vedi tutto il catalogo"
        >
          Vedi tutto →
        </Link>
      </div>

      <ProductGrid prodotti={prodotti} />

      <div className="text-center mt-8 md:hidden">
        <Link href="/catalogo" className="btn-outline inline-block">
          Vedi tutto il catalogo
        </Link>
      </div>
    </section>
  )
}
