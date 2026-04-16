import Link from 'next/link'
import { ProductGrid } from '@/components/catalogo/ProductGrid'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import type { Prodotto } from '@/types/cms'

interface FeaturedProductsProps {
  prodotti: Prodotto[]
  title?: string | null
}

export function FeaturedProducts({ prodotti, title }: FeaturedProductsProps) {
  if (prodotti.length === 0) return null

  return (
    <div className="py-24 md:py-32">

      {/* Asymmetric Header Section */}
      <section className="wanda-container mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          <div className="lg:col-span-8 space-y-6 reveal-on-scroll">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-wanda-fucsia animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-wanda-fucsia">
                I Nostri Preferiti
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-[0.9] tracking-tighter text-wanda-nero max-w-2xl">
              {title ?? 'In evidenza'}
            </h2>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end pb-2 reveal-on-scroll reveal-delay-200">
            <Link
              href="/catalogo"
              className="group relative inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-wanda-nero transition-colors duration-500 hover:text-wanda-fucsia"
            >
              <span>Vedi tutto il catalogo</span>
              <div className="w-10 h-10 rounded-full border border-wanda-nero/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-wanda-fucsia group-hover:border-wanda-fucsia group-hover:text-white group-hover:rotate-45">
                <ArrowTopRightIcon className="w-4 h-4" />
              </div>
            </Link>
          </div>

        </div>
        
        {/* Subtle separator line */}
        <div className="w-full h-px bg-gradient-to-r from-wanda-fucsia/10 via-wanda-fucsia/5 to-transparent mt-12" />
      </section>

      <section className="wanda-container">
        <ProductGrid prodotti={prodotti} />
      </section>

    </div>
  )
}

