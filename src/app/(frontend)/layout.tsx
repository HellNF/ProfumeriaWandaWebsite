import type { Metadata } from 'next'
import { Noto_Serif, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { BannerPromo } from '@/components/layout/BannerPromo'
import { RevealScript } from '@/components/layout/RevealScript'
import { AtmosphericBackground } from '@/components/layout/AtmosphericBackground'
import { getStoreSettings } from '@/lib/cms'
import { Suspense } from 'react'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const FALLBACK_DESCRIPTION =
  'Profumeria Wanda dal 1960: profumi, cosmetici, trucco, pelletteria e borse. Affiliata ETHOS.'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getStoreSettings()

    const description =
      (settings.metaDescrizioneDefault as string | null | undefined) ?? FALLBACK_DESCRIPTION

    const ogImage = typeof settings.ogImage === 'object' ? settings.ogImage : null

    return {
      title: {
        template: `%s | ${settings.nomeNegozio}`,
        default: `${settings.nomeNegozio} — Profumeria dal ${settings.annoFondazione ?? 1960}`,
      },
      description,
      icons: {
        icon: [
          { url: '/media/WandaFavicon.ico', sizes: 'any' },
          { url: '/media/WandaFavicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: '/media/WandaFavicon.ico',
        apple: '/media/WandaFavicon.ico',
      },
      metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'),
      openGraph: {
        siteName: settings.nomeNegozio,
        locale: 'it_IT',
        type: 'website',
        description,
        ...(ogImage && {
          images: [{ url: ogImage.url, alt: ogImage.alt ?? settings.nomeNegozio }],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        ...(ogImage && { images: [ogImage.url] }),
      },
    }
  } catch {
    return {
      title: {
        template: '%s | Profumeria Wanda',
        default: 'Profumeria Wanda — Profumeria dal 1960',
      },
      description: FALLBACK_DESCRIPTION,
      icons: {
        icon: [
          { url: '/media/WandaFavicon.ico', sizes: 'any' },
          { url: '/media/WandaFavicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: '/media/WandaFavicon.ico',
        apple: '/media/WandaFavicon.ico',
      },
      metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'),
      openGraph: {
        siteName: 'Profumeria Wanda',
        locale: 'it_IT',
        type: 'website',
      },
    }
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getStoreSettings()

  return (
    <html lang="it" className={`${notoSerif.variable} ${plusJakarta.variable}`}>
      <body className="font-body bg-wanda-bg text-wanda-nero antialiased">
        <AtmosphericBackground />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-wanda-fucsia focus:text-white focus:rounded-lg focus:font-bold focus:text-sm">
          Salta al contenuto principale
        </a>
        <BannerPromo settings={settings} />
        <Header settings={settings} />
        <div id="main-content">{children}</div>
        <Footer settings={settings} />
        <MobileNav />
        {/* Noise texture — grana carta, "tactile layers of fine stationery" (DESIGN.md) */}
        <div aria-hidden="true" className="noise-texture" />
        <Suspense fallback={null}>
          <RevealScript />
        </Suspense>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
