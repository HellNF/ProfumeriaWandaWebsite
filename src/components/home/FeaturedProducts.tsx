import Link from 'next/link'
import Image from 'next/image'
import { ProductGrid } from '@/components/catalogo/ProductGrid'
import { getMediaUrl, getMediaAlt } from '@/lib/utils'
import type { Prodotto, Media } from '@/types/cms'

interface FeaturedProductsProps {
  prodotti: Prodotto[]
  title?: string | null
  immagineConsulenza?: Media | string | null | undefined
}

export function FeaturedProducts({ prodotti, title, immagineConsulenza }: FeaturedProductsProps) {
  if (prodotti.length === 0) return null

  const imgUrl = getMediaUrl(immagineConsulenza, "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ukCokQcWNYZeWe1P839o22ND7Anfgmd4lTY_AEkObfacToVwdFLxN1x1udJDjjmpxEBq4Q7kDuu8cnQop4MEfFXVNlThZ632sAbrcmNtx5UQBmIOIX7l2eWQ609iybIIUVUZQcnFmaOH1KGdBCyP9YNJokW9mPJBwA80z99Vi-NpXk5mEnfu_tkvArVSx6DLpRr0ZtnESv2-49PaLu-XwL6_OXnUf6EegluJHcn4JjMy9efATO5B67aOq1gdGie_JTgBjrHmfQc")
  const imgAlt = getMediaAlt(immagineConsulenza, "Atelier Interno")

  return (
    <div className="space-y-24">

      {/* ─── Selezione del mese — aria, nessun container ─── */}
      <section className="wanda-container py-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-4 reveal-on-scroll">
            <span className="text-wanda-fucsia font-bold uppercase tracking-[0.3em] text-xs">I Nostri Preferiti</span>
            <h2 className="text-3xl md:text-5xl font-bold text-wanda-nero">{title ?? 'In evidenza'}</h2>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-bold uppercase tracking-widest text-wanda-fucsia flex items-center gap-3 group active:scale-95 reveal-on-scroll"
            style={{ transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)' }}
          >
            Vedi tutto il catalogo
            <span style={{ transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)' }} className="group-hover:translate-x-1 inline-block">→</span>
          </Link>
        </div>
        <ProductGrid prodotti={prodotti} />
      </section>

      {/* ─── Consulenza Wanda — panel-glass standalone ─── */}
      <section className="wanda-container">
        <div className="panel-glass rounded-[2rem] p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6 reveal-on-scroll">
              <span className="text-wanda-fucsia font-bold uppercase tracking-[0.3em] text-sm">Curated with Love</span>
              <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight">La Consulenza di Wanda</h2>
              <p className="text-wanda-text-soft text-lg leading-relaxed italic">
                &quot;Crediamo che ogni donna meriti un momento di pura bellezza. Non vendiamo solo prodotti, curiamo esperienze che fanno bene all&apos;anima.&quot;
              </p>
              <div className="pt-4">
                <Link
                  href="/negozio"
                  className="text-wanda-fucsia font-bold flex items-center gap-2 group active:scale-95"
                  style={{ transition: 'opacity 400ms cubic-bezier(0.32,0.72,0,1)' }}
                >
                  Scopri la nostra storia
                  <span style={{ transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)' }} className="group-hover:translate-x-2 inline-block">→</span>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full relative reveal-on-scroll reveal-delay-200">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl rotate-2 relative">
                <Image
                  src={imgUrl}
                  alt={imgAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
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
