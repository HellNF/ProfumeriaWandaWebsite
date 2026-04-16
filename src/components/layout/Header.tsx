import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import type { ImpostazioniNegozio } from '@/types/cms'

interface HeaderProps {
  settings: ImpostazioniNegozio
}

export function Header({ settings }: HeaderProps) {
  const logo = typeof settings?.logoNegozio === 'object' ? settings.logoNegozio : null
  const nomeNegozio = settings?.nomeNegozio ?? 'Profumeria Wanda'

  return (
    <header className="sticky top-0 z-50 px-4 md:px-8 lg:px-10 py-3 bg-gradient-to-b from-wanda-bg via-wanda-bg/60 to-transparent pointer-events-none">
      <div className="max-w-[1280px] mx-auto pointer-events-auto">
        {/* Floating pill */}
        <div className="flex items-center justify-between h-[3.5rem] rounded-full px-4 md:px-6 bg-white/88 backdrop-blur-xl border border-white/55 shadow-[0_2px_20px_-4px_rgba(180,0,93,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:scale-105"
            style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
          >
            {logo ? (
              <div className="relative h-9 w-36">
                <Image
                  src={logo.url}
                  alt={logo.alt ?? nomeNegozio}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <Logo className="h-8 w-auto text-wanda-fucsia" />
            )}
          </Link>

          {/* Nav desktop */}
          <NavLinks />

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/catalogo"
              className="btn-primary !py-2 !px-5 text-sm group flex items-center gap-2"
              aria-label="Scopri il catalogo prodotti"
            >
              Scopri il Catalogo
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-px" style={{ transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)' }}>
                →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}
