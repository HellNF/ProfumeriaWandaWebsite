// src/components/negozio/StructuredData.tsx
import type { ImpostazioniNegozio } from '@/types/cms'

interface StructuredDataProps {
  settings: ImpostazioniNegozio
}

export function StructuredData({ settings }: StructuredDataProps) {
  const {
    nomeNegozio,
    descrizioneNegozio: descrizione,
    indirizzo,
    telefono,
    linkInstagram,
    linkFacebook,
    orariStrutturati,
  } = settings

  const sameAs = [linkInstagram, linkFacebook].filter(Boolean)

  // Map structured hours to Schema.org format
  const openingHours = orariStrutturati?.map((item) => {
    if (item.chiuso) return null
    const days = item.giorni.join(',')
    if (item.pausaPranzo && item.oraChiusuraPranzo && item.oraRiaperturaPranzo) {
      return [
        `${days} ${item.oraApertura}-${item.oraChiusuraPranzo}`,
        `${days} ${item.oraRiaperturaPranzo}-${item.oraChiusura}`,
      ]
    }
    return `${days} ${item.oraApertura}-${item.oraChiusura}`
  }).flat().filter(Boolean)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: nomeNegozio,
    ...(descrizione && { description: descrizione }),
    ...(indirizzo && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: indirizzo,
        addressCountry: 'IT',
      },
    }),
    ...(telefono && { telephone: telefono }),
    ...(openingHours && openingHours.length > 0 && { openingHours }),
    ...(sameAs.length > 0 && { sameAs }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/<\/script>/gi, '<\\/script>') }}
    />
  )
}
