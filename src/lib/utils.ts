export function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',')
}

export function getCategoryLabel(value: string): string {
  const labels: Record<string, string> = {
    profumeria: 'Profumeria',
    cosmetici: 'Cosmetici',
    trucco: 'Trucco',
    pelletteria: 'Pelletteria',
    'borse-valigie': 'Borse & Valigie',
    altro: 'Altro',
  }
  return labels[value] ?? value
}

export function getDiscountPercent(prezzo: number, prezzoScontato: number): number {
  if (prezzo === 0) return 0
  return Math.round(((prezzo - prezzoScontato) / prezzo) * 100)
}
