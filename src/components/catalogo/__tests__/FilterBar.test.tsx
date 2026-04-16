import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterBar } from '../FilterBar'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

const mockReplace = jest.fn()

beforeEach(() => {
  mockReplace.mockClear()
  ;(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace })
  ;(usePathname as jest.Mock).mockReturnValue('/catalogo')
  ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
})

describe('FilterBar', () => {
  it('mostra il filtro generale come attivo di default', () => {
    render(<FilterBar />)

    const tutteBtn = screen.getByRole('button', { name: 'Tutte le Collezioni' })
    expect(tutteBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('renderizza le opzioni di categoria allineate al catalogo', () => {
    render(<FilterBar />)

    expect(screen.getByRole('button', { name: 'Profumeria' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Skincare' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Make-up' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pelletteria' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Borse' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Idee Regalo' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Accessori' })).toBeInTheDocument()
  })

  it('aggiorna la query string usando replace quando si seleziona una categoria', async () => {
    const user = userEvent.setup()
    render(<FilterBar />)

    await user.click(screen.getByRole('button', { name: 'Profumeria' }))

    expect(mockReplace).toHaveBeenCalledWith('/catalogo?categoria=profumeria', { scroll: false })
  })

  it('mostra il reset quando c è almeno un filtro attivo', () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('promo=1'))

    render(<FilterBar />)

    expect(screen.getByRole('button', { name: /reset filtri/i })).toBeInTheDocument()
  })
})
