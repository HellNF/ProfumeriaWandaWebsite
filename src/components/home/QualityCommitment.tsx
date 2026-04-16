import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface QualityCommitmentProps {
  image: string
  alt: string
}

export function QualityCommitment({ image, alt }: QualityCommitmentProps) {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden">
      {/* Background Structural Accent */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-0 w-1/3 h-[1px] bg-wanda-fucsia/5"></div>
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-wanda-fucsia/[0.02] rounded-full blur-3xl"></div>
      </div>

      <div className="wanda-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Image Side - Double Bezel Architecture */}
          <div className="lg:col-span-6 reveal-on-scroll">
            <div className="relative group">
              {/* Outer Shell */}
              <div className="relative p-3 md:p-4 bg-wanda-surface-low/50 rounded-[2.5rem] border border-wanda-fucsia/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.01]">
                {/* Inner Core */}
                <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[calc(2.5rem-1rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-wanda-nero/10 to-transparent"></div>
                </div>
                
                {/* Floating Badge Label */}
                <div className="absolute -bottom-6 -right-6 md:right-12 bg-white/80 backdrop-blur-xl border border-wanda-fucsia/10 p-6 rounded-2xl shadow-xl max-w-[200px] reveal-on-scroll reveal-delay-400">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-wanda-fucsia mb-2">Heritage</p>
                  <p className="text-sm font-headline italic leading-snug text-wanda-nero">
                    Oltre sei decenni di dedizione alla bellezza.
                  </p>
                </div>
              </div>

              {/* Decorative Geometric Element */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-wanda-fucsia/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-6 space-y-12 reveal-on-scroll reveal-delay-200">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-wanda-fucsia bg-wanda-fucsia/5 rounded-full uppercase">
                Ethos Exclusive Partner
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold leading-[0.95] tracking-tighter text-wanda-nero">
                Qualità garantita, <br />
                <span className="text-wanda-fucsia italic font-medium">da generazioni.</span>
              </h2>

              <div className="h-[1px] w-24 bg-wanda-fucsia/20"></div>
              
              <p className="text-lg md:text-xl text-wanda-text-soft/80 leading-relaxed font-body max-w-lg">
                Come partner <strong>ETHOS Profumerie</strong>, garantiamo l&apos;autenticità assoluta di ogni prodotto e un&apos;esperienza di consulenza certificata dai più alti standard internazionali.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
              <Link 
                href="/negozio" 
                className="group relative inline-flex items-center gap-6 px-8 py-4 bg-wanda-nero text-white rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-500 hover:bg-wanda-fucsia hover:shadow-2xl hover:shadow-wanda-fucsia/20 active:scale-[0.98]"
              >
                <span>Esplora i Servizi</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link 
                href="/catalogo" 
                className="text-xs font-bold uppercase tracking-[0.3em] text-wanda-nero/40 hover:text-wanda-fucsia transition-colors duration-500 border-b border-transparent hover:border-wanda-fucsia pb-1"
              >
                Vedi il Catalogo
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
