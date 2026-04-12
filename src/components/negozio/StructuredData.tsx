// src/components/negozio/StructuredData.tsx
interface StructuredDataProps {
  nomeNegozio: string
  descrizione?: string | null
  indirizzo?: string | null
  telefono?: string | null
  orari?: string | null
  linkInstagram?: string | null
  linkFacebook?: string | null
}

export function StructuredData({
  nomeNegozio,
  descrizione,
  indirizzo,
  telefono,
  orari,
  linkInstagram,
  linkFacebook,
}: StructuredDataProps) {
  const sameAs = [linkInstagram, linkFacebook].filter(Boolean)

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
    ...(orari && { openingHours: orari }),
    ...(sameAs.length > 0 && { sameAs }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
