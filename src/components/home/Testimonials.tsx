import React from 'react'

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
        <div className="flex justify-center gap-1 text-wanda-fucsia">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-xl">★</span>
          ))}
          <span className="ml-2 text-wanda-text-soft text-sm font-bold self-center">5/5 su Google</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {reviews.map((rev, index) => (
          <div 
            key={index} 
            className={`card-dialogue flex flex-col justify-between h-full transform transition-all duration-500 hover:-translate-y-2 reveal-on-scroll reveal-delay-${index * 100} ${
              index === 1 ? 'md:translate-y-8' : ''
            }`}
          >
            <div className="space-y-4">
              <div className="text-wanda-fucsia text-4xl font-serif opacity-20">“</div>
              <p className="text-wanda-text-soft italic leading-relaxed font-body">
                {rev.recensione}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-wanda-fucsia/5 flex items-center justify-between">
              <span className="font-bold text-wanda-nero tracking-tight">— {rev.autore}</span>
              <div className="flex text-wanda-fucsia text-xs">
                {Array.from({ length: Math.min(Math.max(Number(rev.stelle) || 5, 1), 5) }).map((_, i) => (
                  <span key={i}>★</span>
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
