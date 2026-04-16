import configPromise from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload, type Where } from 'payload'
import type { CatalogFilters } from '@/lib/catalog'
import type { ImpostazioniNegozio, Marca, Prodotto, Testimonial } from '@/types/cms'

const DEFAULT_SETTINGS: ImpostazioniNegozio = {
  nomeNegozio: 'Profumeria Wanda',
  annoFondazione: 1960,
}

export async function getStoreSettings(): Promise<ImpostazioniNegozio> {
  'use cache'
  cacheTag('impostazioni-negozio')
  cacheLife('minutes')

  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({
      slug: 'impostazioni-negozio',
      depth: 1,
    })
    return (settings as unknown as ImpostazioniNegozio) || DEFAULT_SETTINGS
  } catch (err) {
    console.error('Error fetching store settings:', err)
    return DEFAULT_SETTINGS
  }
}

export async function getFeaturedProducts(): Promise<Prodotto[]> {
  'use cache'
  cacheTag('prodotti')
  cacheLife('minutes')

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'prodotti',
      where: { inEvidenza: { equals: true } },
      limit: 6,
      depth: 1,
    })
    return (docs as unknown as Prodotto[]) || []
  } catch (err) {
    console.error('Error fetching featured products:', err)
    return []
  }
}

export async function getCatalogProducts(filters: CatalogFilters): Promise<Prodotto[]> {
  'use cache'
  cacheTag('prodotti')
  cacheLife('minutes')

  try {
    const payload = await getPayload({ config: configPromise })
    const where: Where = {}

    if (filters.categoria) {
      where.categoria = { equals: filters.categoria }
    }

    if (filters.promo) {
      where.inPromozione = { equals: true }
    }

    if (filters.destinatario) {
      where.destinatario = { equals: filters.destinatario }
    }

    const { docs } = await payload.find({
      collection: 'prodotti',
      where,
      limit: 100,
      sort: '-createdAt',
      depth: 1,
    })

    return (docs as unknown as Prodotto[]) || []
  } catch (err) {
    console.error('Error fetching catalog products:', err)
    return []
  }
}

export async function getBrands(): Promise<Marca[]> {
  'use cache'
  cacheTag('marche')
  cacheLife('hours')

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'marche',
      limit: 100,
      sort: 'nome',
      depth: 1,
    })
    return (docs as unknown as Marca[]) || []
  } catch (err) {
    console.error('Error fetching brands:', err)
    return []
  }
}

export async function getReviews(): Promise<Testimonial[]> {
  'use cache'
  cacheTag('recensioni')
  cacheLife('minutes')

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'recensioni',
      limit: 3,
      sort: '-createdAt',
    })
    return (docs as unknown as Testimonial[]) || []
  } catch (err) {
    console.error('Error fetching reviews:', err)
    return []
  }
}
