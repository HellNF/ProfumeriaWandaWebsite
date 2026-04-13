import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { Prodotto } from '@/types/cms'

interface ProductCardProps {
  prodotto: Prodotto
}

export function ProductCard({ prodotto }: ProductCardProps) {
  const { nome, marca, prezzo, prezzoScontato, percentualeSconto, inPromozione, disponibile, formato, foto } = prodotto as any

  const primeraFoto = foto?.[0]?.immagine
  const immagine = primeraFoto && typeof primeraFoto === 'object' ? primeraFoto : null
  
  // Use card size if available for better performance
  let imageUrl = immagine?.sizes?.card?.url ?? immagine?.url

  // Fix per immagini locali: se l'URL è assoluto su localhost, lo rendiamo relativo
  if (imageUrl && imageUrl.startsWith('http://localhost:3000')) {
    imageUrl = imageUrl.replace('http://localhost:3000', '')
  }

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      {/* Badges Catchy */}
      {inPromozione && percentualeSconto && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="bg-wanda-fucsia text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg animate-bounce">
            -{percentualeSconto}%
          </span>
        </div>
      )}
      
      {disponibile === false && (
        <span className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
          <span className="bg-wanda-nero/80 text-white text-[10px] tracking-widest font-bold px-6 py-2 rounded-full uppercase shadow-lg">
            Esaurito
          </span>
        </span>
      )}

      {/* Image Container - Aspect 4/5 from Stitch */}
      <div className="aspect-[4/5] bg-wanda-surface-low relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={immagine?.alt ?? nome}
            fill
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${disponibile === false ? 'grayscale' : ''}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-wanda-surface-mid/20">
             <span className="text-wanda-outline opacity-20 italic">Wanda Selection</span>
          </div>
        )}
        
        {/* Formato ml sovrapposto all'immagine */}
        {formato && (
          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-wanda-nero shadow-sm">
            {formato}ml
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-6">
        {marca && (
          <p className="text-[10px] text-wanda-fucsia uppercase tracking-[0.3em] mb-2 font-bold">
            {typeof marca === 'object' ? (marca as any).nome : marca}
          </p>
        )}
        <h3 className="font-headline text-lg text-wanda-nero leading-tight mb-4 line-clamp-2 h-12">
          {nome}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {inPromozione && prezzoScontato != null ? (
              <>
                <span className="text-wanda-text-soft text-xs line-through opacity-50">
                  €{formatPrice(prezzo)}
                </span>
                <span className="text-wanda-fucsia font-black text-2xl tracking-tighter">
                  €{formatPrice(prezzoScontato)}
                </span>
              </>
            ) : prezzo != null ? (
              <span className="text-wanda-nero font-bold text-xl tracking-tight">€{formatPrice(prezzo)}</span>
            ) : (
              <span className="text-wanda-text-soft text-sm italic">In negozio</span>
            )}
          </div>
          
          <button className="p-3 bg-wanda-surface-low rounded-full text-wanda-fucsia hover:bg-wanda-fucsia hover:text-white transition-all active:scale-90 shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>
      </div>
    </article>
  )
}
