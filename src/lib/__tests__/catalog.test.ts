import {
  hasCatalogFilters,
  parseCatalogSearchParams,
  type CatalogSearchParams,
} from '@/lib/catalog'

describe('parseCatalogSearchParams', () => {
  it('accetta soltanto valori validi del catalogo', () => {
    const filters = parseCatalogSearchParams({
      categoria: 'profumeria',
      promo: '1',
      destinatario: 'donna',
    })

    expect(filters).toEqual({
      categoria: 'profumeria',
      promo: true,
      destinatario: 'donna',
    })
  })

  it('ignora query params non validi o ripetuti', () => {
    const params: CatalogSearchParams = {
      categoria: ['profumeria', 'trucco'],
      promo: '0',
      destinatario: 'bambino',
    }

    expect(parseCatalogSearchParams(params)).toEqual({
      categoria: 'profumeria',
      promo: false,
      destinatario: undefined,
    })
  })

  it('calcola correttamente la presenza di filtri attivi', () => {
    expect(hasCatalogFilters({})).toBe(false)
    expect(hasCatalogFilters({ promo: true })).toBe(true)
  })
})
