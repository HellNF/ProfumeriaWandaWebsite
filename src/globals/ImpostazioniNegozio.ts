import type { GlobalConfig } from 'payload'

export const ImpostazioniNegozio: GlobalConfig = {
  slug: 'impostazioni-negozio',
  label: 'Impostazioni Negozio',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nomeNegozio',
      type: 'text',
      label: 'Nome negozio',
      defaultValue: 'Profumeria Wanda',
    },
    {
      name: 'descrizioneNegozio',
      type: 'textarea',
      label: 'Descrizione (per SEO e pagina negozio)',
    },
    {
      name: 'orari',
      type: 'textarea',
      label: 'Orari di apertura',
      admin: {
        description: 'Es: Lun-Sab 9:00-13:00, 15:30-19:30',
      },
    },
    {
      name: 'indirizzo',
      type: 'text',
      label: 'Indirizzo',
    },
    {
      name: 'telefono',
      type: 'text',
      label: 'Telefono',
    },
    {
      name: 'linkInstagram',
      type: 'text',
      label: 'URL Instagram',
    },
    {
      name: 'linkFacebook',
      type: 'text',
      label: 'URL Facebook',
    },
    {
      name: 'linkWhatsApp',
      type: 'text',
      label: 'Numero WhatsApp (con prefisso internazionale, es: +393331234567)',
    },
    {
      name: 'testoHero',
      type: 'text',
      label: 'Testo principale hero homepage',
      defaultValue: 'Bellezza e stile dal 1960',
    },
    {
      name: 'sottotitoloHero',
      type: 'text',
      label: 'Sottotitolo hero',
    },
    {
      name: 'immagineHero',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine hero homepage',
    },
    {
      name: 'googleMapsEmbedUrl',
      type: 'text',
      label: 'URL embed Google Maps',
      admin: {
        description:
          "Vai su Google Maps → Condividi → Incorpora mappa → copia il src dell'iframe",
      },
    },
  ],
}
