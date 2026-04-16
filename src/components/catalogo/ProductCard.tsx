'use client'

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
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(180,0,93,0.05),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-1000 group-hover:opacity-100"
      />

      <article className="relative z-10 flex flex-col h-full group/card">
        {/* Image Container - Double Bezel Architecture */}
        <div className="relative aspect-[3/4] mb-5">
          <div className="relative h-full p-1.5 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:shadow-[0_48px_80px_-20px_rgba(180,0,93,0.1)]">
            <div className="relative w-full h-full overflow-hidden rounded-[calc(2.2rem-1rem)] shadow-inner bg-wanda-surface-low">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={(immagine as Media)?.alt ?? nome}
                  fill
                  className={`object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:scale-110 ${disponibile === false ? 'grayscale blur-[1px] opacity-60' : ''}`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                   <span className="text-wanda-nero/10 italic text-[10px] tracking-widest uppercase">Selezione Wanda</span>
                </div>
              )}
              
              {/* Promo Badge */}
              {inPromozione && percentualeSconto && disponibile !== false && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-wanda-fucsia text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg tracking-tighter">
                    -{percentualeSconto}%
                  </span>
                </div>
              )}

              {/* Status Overlay */}
              {disponibile === false && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                  <span className="bg-wanda-nero/80 backdrop-blur-md text-white text-[9px] tracking-[0.3em] font-bold px-6 py-2 rounded-full uppercase border border-white/10 shadow-2xl">
                    Esaurito
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section - Data-Rich Editorial Label */}
        <div className="px-1 flex flex-col flex-1 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              {marca && (
                <p className="text-[10px] text-wanda-fucsia font-bold uppercase tracking-[0.25em] truncate">
                  {typeof marca === 'object' ? marca.nome : marca}
                </p>
              )}
              {formato && (
                <span className="text-[9px] font-bold text-wanda-nero/30 tracking-[0.1em] uppercase shrink-0">
                  {formato}ML
                </span>
              )}
            </div>
            
            <h3 className="font-headline text-lg md:text-xl text-wanda-nero leading-[1.15] tracking-tight line-clamp-2 min-h-[2.3em] group-hover/card:text-wanda-fucsia transition-colors duration-500">
              {nome}
            </h3>
          </div>

          <div className="pt-3 border-t border-wanda-fucsia/5 mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              {inPromozione && prezzoScontato != null ? (
                <>
                  <span className="text-wanda-text-soft/40 text-[10px] font-bold line-through tracking-wider">
                    €{formatPrice(prezzo ?? 0)}
                  </span>
                  <span className="text-wanda-fucsia font-bold text-2xl tracking-tighter leading-none">
                    €{formatPrice(prezzoScontato)}
                  </span>
                </>
              ) : prezzo != null ? (
                <span className="text-wanda-nero font-bold text-xl tracking-tighter leading-none">€{formatPrice(prezzo)}</span>
              ) : (
                <span className="text-wanda-text-soft/40 text-[9px] font-bold uppercase tracking-[0.2em] italic">In Boutique</span>
              )}
            </div>
            
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                disponibile === false
                  ? 'bg-wanda-nero/5 text-wanda-nero/40'
                  : 'bg-wanda-surface-low text-wanda-fucsia group-hover/card:bg-wanda-fucsia group-hover/card:text-white'
              }`}
            >
              {disponibile === false ? 'Non disponibile' : 'In atelier'}
            </span>
          </div>
        </div>
      </article>
    </div>
  )
}



