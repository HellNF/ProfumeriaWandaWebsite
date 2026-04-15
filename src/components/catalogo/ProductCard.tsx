import Image from 'next/image'
import { formatPrice, normalizePayloadUrl } from '@/lib/utils'
import type { Prodotto, Media } from '@/types/cms'

interface ProductCardProps {
  prodotto: Prodotto
}

export function ProductCard({ prodotto }: ProductCardProps) {
  const { nome, marca, prezzo, prezzoScontato, percentualeSconto, inPromozione, disponibile, formato, foto } = prodotto

  const primeraFoto = foto?.[0]?.immagine
  const immagine = primeraFoto && typeof primeraFoto === 'object' ? primeraFoto : null
  
  const rawImageUrl = (immagine as Media)?.sizes?.card?.url ?? (immagine as Media)?.url
  const imageUrl = normalizePayloadUrl(rawImageUrl)

  return (
    <div className="group relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_38%,rgba(180,0,93,0.2),rgba(255,111,162,0.1)_38%,transparent_72%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <article className="relative z-10 bg-white rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-black/5 h-full flex flex-col">
        {/* Badges Catchy */}
        {inPromozione && percentualeSconto && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-wanda-fucsia text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg">
              -{percentualeSconto}%
            </span>
          </div>
        )}
        
        {disponibile === false && (
          <span aria-disabled="true" className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center p-6">
            <span className="bg-wanda-nero text-white text-[10px] tracking-widest font-bold px-6 py-2 rounded-full uppercase">
              Esaurito
            </span>
          </span>
        )}

        {/* Image Container */}
        <div className="aspect-[4/5] bg-wanda-surface-low relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={(immagine as Media)?.alt ?? nome}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${disponibile === false ? 'grayscale' : ''}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-wanda-surface-mid/20">
               <span className="text-wanda-nero opacity-30 italic text-xs tracking-tight">Selezione Wanda</span>
            </div>
          )}
          
          {formato && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-wanda-nero shadow-sm">
              {formato}ml
            </div>
          )}
        </div>

        {/* Info Container */}
        <div className="p-5 flex flex-col flex-1">
          {marca && (
            <p className="text-[10px] text-wanda-fucsia uppercase tracking-[0.25em] mb-2 font-bold">
              {typeof marca === 'object' ? marca.nome : marca}
            </p>
          )}
          <h3 className="font-headline text-lg text-wanda-nero leading-tight mb-4 line-clamp-2 h-12">
            {nome}
          </h3>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              {inPromozione && prezzoScontato != null ? (
                <>
                  <span className="text-wanda-text-soft text-[10px] line-through opacity-50">
                    €{formatPrice(prezzo ?? 0)}
                  </span>
                  <span className="text-wanda-fucsia font-bold text-xl tracking-tight">
                    €{formatPrice(prezzoScontato)}
                  </span>
                </>
              ) : prezzo != null ? (
                <span className="text-wanda-nero font-bold text-lg tracking-tight">€{formatPrice(prezzo)}</span>
              ) : (
                <span className="text-wanda-text-soft text-xs italic">Prezzo in negozio</span>
              )}
            </div>
            
            <button aria-label={`Aggiungi ${nome} al carrello`} className="p-2.5 bg-wanda-surface-low rounded-full text-wanda-nero hover:bg-wanda-nero hover:text-white transition-all active:scale-90 focus-visible:outline-2 focus-visible:outline-wanda-fucsia focus-visible:outline-offset-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
