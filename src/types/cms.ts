// src/types/cms.ts

export interface Media {
  id: string
  url: string
  alt?: string | null
  width?: number | null
  height?: number | null
  mimeType?: string | null
  sizes?: {
    thumbnail?: {
      url: string
      width: number
      height: number
    }
    card?: {
      url: string
      width: number
      height: number
    }
  }
}

export interface Prodotto {
  id: string
  nome: string
  categoria: 'profumeria' | 'cosmetici' | 'trucco' | 'pelletteria' | 'borse-valigie' | 'altro'
  marca?: string | null
  descrizione?: string | null
  foto?: Array<{
    immagine: Media | string
    id?: string | null
  }> | null
  prezzo?: number | null
  inPromozione?: boolean | null
  prezzoScontato?: number | null
  disponibile?: boolean | null
  inEvidenza?: boolean | null
  createdAt: string
  updatedAt: string
}

export interface ImpostazioniNegozio {
  // Generale
  nomeNegozio: string
  sloganNegozio?: string | null
  annoFondazione?: number | null
  email?: string | null
  logoNegozio?: Media | string | null
  descrizioneNegozio?: string | null

  // Homepage
  testoHero?: string | null
  sottotitoloHero?: string | null
  immagineHero?: Media | string | null
  ctaHeroLabel?: string | null
  ctaHeroUrl?: string | null
  testoSezioneEvidenza?: string | null

  // Sede & Contatti
  indirizzo?: string | null
  citta?: string | null
  cap?: string | null
  provincia?: string | null
  regione?: string | null
  latitudine?: number | null
  longitudine?: number | null
  telefono?: string | null
  telefonoSecondario?: string | null
  googleMapsEmbedUrl?: string | null
  googleMapsUrl?: string | null

  // Orari
  orari?: string | null
  orariStrutturati?: Array<{
    giorni: Array<'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'>
    chiuso?: boolean | null
    oraApertura?: string | null
    oraChiusura?: string | null
    pausaPranzo?: boolean | null
    oraChiusuraPranzo?: string | null
    oraRiaperturaPranzo?: string | null
    id?: string | null
  }> | null

  // Social
  linkInstagram?: string | null
  linkFacebook?: string | null
  linkWhatsApp?: string | null
  messaggioWhatsApp?: string | null
  linkTikTok?: string | null
  linkYouTube?: string | null
  linkTelegram?: string | null

  // SEO
  metaDescrizioneDefault?: string | null
  ogImage?: Media | string | null
  partitaIva?: string | null
  linkPrivacy?: string | null
  linkTermini?: string | null

  // Banner Promo
  bannerAttivo?: boolean | null
  testoBanner?: string | null
  linkBanner?: string | null
  coloreBanner?: 'fucsia' | 'nero' | 'violetto' | null
}
