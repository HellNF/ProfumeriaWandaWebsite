import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  href: string
  title: string
  description: string
  image: string
  alt: string
  className?: string
  priority?: boolean
  variant?: 'dark' | 'light' | 'fuchsia'
}

function CategoryCard({ href, title, description, image, alt, className = '', priority = false }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-wanda-surface-low transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_64px_100px_-30px_rgba(0,0,0,0.12)] active:scale-[0.99] reveal-on-scroll ${className}`}
    >
      {/* Outer Border Shell */}
      <div className="absolute inset-0 p-[1px] border border-black/5 rounded-[2.5rem] z-20 pointer-events-none" />

      {/* Image Core */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          priority={priority}
        />
        
        {/* Neutral Sophisticated Overlay */}
        <div className="absolute inset-0 bg-wanda-nero opacity-10 group-hover:opacity-40 transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-wanda-nero/60 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end z-10">
        <div className="space-y-4">
          <h3 className="text-4xl md:text-6xl font-bold font-headline leading-[0.9] tracking-tighter text-white">
            {title}
          </h3>
          <p className="text-lg text-white/70 max-w-[300px] leading-snug opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] delay-100">
            {description}
          </p>
          
          <div className="pt-2 flex items-center gap-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] delay-200">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Scopri di più</span>
            <div className="w-12 h-px bg-white/40" />
          </div>
        </div>
      </div>
    </Link>
  )
}


interface CategoryBentoProps {
  images: {
    fragranze: { url: string; alt: string }
    skincare: { url: string; alt: string }
    makeup: { url: string; alt: string }
    accessori: { url: string; alt: string }
  }
}

export function CategoryBento({ images }: CategoryBentoProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="wanda-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 h-auto lg:h-[900px]">
          
          {/* Row 1: 8 + 4 */}
          <CategoryCard
            href="/catalogo?categoria=profumeria"
            title="Fragranze"
            description="Essenze ricercate che raccontano la tua storia senza parole."
            image={images.fragranze.url}
            alt={images.fragranze.alt}
            className="lg:col-span-8 min-h-[400px]"
            priority
          />
          
          <CategoryCard
            href="/catalogo?categoria=cosmetici"
            title="Skincare"
            description="Trattamenti gentili per una pelle che risplende."
            image={images.skincare.url}
            alt={images.skincare.alt}
            className="lg:col-span-4 min-h-[350px]"
            variant="fuchsia"
          />

          {/* Row 2: 4 + 8 (Inverted for visual variance) */}
          <CategoryCard
            href="/catalogo?categoria=trucco"
            title="Make-up"
            description="Dettagli di colore per esaltare la tua bellezza naturale."
            image={images.makeup.url}
            alt={images.makeup.alt}
            className="lg:col-span-4 min-h-[350px]"
            variant="dark"
          />

          <CategoryCard
            href="/catalogo?categoria=pelletteria"
            title="Accessori"
            description="Borse e piccoli tesori per completare il tuo stile."
            image={images.accessori.url}
            alt={images.accessori.alt}
            className="lg:col-span-8 min-h-[400px]"
            variant="light"
          />
          
        </div>
      </div>
    </section>
  )
}
