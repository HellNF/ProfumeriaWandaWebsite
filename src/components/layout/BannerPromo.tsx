import Link from 'next/link'
import type { ImpostazioniNegozio } from '@/types/cms'

interface BannerPromoProps {
  settings: ImpostazioniNegozio
}

export function BannerPromo({ settings }: BannerPromoProps) {
  const { bannerAttivo, testoBanner, linkBanner, coloreBanner } = settings

  if (!bannerAttivo || !testoBanner) return null

  const bgColors = {
    fucsia: 'bg-wanda-fucsia',
    nero: 'bg-wanda-nero',
    violetto: 'bg-wanda-violetto',
  }

  const bgColor = bgColors[coloreBanner ?? 'fucsia']

  const content = (
    <div className={`${bgColor} text-white py-2 px-4 text-center text-xs tracking-widest uppercase font-medium`}>
      {testoBanner}
    </div>
  )

  if (linkBanner) {
    return (
      <Link href={linkBanner} className="block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}
