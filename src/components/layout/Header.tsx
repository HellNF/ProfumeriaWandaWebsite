// src/components/layout/Header.tsx
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/catalogo', label: 'Catalogo' },
  { href: '/negozio', label: 'Il Negozio' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl text-wanda-nero tracking-wide">
          Wanda
          <span className="block text-xs font-sans tracking-[0.2em] text-wanda-gray-mid uppercase">
            profumeria dal 1960
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigazione principale">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-wider uppercase text-wanda-nero hover:text-wanda-fucsia transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
