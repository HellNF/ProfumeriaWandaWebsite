import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { ParallaxHeroImage } from './ParallaxHeroImage'
import { normalizePayloadUrl } from '@/lib/utils'
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
  const rawUrl = typeof immagineHero === 'object' ? immagineHero?.url : immagineHero
  const imageUrl = normalizePayloadUrl(rawUrl)
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
    <section className="dot-accent-l relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden py-12 lg:py-20">
      <div className="wanda-container grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
        {/* Testo */}
        <div className="lg:col-span-6 z-10 space-y-6 lg:space-y-8 reveal-on-scroll">
          <div className="inline-flex items-center px-4 py-2 bg-wanda-fucsia/10 text-wanda-fucsia rounded-full font-bold text-[10px] tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 mr-2" /> IL TUO ANGOLO DI BELLEZZA
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-wanda-nero tracking-tight">
            {testoHero?.includes(',') ? (
              <>
                {testoHero.split(',')[0]},<br />
                <span className="italic text-wanda-fucsia">{testoHero.split(',')[1]}</span>
              </>
            ) : (
              testoHero ?? 'Più di un negozio, un consiglio amico.'
            )}
          </h1>

          {/* Mobile Image (Visible only on mobile/tablet) */}
          <div className="lg:hidden relative h-[400px] sm:h-[500px] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-wanda-fucsia/10 to-transparent rounded-xl rotate-2" />
            <div className="absolute top-4 left-4 w-[calc(100%-32px)] h-[calc(100%-32px)] p-[4px] rounded-[1.25rem] z-0 bg-wanda-fucsia/5 ring-1 ring-wanda-fucsia/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div className="w-full h-full rounded-[16px] overflow-hidden shadow-xl">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="100vw"
                    className={`${fitClass} ${positionClass} scale-105`}
                    priority
                  />
                )}
              </div>
            </div>
            {/* Mobile Floating Card */}
            <div className="absolute -bottom-2 -right-2 w-48 card-dialogue z-20 -rotate-1 p-4 md:p-6">
              <p className="font-headline italic text-sm md:text-base leading-snug text-wanda-nero">
                &quot;Wanda capisce i miei desideri.&quot;
              </p>
            </div>
          </div>

          <p className="text-lg lg:text-xl text-wanda-text-soft max-w-xl leading-relaxed font-body">
            {sottotitoloHero ?? 'Benvenuta nel nostro Digital Ateliér. Qui non vendiamo solo prodotti, curiamo la tua essenza con la gentilezza di una chiacchierata tra amiche.'}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
            <Link href={ctaHeroUrl ?? '/catalogo'} className="btn-primary active:scale-[0.97] group flex items-center gap-3 !px-8 lg:!px-10">
              {ctaHeroLabel ?? 'Esplora il catalogo'}
              <span
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-px"
                style={{ transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)' }}
              >→</span>
            </Link>
            <Link
              href="/negozio"
              className="flex items-center gap-3 text-wanda-fucsia font-bold group active:scale-[0.97] text-sm sm:text-base"
              style={{ transition: 'opacity 400ms cubic-bezier(0.32,0.72,0,1)' }}
            >
              La nostra storia
              <span style={{ transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)' }} className="group-hover:translate-x-2 inline-block">→</span>
            </Link>
          </div>
        </div>

        {/* Desktop Image with Card Fluttuante (Visible only on desktop) */}
        <div className="lg:col-span-6 relative h-[600px] hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-wanda-fucsia/10 to-transparent rounded-xl rotate-3" />
          {/* Double-bezel: outer shell */}
          <div className="absolute top-10 left-10 w-4/5 h-[80%] p-[6px] rounded-[1.25rem] z-0 reveal-on-scroll reveal-delay-200 bg-wanda-fucsia/5 ring-1 ring-wanda-fucsia/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            {/* Double-bezel: inner core */}
            <div className="w-full h-full rounded-[14px] overflow-hidden shadow-2xl">
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
