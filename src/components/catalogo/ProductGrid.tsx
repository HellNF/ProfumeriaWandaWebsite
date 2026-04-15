import Link from 'next/link'
import { ProductCard } from './ProductCard'
import type { Prodotto } from '@/types/cms'

interface ProductGridProps {
  prodotti: Prodotto[]
  filtraggioAttivo?: boolean
}

export function ProductGrid({ prodotti, filtraggioAttivo = false }: ProductGridProps) {
  if (prodotti.length === 0) {
    return filtraggioAttivo ? (
      <div className="text-center py-24 px-4 bg-wanda-surface-low rounded-xl space-y-4">
        <div className="text-5xl">🔍</div>
        <p className="font-headline text-2xl text-wanda-nero italic">
          Nessun risultato trovato
        </p>
        <p className="text-wanda-text-soft">
          Nessun prodotto corrisponde ai filtri selezionati.
        </p>
        <Link
          href="/catalogo"
          className="inline-block mt-2 text-sm font-bold text-wanda-fucsia border-b-2 border-wanda-fucsia pb-0.5 hover:opacity-70 transition-opacity"
        >
          Rimuovi tutti i filtri
        </Link>
      </div>
    ) : (
      <div className="text-center py-24 px-4 bg-wanda-surface-low rounded-xl">
        <p className="font-headline text-2xl text-wanda-nero mb-3 italic">
          Nessun prodotto disponibile al momento
        </p>
        <p className="text-sm text-wanda-text-soft tracking-wide">
          Stiamo aggiornando il nostro catalogo. Torna a trovarci presto!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-widest text-wanda-outline">
        {prodotti.length} {prodotti.length === 1 ? 'prodotto' : 'prodotti'}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {prodotti.map((prodotto, index) => (
          <div
            key={prodotto.id}
            className={`transition-transform duration-300 ${index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-2'}`}
          >
            <ProductCard prodotto={prodotto} />
          </div>
        ))}
      </div>
    </div>
  )
}
