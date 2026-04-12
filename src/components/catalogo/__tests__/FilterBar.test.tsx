import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { FilterBar } from '../FilterBar'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/catalogo'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

const mockPush = jest.fn()

beforeEach(() => {
  mockPush.mockClear()
  ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
})

describe('FilterBar', () => {
  it('mostra il filtro "Tutti" come attivo di default', () => {
    render(<FilterBar />)
    const tuttiBtn = screen.getByRole('button', { name: 'Tutti' })
    expect(tuttiBtn).toHaveClass('bg-wanda-nero')
  })

  it('mostra tutti i bottoni delle categorie', () => {
    render(<FilterBar />)
    expect(screen.getByRole('button', { name: 'Profumeria' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cosmetici' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Trucco' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pelletteria' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Borse & Valigie' })).toBeInTheDocument()
  })

  it('mostra il bottone "Solo in promozione"', () => {
    render(<FilterBar />)
    expect(screen.getByRole('button', { name: /solo in promozione/i })).toBeInTheDocument()
  })

  it('chiama router.push con la categoria corretta al click', async () => {
    const user = userEvent.setup()
    render(<FilterBar />)
    await user.click(screen.getByRole('button', { name: 'Profumeria' }))
    expect(mockPush).toHaveBeenCalledWith('/catalogo?categoria=profumeria')
  })
})
