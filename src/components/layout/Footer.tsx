// src/components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-wanda-nero text-white pt-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg mb-2">Wanda</p>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
              profumeria dal 1960
            </p>
            <p className="text-sm text-gray-400">Affiliata ETHOS — carta fedeltà accettata</p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-wanda-fucsia transition-colors">Home</Link></li>
              <li><Link href="/catalogo" className="hover:text-wanda-fucsia transition-colors">Catalogo</Link></li>
              <li><Link href="/negozio" className="hover:text-wanda-fucsia transition-colors">Il Negozio</Link></li>
            </ul>
          </nav>

          {/* Social placeholder — will be wired to CMS in Task 11 */}
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">Seguici</p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-wanda-fucsia transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-wanda-fucsia transition-colors text-sm"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Profumeria Wanda. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}
