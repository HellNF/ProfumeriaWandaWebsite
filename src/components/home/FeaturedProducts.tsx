import Link from 'next/link'
import Image from 'next/image'
import { ProductGrid } from '@/components/catalogo/ProductGrid'
import type { Prodotto } from '@/types/cms'

interface FeaturedProductsProps {
  prodotti: Prodotto[]
  title?: string | null
}

export function FeaturedProducts({ prodotti, title }: FeaturedProductsProps) {
  if (prodotti.length === 0) return null

  return (
    <div className="space-y-24">
      <section className="container mx-auto px-8 py-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-wanda-fucsia font-bold uppercase tracking-[0.3em] text-xs">I Nostri Preferiti</span>
            <h2 className="text-4xl md:text-5xl font-bold text-wanda-nero">{title ?? 'In evidenza'}</h2>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-bold uppercase tracking-widest text-wanda-fucsia hover:translate-x-1 transition-all flex items-center gap-3 group"
          >
            Vedi tutto il catalogo <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <ProductGrid prodotti={prodotti} />
      </section>

      {/* Curated Selection Section (from Stitch) */}
      <section className="container mx-auto px-8">
        <div className="bg-white p-12 rounded-xl border border-wanda-fucsia/10 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <span className="text-wanda-fucsia font-bold uppercase tracking-[0.3em] text-sm">Curated with Love</span>
              <h2 className="text-4xl font-bold font-headline leading-tight">La Consulenza di Wanda</h2>
              <p className="text-wanda-text-soft text-lg leading-relaxed italic">
                "Crediamo che ogni donna meriti un momento di pura bellezza. Non vendiamo solo prodotti, curiamo esperienze che fanno bene all'anima."
              </p>
              <div className="pt-4">
                <Link href="/negozio" className="text-wanda-fucsia font-bold flex items-center gap-2 group">
                  Scopri la nostra storia 
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl rotate-2 relative">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_ukCokQcWNYZeWe1P839o22ND7Anfgmd4lTY_AEkObfacToVwdFLxN1x1udJDjjmpxEBq4Q7kDuu8cnQop4MEfFXVNlThZ632sAbrcmNtx5UQBmIOIX7l2eWQ609iybIIUVUZQcnFmaOH1KGdBCyP9YNJokW9mPJBwA80z99Vi-NpXk5mEnfu_tkvArVSx6DLpRr0ZtnESv2-49PaLu-XwL6_OXnUf6EegluJHcn4JjMy9efATO5B67aOq1gdGie_JTgBjrHmfQc"
                  alt="Atelier Interno"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-wanda-fucsia/10 backdrop-blur-md p-6 rounded-lg shadow-xl -rotate-2 hidden md:block border border-white/40">
                <p className="font-headline text-wanda-fucsia font-bold text-xl italic">Dal 1960 a casa tua.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
