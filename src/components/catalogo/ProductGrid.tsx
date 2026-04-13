import { ProductCard } from './ProductCard'
import type { Prodotto } from '@/types/cms'

interface ProductGridProps {
  prodotti: Prodotto[]
}

export function ProductGrid({ prodotti }: ProductGridProps) {
  if (prodotti.length === 0) {
    return (
      <div className="text-center py-24 px-4 bg-wanda-gray-light rounded-sm">
        <p className="font-serif text-2xl text-wanda-nero mb-3 italic">
          Nessun prodotto disponibile al momento
        </p>
        <p className="text-sm text-wanda-gray-mid tracking-wide">
          Stiamo aggiornando il nostro catalogo. Torna a trovarci presto!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {prodotti.map((prodotto) => (
        <ProductCard key={prodotto.id} prodotto={prodotto} />
      ))}
    </div>
  )
}
