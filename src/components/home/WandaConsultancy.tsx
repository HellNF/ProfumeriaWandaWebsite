import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface WandaConsultancyProps {
  image: string
  alt: string
}

export function WandaConsultancy({ image, alt }: WandaConsultancyProps) {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden">
      {/* Background structural detail */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-wanda-surface-low/20 -z-10 hidden lg:block" />
      
      <div className="wanda-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Content Side - Asymmetric focus */}
          <div className="lg:col-span-5 space-y-10 reveal-on-scroll">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3">
                <span className="w-10 h-[1px] bg-wanda-fucsia"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-wanda-fucsia">
                  Curated with Love
                </span>
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-[1.05] tracking-tight text-wanda-nero">
                La Consulenza <br />
                <span className="italic font-medium text-wanda-fucsia/90">di Wanda</span>
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line accent */}
              <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-wanda-fucsia/10" />
              <blockquote className="text-xl md:text-2xl font-headline italic leading-relaxed text-wanda-text-soft font-medium">
                &ldquo;Crediamo che ogni donna meriti un momento di pura bellezza. Non vendiamo solo prodotti, curiamo esperienze che fanno bene all&apos;anima.&rdquo;
              </blockquote>
            </div>

            <div className="pt-6">
              <Link 
                href="/negozio" 
                className="group inline-flex items-center gap-6 text-sm font-bold uppercase tracking-[0.2em] text-wanda-nero hover:text-wanda-fucsia transition-colors duration-500"
              >
                <span>La nostra Storia</span>
                <div className="w-12 h-12 rounded-full border border-wanda-nero/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-wanda-fucsia group-hover:border-wanda-fucsia group-hover:text-white group-hover:translate-x-2">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Image Side - Double Bezel & Parallax-ish feel */}
          <div className="lg:col-span-7 reveal-on-scroll reveal-delay-200">
            <div className="relative">
              {/* Outer Shell */}
              <div className="relative p-4 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/60 shadow-[0_60px_100px_-30px_rgba(180,0,93,0.08)] -rotate-1">
                {/* Inner Core */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(3rem-1rem)] shadow-inner">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-[2000ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-wanda-fucsia/5 mix-blend-overlay" />
                </div>

                {/* Floating Info Tag */}
                <div className="absolute -bottom-8 left-12 bg-wanda-nero text-white px-8 py-6 rounded-2xl shadow-2xl reveal-on-scroll reveal-delay-500 hidden md:block border border-white/10">
                  <p className="font-headline text-xl italic font-bold text-wanda-fucsia-light">Dal 1960</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mt-1">A casa tua</p>
                </div>
              </div>

              {/* Decorative Circle Accent */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-wanda-fucsia/5 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
