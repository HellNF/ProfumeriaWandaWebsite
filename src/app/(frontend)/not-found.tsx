import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina non trovata',
}

export default function NotFound() {
  return (
    <main className="wanda-container min-h-[70vh] flex flex-col items-center justify-center text-center py-24 space-y-8">
      <div className="space-y-2">
        <p className="text-wanda-fucsia font-bold uppercase tracking-[0.3em] text-xs">Errore 404</p>
        <h1 className="font-headline text-6xl md:text-8xl font-bold text-wanda-nero/10 leading-none select-none">
          404
        </h1>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-wanda-nero -mt-4">
          Pagina non trovata
        </h2>
      </div>

      <p className="text-wanda-text-soft text-lg max-w-md leading-relaxed">
        La pagina che cerchi non esiste o è stata spostata. Nessuna preoccupazione, ti aiutiamo a ritrovare la strada.
      </p>

      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Link href="/" className="btn-primary">
          Torna alla Home
        </Link>
        <Link href="/catalogo" className="btn-outline">
          Esplora il Catalogo
        </Link>
      </div>

      <div className="pt-8 border-t border-wanda-fucsia/10 w-full max-w-sm">
        <p className="text-xs text-wanda-outline mb-4 uppercase tracking-widest">Oppure vai direttamente a</p>
        <nav className="flex justify-center gap-6 text-sm font-bold text-wanda-fucsia">
          <Link href="/negozio" className="hover:underline underline-offset-4">Il Negozio</Link>
          <Link href="/catalogo?promo=1" className="hover:underline underline-offset-4">Offerte</Link>
          <Link href="/catalogo?categoria=profumeria" className="hover:underline underline-offset-4">Profumeria</Link>
        </nav>
      </div>
    </main>
  )
}
