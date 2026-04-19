import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload, type Where } from 'payload'
import type { CatalogFilters } from '@/lib/catalog'
import type { ImpostazioniNegozio, Marca, Prodotto, Testimonial } from '@/types/cms'

const DEFAULT_SETTINGS: ImpostazioniNegozio = {
  nomeNegozio: 'Profumeria Wanda',
  annoFondazione: 1960,
}

export const getStoreSettings = unstable_cache(
  async (): Promise<ImpostazioniNegozio> => {
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
  },
  ['impostazioni-negozio'],
  { tags: ['impostazioni-negozio'], revalidate: 60 }
)

export const getFeaturedProducts = unstable_cache(
  async (): Promise<Prodotto[]> => {
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
  },
  ['prodotti-featured'],
  { tags: ['prodotti'], revalidate: 60 }
)

export const getCatalogProducts = unstable_cache(
  async (filters: CatalogFilters): Promise<Prodotto[]> => {
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
  },
  ['prodotti-catalog'],
  { tags: ['prodotti'], revalidate: 60 }
)

export const getBrands = unstable_cache(
  async (): Promise<Marca[]> => {
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
  },
  ['marche'],
  { tags: ['marche'], revalidate: 3600 }
)

export const getReviews = unstable_cache(
  async (): Promise<Testimonial[]> => {
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
  },
  ['recensioni'],
  { tags: ['recensioni'], revalidate: 60 }
)
