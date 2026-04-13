import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './Logo'
import type { ImpostazioniNegozio } from '@/types/cms'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/catalogo', label: 'Catalogo' },
  { href: '/negozio', label: 'Il Negozio' },
]

interface HeaderProps {
  settings: ImpostazioniNegozio
}

export function Header({ settings }: HeaderProps) {
  const logo = typeof settings?.logoNegozio === 'object' ? settings.logoNegozio : null
  const nomeNegozio = settings?.nomeNegozio ?? 'Profumeria Wanda'

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto flex items-center justify-between h-20 px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          {logo ? (
            <div className="relative h-14 w-48">
              <Image
                src={logo.url}
                alt={logo.alt ?? nomeNegozio}
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          ) : (
            <Logo className="h-12 w-auto text-wanda-fucsia" />
          )}
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Navigazione principale">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold tracking-wide uppercase text-wanda-text-soft hover:text-wanda-fucsia transition-all duration-200 hover:-translate-y-0.5"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link href="/negozio" className="btn-primary py-2.5 px-6 text-sm">
            Vieni a trovarci
          </Link>
        </div>
      </div>
    </header>
  )
}
