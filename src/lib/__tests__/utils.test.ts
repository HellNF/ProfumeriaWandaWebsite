import { formatPrice, getCategoryLabel, getDiscountPercent } from '../utils'

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
