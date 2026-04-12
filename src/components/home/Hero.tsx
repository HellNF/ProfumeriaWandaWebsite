// src/components/home/Hero.tsx
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  testoHero?: string | null
  sottotitoloHero?: string | null
  immagineHero?: { url: string; alt?: string } | null
}

export function Hero({ testoHero, sottotitoloHero, immagineHero }: HeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[480px] flex items-center overflow-hidden bg-wanda-nero">
      {/* Background image */}
      {immagineHero && (
        <Image
          src={immagineHero.url}
          alt={immagineHero.alt ?? 'Profumeria Wanda'}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-wanda-nero/80 via-wanda-nero/40 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <p className="text-wanda-fucsia text-xs tracking-[0.3em] uppercase mb-4">
          Profumeria dal 1960
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-4 max-w-xl">
          {testoHero ?? 'Bellezza e stile dal 1960'}
        </h1>
        {sottotitoloHero && (
          <p className="text-gray-300 text-lg mb-8 max-w-md">{sottotitoloHero}</p>
        )}
        <Link href="/catalogo" className="btn-primary inline-block">
          Scopri il catalogo
        </Link>
      </div>
    </section>
  )
}
