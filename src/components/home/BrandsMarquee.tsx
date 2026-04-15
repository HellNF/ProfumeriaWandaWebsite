import Image from 'next/image'
import type { Marca, Media } from '@/types/cms'
import { getMediaUrl } from '@/lib/utils'

interface Props {
  marche: Marca[]
}

function BrandItem({ marca }: { marca: Marca }) {
  const logo = marca.logo as Media | null | undefined
  const logoUrl = logo ? getMediaUrl(logo, '') : ''
  const isJpegLogo = logo?.mimeType === 'image/jpeg' || logo?.mimeType === 'image/jpg'

  return (
    <div
      className="group flex-shrink-0 px-2.5"
      title={marca.nome}
    >
      <div className="flex h-[5.5rem] min-w-[11rem] items-center justify-center rounded-[2rem] bg-white/82 px-6 shadow-[0_24px_60px_-36px_rgba(180,0,93,0.35)] ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white">
        {logoUrl ? (
          <div className="relative h-11 w-32 md:h-12 md:w-36">
            <Image
              src={logoUrl}
              alt={marca.nome}
              fill
              sizes="(max-width: 768px) 128px, 144px"
              className="object-contain"
              style={isJpegLogo ? { mixBlendMode: 'multiply' } : undefined}
              unoptimized
            />
          </div>
        ) : (
          <span className="text-center text-xs font-bold tracking-[0.24em] text-wanda-text-soft uppercase transition-colors duration-300 group-hover:text-wanda-fucsia">
            {marca.nome}
          </span>
        )}
      </div>
      {logoUrl && (
        <div className="mt-3 text-center text-[0.62rem] font-bold tracking-[0.22em] text-wanda-text-soft/50 uppercase transition-colors duration-300 group-hover:text-wanda-fucsia/70">
          {marca.nome}
        </div>
      )}
    </div>
  )
}

export function BrandsMarquee({ marche }: Props) {
  if (!marche || marche.length === 0) return null

  // Duplica la lista per il loop seamless
  const doubled = [...marche, ...marche]

  return (
    <section className="overflow-hidden py-[4.5rem] reveal-on-scroll">
      <div className="wanda-container mb-10 md:mb-12">
        <p className="text-center text-[0.68rem] font-bold tracking-[0.32em] uppercase text-wanda-text-soft/55">
          I brand che trovi da noi
        </p>
        <h2 className="mt-4 text-center text-3xl text-wanda-nero md:text-4xl">
          Marchi storici, firme iconiche, scoperte da boutique
        </h2>
      </div>

      <div
        className="marquee-container relative w-full py-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,0,93,0.08),transparent_68%)] pointer-events-none" />
        <div className="absolute inset-y-2 left-0 right-0 rounded-full bg-white/38 pointer-events-none" />
        <div className="absolute inset-y-2 left-0 right-0 ring-1 ring-wanda-fucsia/6 rounded-full pointer-events-none" />

        <div className="marquee-track flex w-max items-start py-4">
          {doubled.map((marca, i) => (
            <BrandItem key={`${marca.id}-${i}`} marca={marca} />
          ))}
        </div>
      </div>
    </section>
  )
}
