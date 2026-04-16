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
    <section className="wanda-container py-24 bg-wanda-bg relative overflow-hidden">
      <div className="text-center mb-16 space-y-4 reveal-on-scroll">
        <span className="text-wanda-fucsia font-bold uppercase tracking-[0.3em] text-xs">Dicono di noi</span>
        <h2 className="text-3xl md:text-5xl font-bold font-headline">Parola ai nostri Ospiti</h2>
        <div className="flex justify-center items-center gap-1 text-wanda-fucsia">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4" fill="currentColor" />
          ))}
          <span className="ml-2 text-wanda-text-soft text-sm font-bold">5/5 su Google</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {reviews.map((rev, index) => (
          <div
            key={index}
            className={`card-dialogue flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 reveal-on-scroll reveal-delay-${Math.min(index * 100, 400)} ${
              index % 2 === 1 ? 'md:mt-12' : ''
            }`}
          >
            <div className="space-y-4">
              <div className="text-wanda-fucsia text-4xl font-headline opacity-15 leading-none">&ldquo;</div>
              <p className="text-wanda-text-soft italic leading-relaxed font-body">
                {rev.recensione}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-wanda-fucsia/5 flex items-center justify-between">
              <span className="font-bold text-wanda-nero tracking-tight">&mdash; {rev.autore}</span>
              <div className="flex gap-0.5 text-wanda-fucsia">
                {Array.from({ length: Math.min(Math.max(Number(rev.stelle) || 5, 1), 5) }).map((_, i) => (
                  <Star key={i} className="w-3 h-3" fill="currentColor"/>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wanda-fucsia/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="mt-20 text-center">
        <a 
          href="https://www.google.com/search?q=profumeria+wanda+torino+recensioni" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-wanda-fucsia font-bold border-b-2 border-wanda-fucsia pb-1 hover:opacity-70 transition-opacity"
        >
          Leggi tutte le recensioni su Google
        </a>
      </div>
    </section>
  )
}
