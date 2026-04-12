import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

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

interface ProductCardProps {
  prodotto: Prodotto
}

export function ProductCard({ prodotto }: ProductCardProps) {
  const { nome, marca, prezzo, prezzoScontato, inPromozione, disponibile, foto } = prodotto

  const primeraFoto = foto?.[0]?.immagine
  const immagine = primeraFoto && typeof primeraFoto === 'object' ? primeraFoto : null

  return (
    <article className="group relative bg-white border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Badges */}
      {inPromozione && (
        <span className="absolute top-2 left-2 z-10 bg-wanda-fucsia text-white text-xs font-medium px-2 py-1">
          PROMO
        </span>
      )}
      {disponibile === false && (
        <span className="absolute top-2 right-2 z-10 bg-gray-400 text-white text-xs px-2 py-1">
          Non disponibile
        </span>
      )}

      {/* Immagine */}
      <div className="aspect-square bg-wanda-gray-light relative overflow-hidden">
        {immagine ? (
          <Image
            src={immagine.url}
            alt={immagine.alt ?? nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {marca && (
          <p className="text-xs text-wanda-gray-mid uppercase tracking-wider mb-1">{marca}</p>
        )}
        <h3 className="font-serif text-sm text-wanda-nero leading-tight mb-2 line-clamp-2">
          {nome}
        </h3>

        {prezzo != null && (
          <div className="flex items-center gap-2">
            {inPromozione && prezzoScontato != null ? (
              <>
                <span className="text-wanda-fucsia font-medium text-sm">
                  €{formatPrice(prezzoScontato)}
                </span>
                <span className="text-wanda-gray-mid text-xs line-through">
                  €{formatPrice(prezzo)}
                </span>
              </>
            ) : (
              <span className="text-wanda-nero font-medium text-sm">€{formatPrice(prezzo)}</span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
