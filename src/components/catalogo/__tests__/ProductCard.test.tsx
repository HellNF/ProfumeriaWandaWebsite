import { render, screen } from '@testing-library/react'
import { ProductCard } from '../ProductCard'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

const prodottoBase = {
  id: '1',
  nome: 'Acqua di Parma Colonia',
  marca: 'Acqua di Parma',
  categoria: 'profumeria' as const,
  descrizione: 'Una fragranza iconica.',
  foto: [],
  prezzo: 120,
  inPromozione: false,
  prezzoScontato: null,
  disponibile: true,
  inEvidenza: false,
  createdAt: '',
  updatedAt: '',
}

describe('ProductCard', () => {
  it('mostra il nome del prodotto', () => {
    render(<ProductCard prodotto={prodottoBase} />)
    expect(screen.getByText('Acqua di Parma Colonia')).toBeInTheDocument()
  })

  it('mostra la marca', () => {
    render(<ProductCard prodotto={prodottoBase} />)
    expect(screen.getByText('Acqua di Parma')).toBeInTheDocument()
  })

  it('mostra il prezzo formattato con virgola', () => {
    render(<ProductCard prodotto={prodottoBase} />)
    expect(screen.getByText('€120,00')).toBeInTheDocument()
  })

  it('mostra badge PROMO se inPromozione è true', () => {
    render(<ProductCard prodotto={{ ...prodottoBase, inPromozione: true, prezzoScontato: 90 }} />)
    expect(screen.getByText('PROMO')).toBeInTheDocument()
  })

  it('mostra prezzo scontato e prezzo barrato se in promozione', () => {
    render(<ProductCard prodotto={{ ...prodottoBase, inPromozione: true, prezzoScontato: 90 }} />)
    expect(screen.getByText('€90,00')).toBeInTheDocument()
    expect(screen.getByText('€120,00')).toBeInTheDocument()
  })

  it('mostra badge Non disponibile se disponibile è false', () => {
    render(<ProductCard prodotto={{ ...prodottoBase, disponibile: false }} />)
    expect(screen.getByText('Non disponibile')).toBeInTheDocument()
  })

  it('non mostra il prezzo se prezzo è null', () => {
    render(<ProductCard prodotto={{ ...prodottoBase, prezzo: null }} />)
    expect(screen.queryByText(/€/)).not.toBeInTheDocument()
  })
})
