import { getCatalogCategoryLabel } from '@/lib/catalog'
import type { Media } from '@/types/cms'

/**
 * Normalizza URL assoluti da Payload CMS in URL relativi.
 * In dev Payload salva URL assoluti su localhost; in prod usa NEXT_PUBLIC_SERVER_URL.
 * Con Supabase gli URL sono già assoluti (https://...) — non li modifica.
 * next/image non accetta URL assoluti interni a meno che non siano in remotePatterns.
 */
export function normalizePayloadUrl(url: string | null | undefined): string | null {
  if (!url) return null
  // URL già assoluti (es. Supabase Storage) — non toccare
  if (url.startsWith('https://') || url.startsWith('//')) return url
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, serverUrl)
}

/**
 * Estrae e normalizza l'URL da un campo immagine Payload (Media | string | null).
 * Ritorna fallback se l'immagine non è disponibile.
 */
export function getMediaUrl(img: Media | string | null | undefined, fallback: string): string {
  if (typeof img === 'object' && img?.url) {
    return normalizePayloadUrl(img.url) ?? fallback
  }
  if (typeof img === 'string') {
    return normalizePayloadUrl(img) ?? fallback
  }
  return fallback
}

export function getMediaAlt(img: Media | string | null | undefined, fallback: string): string {
  return (typeof img === 'object' && img?.alt) ? img.alt : fallback
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',')
}

export function getCategoryLabel(value: string): string {
  return getCatalogCategoryLabel(value)
}

export function getDiscountPercent(prezzo: number, prezzoScontato: number): number {
  if (prezzo === 0) return 0
  return Math.round(((prezzo - prezzoScontato) / prezzo) * 100)
}
