import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterBar } from '../FilterBar'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/catalogo',
  useSearchParams: () => new URLSearchParams(),
}))

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

  it('il click su una categoria non genera errori', async () => {
    const user = userEvent.setup()
    render(<FilterBar />)
    await user.click(screen.getByRole('button', { name: 'Profumeria' }))
    // If we get here without errors, the click handler works
    expect(screen.getByRole('button', { name: 'Profumeria' })).toBeInTheDocument()
  })
})
