// src/app/(frontend)/page.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [settings, { docs: prodottiInEvidenza }] = await Promise.all([
    payload.findGlobal({ slug: 'impostazioni-negozio' }),
    payload.find({
      collection: 'prodotti',
      where: { inEvidenza: { equals: true } },
      limit: 6,
    }),
  ])

  const immagineHero =
    settings.immagineHero && typeof settings.immagineHero === 'object'
      ? (settings.immagineHero as { url: string; alt?: string })
      : null

  return (
    <main>
      <Hero
        testoHero={settings.testoHero}
        sottotitoloHero={settings.sottotitoloHero}
        immagineHero={immagineHero}
      />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <FeaturedProducts prodotti={prodottiInEvidenza as any} />
    </main>
  )
}
