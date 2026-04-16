import React from 'react'
import { Star } from 'lucide-react'

interface Testimonial {
  autore: string
  recensione: string
  stelle: string
}

interface TestimonialsProps {
  reviews: Testimonial[]
}

export function Testimonials({ reviews }: TestimonialsProps) {
  if (reviews.length === 0) return null

  return (
    <section className="py-24 md:py-40 bg-transparent relative overflow-hidden">
      <div className="wanda-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Sidebar - Sticky on Desktop */}
          <div className="lg:col-span-4 space-y-8 reveal-on-scroll">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-wanda-fucsia/30"></span>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-wanda-fucsia">
                  Dicono di noi
                </span>
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline leading-[1.05] tracking-tight text-wanda-nero">
                Parola ai nostri <br className="hidden md:block" />
                <span className="italic font-medium text-wanda-fucsia/90">Ospiti</span>
              </h2>
            </div>
            
            <p className="text-wanda-text-soft/70 max-w-sm leading-relaxed font-body">
              Esperienze autentiche raccontate da chi vive ogni giorno la magia della nostra profumeria.
            </p>

            <div className="pt-4 flex items-center gap-4 reveal-on-scroll reveal-delay-200">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-wanda-bg bg-wanda-surface-mid flex items-center justify-center text-[10px] font-bold text-wanda-nero/40 uppercase">
                    W{i}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-wanda-fucsia">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3" fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-wanda-text-soft/60 mt-0.5">
                  5/5 Google Reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right Area - The Proto-Carousel */}
          <div className="lg:col-span-8 relative">
            {/* Guide Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-wanda-fucsia/5 hidden lg:block"></div>

            <div className="space-y-24 lg:pl-16">
              {reviews.map((rev, index) => (
                <article 
                  key={index} 
                  className={`relative group reveal-on-scroll reveal-delay-${Math.min(index * 150, 450)}`}
                >
                  <div className="space-y-6">
                    {/* Quotation mark integrated into flow */}
                    <div className="text-wanda-fucsia/20 font-headline text-6xl leading-none h-8 select-none">
                      &ldquo;
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl lg:text-3xl font-headline leading-snug text-wanda-nero/90 font-medium">
                      {rev.recensione}
                    </blockquote>

                    <footer className="flex items-center justify-between pt-4 border-t border-wanda-fucsia/5">
                      <div className="flex flex-col">
                        <cite className="not-italic font-bold text-sm tracking-widest uppercase text-wanda-nero">
                          {rev.autore}
                        </cite>
                        <span className="text-[11px] text-wanda-text-soft/50 font-medium mt-1">
                          Cliente verificato
                        </span>
                      </div>
                      
                      <div className="flex gap-1 text-wanda-fucsia/30 group-hover:text-wanda-fucsia/60 transition-colors duration-700">
                        {Array.from({ length: Math.min(Math.max(Number(rev.stelle) || 5, 1), 5) }).map((_, i) => (
                          <Star key={i} className="w-3 h-3" fill="currentColor" stroke="none" />
                        ))}
                      </div>
                    </footer>
                  </div>
                </article>
              ))}

              <div className="pt-12 reveal-on-scroll">
                <a 
                  href="https://www.google.com/search?q=profumeria+wanda+torino+recensioni" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-wanda-nero hover:text-wanda-fucsia transition-colors duration-500 font-bold text-xs uppercase tracking-[0.2em] group"
                >
                  <span>Scopri tutte le voci su Google</span>
                  <div className="w-8 h-[1px] bg-wanda-nero/20 group-hover:w-12 group-hover:bg-wanda-fucsia transition-all duration-500"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Structural Accents */}
      <div className="absolute top-0 right-0 w-[40vw] h-full bg-wanda-surface-low/30 -skew-x-12 translate-x-1/2 -z-10"></div>
    </section>
  )
}


