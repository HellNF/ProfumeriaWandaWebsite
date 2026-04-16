import { render, screen } from '@testing-library/react'
import { ProductCard } from '../ProductCard'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
})

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

  it('mostra la percentuale di sconto quando il prodotto e in promozione', () => {
    render(
      <ProductCard
        prodotto={{ ...prodottoBase, inPromozione: true, prezzoScontato: 90, percentualeSconto: 25 }}
      />,
    )

    expect(screen.getByText('-25%')).toBeInTheDocument()
  })

  it('mostra il prezzo scontato e quello barrato se in promozione', () => {
    render(
      <ProductCard
        prodotto={{ ...prodottoBase, inPromozione: true, prezzoScontato: 90, percentualeSconto: 25 }}
      />,
    )

    expect(screen.getByText('€90,00')).toBeInTheDocument()
    expect(screen.getByText('€120,00')).toBeInTheDocument()
  })

  it('mostra lo stato non disponibile se il prodotto non e acquistabile', () => {
    render(<ProductCard prodotto={{ ...prodottoBase, disponibile: false }} />)
    expect(screen.getByText('Non disponibile')).toBeInTheDocument()
    expect(screen.getByText('Esaurito')).toBeInTheDocument()
  })

  it('mostra un fallback coerente se il prezzo non e disponibile', () => {
    render(<ProductCard prodotto={{ ...prodottoBase, prezzo: null }} />)
    expect(screen.getByText('In Boutique')).toBeInTheDocument()
  })
})
