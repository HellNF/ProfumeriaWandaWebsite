export const CATALOG_CATEGORIES = [
  { value: 'profumeria', label: 'Profumeria' },
  { value: 'cosmetici', label: 'Skincare' },
  { value: 'trucco', label: 'Make-up' },
  { value: 'pelletteria', label: 'Pelletteria' },
  { value: 'borse-valigie', label: 'Borse' },
  { value: 'idee-regalo', label: 'Idee Regalo' },
  { value: 'altro', label: 'Accessori' },
] as const

export const CATALOG_GENDERS = [
  { value: 'donna', label: 'Donna' },
  { value: 'uomo', label: 'Uomo' },
  { value: 'unisex', label: 'Unisex' },
] as const

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number]['value']
export type CatalogGender = (typeof CATALOG_GENDERS)[number]['value']

export type CatalogFilters = {
  categoria?: CatalogCategory
  promo?: boolean
  destinatario?: CatalogGender
}

export type CatalogSearchParams = Record<string, string | string[] | undefined>

const CATALOG_CATEGORY_SET = new Set<string>(CATALOG_CATEGORIES.map(({ value }) => value))
const CATALOG_GENDER_SET = new Set<string>(CATALOG_GENDERS.map(({ value }) => value))

function getFirstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export function isCatalogCategory(value: string): value is CatalogCategory {
  return CATALOG_CATEGORY_SET.has(value)
}

export function isCatalogGender(value: string): value is CatalogGender {
  return CATALOG_GENDER_SET.has(value)
}

export function parseCatalogSearchParams(searchParams: CatalogSearchParams): CatalogFilters {
  const rawCategoria = getFirstValue(searchParams.categoria)
  const rawPromo = getFirstValue(searchParams.promo)
  const rawDestinatario = getFirstValue(searchParams.destinatario)

  return {
    categoria: rawCategoria && isCatalogCategory(rawCategoria) ? rawCategoria : undefined,
    promo: rawPromo === '1',
    destinatario:
      rawDestinatario && isCatalogGender(rawDestinatario) ? rawDestinatario : undefined,
  }
}

export function hasCatalogFilters(filters: CatalogFilters): boolean {
  return Boolean(filters.categoria || filters.destinatario || filters.promo)
}

export function getCatalogCategoryLabel(value: string): string {
  return CATALOG_CATEGORIES.find((category) => category.value === value)?.label ?? value
}
