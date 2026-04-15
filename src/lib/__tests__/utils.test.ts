import { formatPrice, getCategoryLabel, getDiscountPercent, normalizePayloadUrl } from '../utils'

describe('formatPrice', () => {
  it('formatta numeri interi con due decimali', () => {
    expect(formatPrice(25)).toBe('25,00')
  })
  it('formatta prezzi decimali correttamente', () => {
    expect(formatPrice(12.5)).toBe('12,50')
  })
  it('usa la virgola come separatore decimale', () => {
    expect(formatPrice(9.99)).toBe('9,99')
  })
})

describe('getCategoryLabel', () => {
  it('restituisce etichetta italiana per categorie note', () => {
    expect(getCategoryLabel('profumeria')).toBe('Profumeria')
    expect(getCategoryLabel('cosmetici')).toBe('Cosmetici')
    expect(getCategoryLabel('trucco')).toBe('Trucco')
    expect(getCategoryLabel('pelletteria')).toBe('Pelletteria')
    expect(getCategoryLabel('borse-valigie')).toBe('Borse & Valigie')
    expect(getCategoryLabel('altro')).toBe('Altro')
  })
  it('restituisce il valore grezzo per categorie sconosciute', () => {
    expect(getCategoryLabel('xyz')).toBe('xyz')
  })
})

describe('getDiscountPercent', () => {
  it('calcola correttamente lo sconto del 20%', () => {
    expect(getDiscountPercent(100, 80)).toBe(20)
  })
  it('arrotonda al numero intero più vicino', () => {
    expect(getDiscountPercent(30, 20)).toBe(33)
  })
  it('restituisce 0 se i prezzi sono uguali', () => {
    expect(getDiscountPercent(50, 50)).toBe(0)
  })
})

describe('normalizePayloadUrl', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SERVER_URL

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://profumeriawanda.it'
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_SERVER_URL = originalEnv
  })

  it('non modifica URL Supabase già assoluti', () => {
    const url = 'https://kcenuiwiyhschkgqattd.supabase.co/storage/v1/object/public/wanda-media/foto.webp'
    expect(normalizePayloadUrl(url)).toBe(url)
  })

  it('sostituisce localhost con NEXT_PUBLIC_SERVER_URL', () => {
    const url = 'http://localhost:3000/media/foto.webp'
    expect(normalizePayloadUrl(url)).toBe('https://profumeriawanda.it/media/foto.webp')
  })

  it('restituisce null per input null/undefined', () => {
    expect(normalizePayloadUrl(null)).toBeNull()
    expect(normalizePayloadUrl(undefined)).toBeNull()
  })
})
