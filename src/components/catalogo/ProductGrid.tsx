'use client'

import type { CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { ProductCard } from './ProductCard'
import type { Prodotto } from '@/types/cms'

interface ProductGridProps {
  prodotti: Prodotto[]
  filtraggioAttivo?: boolean
}

export function ProductGrid({ prodotti, filtraggioAttivo = false }: ProductGridProps) {
  const router = useRouter()

  if (prodotti.length === 0) {
    return filtraggioAttivo ? (
      <div className="text-center py-32 px-4 bg-wanda-surface-low/30 rounded-[3rem] border border-wanda-fucsia/5 space-y-6 reveal-on-scroll">
        <div className="text-6xl grayscale opacity-30">🔍</div>
        <div className="space-y-2">
          <p className="font-headline text-3xl text-wanda-nero italic font-medium">
            Nessun tesoro trovato
          </p>
          <p className="text-wanda-text-soft/60 max-w-xs mx-auto text-sm leading-relaxed">
            La ricerca non ha prodotto risultati. Prova a cambiare i filtri o esplora l&apos;intera collezione.
          </p>
        </div>
        <button
          onClick={() => router.push('/catalogo')}
          className="inline-block mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-wanda-fucsia border-b border-wanda-fucsia/30 pb-1 hover:border-wanda-fucsia transition-colors cursor-pointer"
        >
          Rimuovi tutti i filtri
        </button>
      </div>
    ) : (
      <div className="text-center py-32 px-4 bg-wanda-surface-low/30 rounded-[3rem] border border-wanda-fucsia/5 reveal-on-scroll">
        <p className="font-headline text-3xl text-wanda-nero mb-4 italic font-medium">
          Il catalogo si sta aggiornando
        </p>
        <p className="text-xs text-wanda-text-soft/50 tracking-[0.2em] uppercase font-bold">
          Nessun prodotto disponibile in questo momento.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wanda-fucsia/40">
          <span className="text-wanda-nero font-bold mr-2">{prodotti.length}</span> 
          {prodotti.length === 1 ? 'prodotto selezionato' : 'prodotti in atelier'}
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-wanda-fucsia/10 to-transparent ml-8 hidden md:block" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-y-24">
        {prodotti.map((prodotto, index) => {
          // Asymmetric vertical offset for staggered editorial feel
          const isOffset = index % 4 === 1 || index % 4 === 3;
          
          return (
            <div
              key={prodotto.id}
              className={`reveal-on-scroll transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isOffset ? 'md:translate-y-12' : 'md:translate-y-0'
              }`}
              style={{
                transitionDelay: `${(index % 8) * 100}ms`
              } as CSSProperties}
            >
              <ProductCard prodotto={prodotto} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

