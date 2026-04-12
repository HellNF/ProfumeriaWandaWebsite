// src/components/catalogo/ProductGrid.tsx
import { ProductCard } from './ProductCard'

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

interface ProductGridProps {
  prodotti: Prodotto[]
}

export function ProductGrid({ prodotti }: ProductGridProps) {
  if (prodotti.length === 0) {
    return (
      <div className="text-center py-20 text-wanda-gray-mid">
        <p className="font-serif text-xl mb-2">Nessun prodotto trovato</p>
        <p className="text-sm">Prova a modificare i filtri</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {prodotti.map((prodotto) => (
        <ProductCard key={prodotto.id} prodotto={prodotto} />
      ))}
    </div>
  )
}
