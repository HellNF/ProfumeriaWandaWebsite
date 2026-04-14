import type { GlobalConfig } from 'payload'

export const ImpostazioniNegozio: GlobalConfig = {
  slug: 'impostazioni-negozio',
  label: 'Impostazioni Negozio',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    group: 'Negozio',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─── GENERALE ────────────────────────────────────────────────────────────
        {
          label: 'Generale',
          description: 'Informazioni di base del negozio',
          fields: [
            {
              name: 'nomeNegozio',
              type: 'text',
              label: 'Nome negozio',
              required: true,
              defaultValue: 'Profumeria Wanda',
            },
            {
              name: 'sloganNegozio',
              type: 'text',
              label: 'Slogan / Tagline',
              admin: {
                description: 'Es: La bellezza è il nostro mestiere — appare nel footer e in altri contesti',
              },
            },
            {
              name: 'annoFondazione',
              type: 'number',
              label: 'Anno di fondazione',
              defaultValue: 1960,
              admin: {
                description: 'Usato nei dati strutturati Schema.org',
              },
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email di contatto',
              admin: {
                description: 'Es: info@profumeriawanda.it',
              },
            },
            {
              name: 'logoNegozio',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo negozio',
              admin: {
                description: 'Logo in formato PNG o SVG con sfondo trasparente',
              },
            },
            {
              name: 'descrizioneNegozio',
              type: 'textarea',
              label: 'Descrizione',
              admin: {
                description: 'Usata nella pagina negozio e come fallback per la meta description',
              },
            },
          ],
        },

        // ─── HOMEPAGE ────────────────────────────────────────────────────────────
        {
          label: 'Homepage',
          description: 'Contenuti della sezione hero e CTA principale',
          fields: [
            {
              name: 'testoHero',
              type: 'text',
              label: 'Titolo hero',
              defaultValue: 'Bellezza e stile dal 1960',
            },
            {
              name: 'sottotitoloHero',
              type: 'text',
              label: 'Sottotitolo hero',
              admin: {
                description: 'Frase breve sotto il titolo principale',
              },
            },
            {
              name: 'immagineHero',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine hero',
              admin: {
                description: 'Immagine di sfondo o principale della homepage. Min 1400px di larghezza.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroImageFit',
                  type: 'select',
                  label: 'Modalità visualizzazione immagine',
                  defaultValue: 'cover',
                  options: [
                    { label: 'Riempi (Cover - Può tagliare i bordi)', value: 'cover' },
                    { label: 'Contieni (Contain - Mostra intera, può lasciare spazi)', value: 'contain' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'heroImagePosition',
                  type: 'select',
                  label: 'Allineamento immagine',
                  defaultValue: 'center',
                  options: [
                    { label: 'Centro', value: 'center' },
                    { label: 'In Alto', value: 'top' },
                    { label: 'In Basso', value: 'bottom' },
                    { label: 'A Sinistra', value: 'left' },
                    { label: 'A Destra', value: 'right' },
                  ],
                  admin: { 
                    width: '50%',
                    condition: (data) => data?.heroImageFit === 'cover' 
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'ctaHeroLabel',
                  type: 'text',
                  label: 'Testo bottone CTA',
                  admin: {
                    width: '50%',
                    description: 'Es: Scopri il catalogo',
                  },
                },
                {
                  name: 'ctaHeroUrl',
                  type: 'text',
                  label: 'URL bottone CTA',
                  admin: {
                    width: '50%',
                    description: 'Es: /catalogo',
                  },
                },
              ],
            },
            {
              name: 'testoSezioneEvidenza',
              type: 'text',
              label: 'Titolo sezione "In Evidenza"',
              defaultValue: 'Selezione del mese',
              admin: {
                description: 'Titolo sopra la griglia dei prodotti in evidenza',
              },
            },
          ],
        },

        // ─── IMMAGINI HOMEPAGE ───────────────────────────────────────────────────
        {
          label: 'Immagini Homepage',
          description: 'Gestione delle immagini delle categorie e sezioni speciali',
          fields: [
            {
              type: 'group',
              name: 'categorieHome',
              label: 'Immagini Categorie (Bento Grid)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'immagineFragranze',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Immagine Fragranze (Grande)',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'immagineSkincare',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Immagine Skincare',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'immagineMakeup',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Immagine Make-up',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'immagineAccessori',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Immagine Accessori (Grande)',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'immagineQualitaTradizione',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine Sezione Qualità & Tradizione',
              admin: {
                description: 'L\'immagine mostrata nella sezione ETHOS Partner in fondo alla home',
              },
            },
            {
              name: 'immagineConsulenzaWanda',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine Sezione Consulenza di Wanda',
              admin: {
                description: 'L\'immagine che appare accanto alla citazione di Wanda nella homepage',
              },
            },
          ],
        },

        // ─── IMMAGINI NEGOZIO ────────────────────────────────────────────────────
        {
          label: 'Immagini Negozio',
          description: 'Gestione delle immagini per la pagina "Il Negozio"',
          fields: [
            {
              name: 'immagineHeroNegozio',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine Hero Negozio',
              admin: {
                description: 'Immagine grande in cima alla pagina negozio',
              },
            },
            {
              name: 'immagineStoria',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine La Nostra Storia',
              admin: {
                description: 'L\'immagine che accompagna il testo sulla fondazione del 1960',
              },
            },
            {
              type: 'group',
              name: 'serviziNegozio',
              label: 'Immagini Servizi',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'immagineConsulenzaOlfattiva',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Immagine Consulenza Olfattiva',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'immagineCaffeChiacchiere',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Immagine Caffè e Chiacchiere',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ─── SEDE & CONTATTI ─────────────────────────────────────────────────────
        {
          label: 'Sede & Contatti',
          description: 'Indirizzo fisico, telefono, email e mappa',
          fields: [
            // Indirizzo
            {
              type: 'collapsible',
              label: 'Indirizzo',
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'indirizzo',
                  type: 'text',
                  label: 'Via e numero civico',
                  admin: {
                    description: 'Es: Via Roma 12',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'citta',
                      type: 'text',
                      label: 'Città',
                      admin: { width: '40%' },
                    },
                    {
                      name: 'cap',
                      type: 'text',
                      label: 'CAP',
                      admin: { width: '20%' },
                    },
                    {
                      name: 'provincia',
                      type: 'text',
                      label: 'Provincia',
                      admin: {
                        width: '20%',
                        description: 'Sigla, es: MI',
                      },
                    },
                    {
                      name: 'regione',
                      type: 'text',
                      label: 'Regione',
                      admin: { width: '20%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'latitudine',
                      type: 'number',
                      label: 'Latitudine GPS',
                      admin: {
                        width: '50%',
                        description: 'Per i dati strutturati Schema.org',
                      },
                    },
                    {
                      name: 'longitudine',
                      type: 'number',
                      label: 'Longitudine GPS',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Telefono
            {
              type: 'collapsible',
              label: 'Telefono',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'telefono',
                      type: 'text',
                      label: 'Telefono principale',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'telefonoSecondario',
                      type: 'text',
                      label: 'Telefono secondario',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Google Maps
            {
              type: 'collapsible',
              label: 'Google Maps',
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'googleMapsEmbedUrl',
                  type: 'text',
                  label: 'URL embed mappa',
                  admin: {
                    description:
                      "Vai su Google Maps → Condividi → Incorpora mappa → copia il src dell'iframe",
                  },
                },
                {
                  name: 'googleMapsUrl',
                  type: 'text',
                  label: 'Link diretto Google Maps',
                  admin: {
                    description:
                      'URL per il bottone "Apri in Google Maps" — copia dalla barra del browser su maps.google.com',
                  },
                },
              ],
            },
          ],
        },

        // ─── ORARI ───────────────────────────────────────────────────────────────
        {
          label: 'Orari',
          description: 'Orari di apertura in formato libero e strutturato',
          fields: [
            {
              name: 'orari',
              type: 'textarea',
              label: 'Orari (testo libero)',
              admin: {
                description:
                  'Mostrato nella pagina negozio. Usa invio per andare a capo.\nEs:\nLun–Sab 9:00–13:00 / 15:30–19:30\nDomenica: chiuso',
                rows: 5,
              },
            },
            {
              name: 'orariStrutturati',
              type: 'array',
              label: 'Orari strutturati per giorno',
              admin: {
                description:
                  'Usati per i dati Schema.org e integrazioni future. Puoi specificare più giorni per riga.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'giorni',
                  type: 'select',
                  label: 'Giorno/i',
                  hasMany: true,
                  required: true,
                  options: [
                    { label: 'Lunedì', value: 'Mo' },
                    { label: 'Martedì', value: 'Tu' },
                    { label: 'Mercoledì', value: 'We' },
                    { label: 'Giovedì', value: 'Th' },
                    { label: 'Venerdì', value: 'Fr' },
                    { label: 'Sabato', value: 'Sa' },
                    { label: 'Domenica', value: 'Su' },
                  ],
                },
                {
                  name: 'chiuso',
                  type: 'checkbox',
                  label: 'Chiuso tutto il giorno',
                  defaultValue: false,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'oraApertura',
                      type: 'text',
                      label: 'Apertura',
                      admin: {
                        width: '50%',
                        description: 'Es: 09:00',
                        condition: (_data, siblingData) => !siblingData?.chiuso,
                      },
                    },
                    {
                      name: 'oraChiusura',
                      type: 'text',
                      label: 'Chiusura',
                      admin: {
                        width: '50%',
                        description: 'Es: 19:30',
                        condition: (_data, siblingData) => !siblingData?.chiuso,
                      },
                    },
                  ],
                },
                {
                  name: 'pausaPranzo',
                  type: 'checkbox',
                  label: 'Pausa pranzo',
                  defaultValue: false,
                  admin: {
                    condition: (_data, siblingData) => !siblingData?.chiuso,
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'oraChiusuraPranzo',
                      type: 'text',
                      label: 'Chiusura pranzo',
                      admin: {
                        width: '50%',
                        description: 'Es: 13:00',
                        condition: (_data, siblingData) =>
                          !siblingData?.chiuso && Boolean(siblingData?.pausaPranzo),
                      },
                    },
                    {
                      name: 'oraRiaperturaPranzo',
                      type: 'text',
                      label: 'Riapertura pranzo',
                      admin: {
                        width: '50%',
                        description: 'Es: 15:30',
                        condition: (_data, siblingData) =>
                          !siblingData?.chiuso && Boolean(siblingData?.pausaPranzo),
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ─── SOCIAL ──────────────────────────────────────────────────────────────
        {
          label: 'Social & Canali',
          description: 'Link ai profili social e canali di comunicazione',
          fields: [
            {
              name: 'linkInstagram',
              type: 'text',
              label: 'Instagram',
              admin: {
                description: 'URL completo, es: https://instagram.com/profumeriawanda',
              },
            },
            {
              name: 'linkFacebook',
              type: 'text',
              label: 'Facebook',
              admin: {
                description: 'URL completo della pagina Facebook',
              },
            },
            {
              name: 'linkWhatsApp',
              type: 'text',
              label: 'WhatsApp',
              admin: {
                description: 'Numero con prefisso internazionale, es: +393331234567',
              },
            },
            {
              name: 'messaggioWhatsApp',
              type: 'text',
              label: 'Messaggio pre-compilato WhatsApp',
              admin: {
                description:
                  'Es: Ciao! Vorrei informazioni sui vostri prodotti — viene inviato automaticamente quando il cliente clicca il bottone',
              },
            },
            {
              name: 'linkTikTok',
              type: 'text',
              label: 'TikTok',
              admin: {
                description: 'URL completo del profilo TikTok',
              },
            },
            {
              name: 'linkYouTube',
              type: 'text',
              label: 'YouTube',
              admin: {
                description: 'URL del canale YouTube',
              },
            },
            {
              name: 'linkTelegram',
              type: 'text',
              label: 'Telegram',
              admin: {
                description: 'Es: https://t.me/profumeriawanda',
              },
            },
          ],
        },

        // ─── SEO ─────────────────────────────────────────────────────────────────
        {
          label: 'SEO',
          description: 'Metadati per motori di ricerca e condivisione social',
          fields: [
            {
              name: 'metaDescrizioneDefault',
              type: 'textarea',
              label: 'Meta description di default',
              admin: {
                description:
                  'Usata nelle pagine che non hanno una meta description specifica. Max 160 caratteri.',
                rows: 3,
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine Open Graph (og:image)',
              admin: {
                description:
                  'Immagine mostrata quando il sito viene condiviso su social o messaggistica. Min 1200×630 px.',
              },
            },
            {
              name: 'partitaIva',
              type: 'text',
              label: 'Partita IVA',
              admin: {
                description: 'Per il footer e i dati legali',
              },
            },
            {
              name: 'linkPrivacy',
              type: 'text',
              label: 'URL Privacy Policy',
              admin: {
                description: 'Es: /privacy — link nel footer',
              },
            },
            {
              name: 'linkTermini',
              type: 'text',
              label: 'URL Termini e Condizioni',
              admin: {
                description: 'Es: /termini',
              },
            },
          ],
        },

        // ─── BANNER PROMO ────────────────────────────────────────────────────────
        {
          label: 'Banner Promo',
          description: 'Banner promozionale visualizzato in cima al sito',
          fields: [
            {
              name: 'bannerAttivo',
              type: 'checkbox',
              label: 'Mostra banner promozionale',
              defaultValue: false,
            },
            {
              name: 'testoBanner',
              type: 'text',
              label: 'Testo del banner',
              admin: {
                description: 'Es: Saldi estivi — fino al 50% di sconto!',
                condition: (data) => Boolean(data?.bannerAttivo),
              },
            },
            {
              name: 'linkBanner',
              type: 'text',
              label: 'URL del banner (opzionale)',
              admin: {
                description: 'Lascia vuoto per un banner non cliccabile',
                condition: (data) => Boolean(data?.bannerAttivo),
              },
            },
            {
              name: 'coloreBanner',
              type: 'select',
              label: 'Colore banner',
              defaultValue: 'fucsia',
              options: [
                { label: 'Fucsia', value: 'fucsia' },
                { label: 'Nero', value: 'nero' },
                { label: 'Violetto', value: 'violetto' },
              ],
              admin: {
                condition: (data) => Boolean(data?.bannerAttivo),
              },
            },
          ],
        },
      ],
    },
  ],
}
