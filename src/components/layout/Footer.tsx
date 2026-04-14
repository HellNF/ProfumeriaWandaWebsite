import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './Logo'
import type { ImpostazioniNegozio } from '@/types/cms'
import { Copyright } from './Copyright'

interface FooterProps {
  settings: ImpostazioniNegozio
}

export function Footer({ settings }: FooterProps) {
  const foundationYear = settings?.annoFondazione ?? 1960
  const nomeNegozio = settings?.nomeNegozio ?? 'Profumeria Wanda'
  const logo = typeof settings?.logoNegozio === 'object' ? settings.logoNegozio : null

  const SOCIAL_LINKS = [
    { href: settings?.linkInstagram, label: 'Instagram' },
    { href: settings?.linkFacebook, label: 'Facebook' },
    { href: settings?.linkTikTok, label: 'TikTok' },
    { href: settings?.linkYouTube, label: 'YouTube' },
    { href: settings?.linkTelegram, label: 'Telegram' },
    { href: settings?.linkWhatsApp ? `https://wa.me/${settings.linkWhatsApp.replace(/\D/g, '')}` : null, label: 'WhatsApp' },
  ].filter((link) => !!link.href)

  return (
    <footer className="w-full rounded-t-[3rem] mt-20 bg-wanda-surface-low text-wanda-nero pt-16 pb-24 md:pb-12 border-t border-wanda-fucsia/5">
      <div className="wanda-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            {logo ? (
              <div className="relative h-12 w-40">
                <Image
                  src={logo.url}
                  alt={logo.alt ?? nomeNegozio}
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <Logo className="h-10 w-auto text-wanda-nero/40 hover:text-wanda-fucsia transition-colors" />
            )}
            {settings?.sloganNegozio && (
              <p className="text-xs tracking-[0.2em] uppercase text-wanda-text-soft">
                {settings.sloganNegozio}
              </p>
            )}
            <p className="text-sm text-wanda-text-soft max-w-sm leading-relaxed">
              {settings?.descrizioneNegozio || 'Dal 1960 curiamo la tua essenza con la gentilezza di una chiacchierata tra amiche. Partner ETHOS.'}
            </p>
            <div className="text-xs text-wanda-outline space-y-1 pt-2">
              {settings?.partitaIva && <p>P.IVA: {settings.partitaIva}</p>}
              {settings?.indirizzo && <p>{settings.indirizzo}{settings.citta ? `, ${settings.citta}` : ''}</p>}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-wanda-fucsia font-bold mb-8">Esplora</p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-4 text-sm text-wanda-text-soft">
                <li><Link href="/" className="hover:text-wanda-fucsia transition-all hover:translate-x-1 inline-block">Home</Link></li>
                <li><Link href="/catalogo" className="hover:text-wanda-fucsia transition-all hover:translate-x-1 inline-block">Catalogo Prodotti</Link></li>
                <li><Link href="/negozio" className="hover:text-wanda-fucsia transition-all hover:translate-x-1 inline-block">Il Negozio</Link></li>
                {settings?.linkPrivacy && <li><Link href={settings.linkPrivacy} className="hover:text-wanda-fucsia transition-all text-xs opacity-70">Privacy Policy</Link></li>}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-wanda-fucsia font-bold mb-8">Social</p>
            <ul className="space-y-4">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (apre in nuova scheda)`}
                    className="text-sm text-wanda-text-soft hover:text-wanda-fucsia transition-all flex items-center gap-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {SOCIAL_LINKS.length === 0 && (
                <li className="text-sm text-wanda-text-soft italic">Seguici per le novità</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-wanda-mid/10 mt-12 pt-8 text-xs text-wanda-outline flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p><Copyright nomeNegozio={nomeNegozio} /></p>
          <p className="opacity-50 tracking-widest uppercase italic">Dal {foundationYear} con amore</p>
        </div>
      </div>
    </footer>
  )
}
