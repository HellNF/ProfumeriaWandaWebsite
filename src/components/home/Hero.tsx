import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { ParallaxHeroImage } from './ParallaxHeroImage'
import type { Media } from '@/types/cms'

interface HeroProps {
  testoHero?: string | null
  sottotitoloHero?: string | null
  immagineHero?: Media | string | null
  heroImageFit?: 'cover' | 'contain' | null
  heroImagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | null
  ctaHeroLabel?: string | null
  ctaHeroUrl?: string | null
}

export function Hero({ 
  testoHero, 
  sottotitoloHero, 
  immagineHero, 
  heroImageFit = 'cover',
  heroImagePosition = 'center',
  ctaHeroLabel, 
  ctaHeroUrl 
}: HeroProps) {
  // Helper per estrarre l'URL correttamente
  const getUrl = (img: Media | string | null | undefined) => {
    if (typeof img === 'object' && img?.url) {
      if (img.url.startsWith('http://localhost:3000')) {
        return img.url.replace('http://localhost:3000', '')
      }
      return img.url
    }
    if (typeof img === 'string') {
      if (img.startsWith('http://localhost:3000')) {
        return img.replace('http://localhost:3000', '')
      }
      if (img.startsWith('/') || img.startsWith('http')) {
        return img
      }
    }
    return null
  }

  const imageUrl = getUrl(immagineHero)
  const imageAlt = (typeof immagineHero === 'object' && immagineHero?.alt) || 'Atelier Wanda'

  // Mappatura delle posizioni CSS
  const positionClasses = {
    center: 'object-center',
    top: 'object-top',
    bottom: 'object-bottom',
    left: 'object-left',
    right: 'object-right',
  }

  const fitClass = heroImageFit === 'contain' ? 'object-contain' : 'object-cover'
  const positionClass = positionClasses[heroImagePosition ?? 'center']

  return (
    <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden py-12 lg:py-20">
      <div className="wanda-container grid lg:grid-cols-12 gap-12 items-center w-full">
        {/* Testo */}
        <div className="lg:col-span-6 z-10 space-y-8 reveal-on-scroll">
          <div className="inline-flex items-center px-4 py-2 bg-wanda-fucsia/10 text-wanda-fucsia rounded-full font-bold text-[10px] tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 mr-2" /> IL TUO ANGOLO DI BELLEZZA
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-wanda-nero tracking-tight">            {testoHero?.includes(',') ? (
              <>
                {testoHero.split(',')[0]},<br />
                <span className="italic text-wanda-fucsia">{testoHero.split(',')[1]}</span>
              </>
            ) : (
              testoHero ?? 'Più di un negozio, un consiglio amico.'
            )}
          </h1>

          <p className="text-xl text-wanda-text-soft max-w-xl leading-relaxed font-body">
            {sottotitoloHero ?? 'Benvenuta nel nostro Digital Ateliér. Qui non vendiamo solo prodotti, curiamo la tua essenza con la gentilezza di una chiacchierata tra amiche.'}
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link href={ctaHeroUrl ?? '/catalogo'} className="btn-primary active:scale-95">
              {ctaHeroLabel ?? 'Esplora il catalogo'}
            </Link>
            <Link href="/negozio" className="flex items-center gap-3 text-wanda-fucsia font-bold group active:scale-95">
              La nostra storia
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </div>

        {/* Immagine con Card Fluttuante */}
        <div className="lg:col-span-6 relative h-[600px] hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-wanda-fucsia/10 to-transparent rounded-xl rotate-3" />
          <div className="absolute top-10 left-10 w-4/5 h-[80%] rounded-xl overflow-hidden shadow-2xl z-0 reveal-on-scroll reveal-delay-200">
            {imageUrl && (
              <ParallaxHeroImage>
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`${fitClass} ${positionClass} scale-110`}
                  priority
                />
              </ParallaxHeroImage>
            )}
          </div>

          {/* Card Fluttuante (Testimonial o Info) */}
          <div className="absolute bottom-4 right-0 w-64 card-dialogue z-20 -rotate-2 reveal-on-scroll reveal-delay-400">
            <p className="font-headline italic text-lg leading-snug text-wanda-nero">
              &quot;Wanda ha saputo capire esattamente ciò che cercavo.&quot;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-wanda-fucsia/20" />
              <span className="text-sm font-bold opacity-70 italic text-wanda-text-soft">— Chiara M.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
