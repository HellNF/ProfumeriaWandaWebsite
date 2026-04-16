'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/catalogo', label: 'Catalogo' },
  { href: '/negozio', label: 'Il Negozio' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-10" aria-label="Navigazione principale">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            style={{ transition: 'color 400ms cubic-bezier(0.32,0.72,0,1), transform 400ms cubic-bezier(0.32,0.72,0,1)' }}
            className={`nav-link relative text-sm font-semibold tracking-wide uppercase hover:-translate-y-0.5 active:scale-95 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full after:bg-wanda-fucsia after:transition-all after:duration-[400ms] ${
              isActive
                ? 'text-wanda-fucsia after:w-full'
                : 'text-wanda-text-soft hover:text-wanda-fucsia after:w-0 hover:after:w-full'
            }`}
            aria-label={`Vai alla pagina ${label}`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
