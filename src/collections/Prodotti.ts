// src/collections/Prodotti.ts
import type { CollectionConfig } from 'payload'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const Prodotti: CollectionConfig = {
  slug: 'prodotti',
  labels: {
    singular: 'Prodotto',
    plural: 'Prodotti',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'categoria', 'marca', 'prezzo', 'disponibile', 'inEvidenza'],
    listSearchableFields: ['nome', 'marca', 'slug'],
    group: 'Catalogo',
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Automatically generate slug from name if not provided
        if (operation === 'create' && data.nome && !data.slug) {
          data.slug = formatSlug(data.nome)
        }
        
        // Calcola il prezzo scontato basandosi sulla percentuale
        if (data.inPromozione && data.prezzo && data.percentualeSconto) {
          const sconto = (data.prezzo * data.percentualeSconto) / 100
          data.prezzoScontato = parseFloat((data.prezzo - sconto).toFixed(2))
        } else if (!data.inPromozione) {
          data.prezzoScontato = null
          data.percentualeSconto = null
        }
        
        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informazioni Prodotto',
          description: 'Inserisci qui i dati principali che vedranno i clienti sul sito.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'nome',
                  type: 'text',
                  required: true,
                  label: 'Nome del Prodotto',
                  admin: {
                    width: '50%',
                    placeholder: 'Es: Profumo Chanel N°5',
                  },
                },
                {
                  name: 'marca',
                  type: 'relationship',
                  relationTo: 'marche',
                  label: 'Marca / Brand',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Scegli la marca dalla lista o clicca "+" per aggiungerne una nuova.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'categoria',
                  type: 'select',
                  required: true,
                  label: 'Categoria del Negozio',
                  admin: {
                    width: '50%',
                    description: 'Scegli dove apparirà il prodotto nel catalogo.',
                  },
                  options: [
                    { label: 'Profumeria (Profumi uomo/donna)', value: 'profumeria' },
                    { label: 'Cosmetici (Creme, Trattamenti)', value: 'cosmetici' },
                    { label: 'Trucco (Mascara, Rossetti)', value: 'trucco' },
                    { label: 'Pelletteria (Portafogli, Cinture)', value: 'pelletteria' },
                    { label: 'Borse & Valigie', value: 'borse-valigie' },
                    { label: 'Idee Regalo (Set, Confezioni)', value: 'idee-regalo' },
                    { label: 'Altro / Accessori', value: 'altro' },
                  ],
                },
                {
                  name: 'destinatario',
                  type: 'select',
                  label: 'Per chi è?',
                  admin: {
                    width: '50%',
                    description: 'Aiuta i clienti a filtrare per Uomo, Donna o Unisex.',
                    condition: (data) => ['profumeria', 'cosmetici', 'trucco', 'pelletteria', 'borse-valigie', 'idee-regalo'].includes(data?.categoria),
                  },
                  options: [
                    { label: 'Donna', value: 'donna' },
                    { label: 'Uomo', value: 'uomo' },
                    { label: 'Unisex', value: 'unisex' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'formato',
                  type: 'number',
                  label: 'Formato / Capienza (ml)',
                  min: 1,
                  admin: {
                    width: '100%',
                    placeholder: 'Es: 50, 100, 250...',
                    description: 'Indica la dimensione in millilitri.',
                    condition: (data) => ['profumeria', 'cosmetici', 'trucco'].includes(data?.categoria),
                  },
                  validate: (val: unknown, { data }: { data: Record<string, unknown> }) => {
                    if (['profumeria', 'cosmetici', 'trucco'].includes(data?.categoria as string) && !val) {
                      return 'Il formato è obbligatorio per questa categoria'
                    }
                    return true
                  },
                },
              ],
            },
            {
              name: 'descrizione',
              type: 'textarea',
              label: 'Descrizione per il Cliente',
              maxLength: 5000,
              admin: {
                description: 'Racconta la storia del prodotto, le note olfattive o i consigli d\'uso. Spazio generoso per testi lunghi (fino a circa 800 parole).',
                rows: 12,
              },
            },
          ],
        },
        {
          label: 'Prezzi e Sconti',
          description: 'Gestisci il listino prezzi e le offerte speciali.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'prezzo',
                  type: 'number',
                  label: 'Prezzo Normale (€)',
                  required: true,
                  min: 0,
                  admin: {
                    width: '33%',
                    description: 'Prezzo pieno (es: 50.00).',
                    step: 0.01,
                  },
                },
                {
                  name: 'percentualeSconto',
                  type: 'number',
                  label: 'Sconto (%)',
                  min: 1,
                  max: 99,
                  admin: {
                    width: '33%',
                    condition: (data) => Boolean(data?.inPromozione),
                    description: 'Inserisci solo il numero (es: 20). Valore tra 1 e 99.',
                  },
                },
                {
                  name: 'prezzoScontato',
                  type: 'number',
                  label: 'PREVIEW Prezzo Scontato',
                  admin: {
                    width: '34%',
                    readOnly: true,
                    condition: (data) => Boolean(data?.inPromozione),
                    description: 'Viene calcolato automaticamente al salvataggio.',
                  },
                },
              ],
            },
            {
              name: 'inPromozione',
              type: 'checkbox',
              label: 'Metti questo prodotto IN OFFERTA',
              defaultValue: false,
              admin: {
                description: 'Se attivo, potrai inserire la percentuale di sconto.',
              },
            },
          ],
        },
        {
          label: 'Foto del Prodotto',
          description: 'Carica le foto del prodotto. La prima foto sarà quella principale.',
          fields: [
            {
              name: 'foto',
              type: 'array',
              label: 'Galleria Immagini',
              maxRows: 4,
              labels: {
                singular: 'Foto',
                plural: 'Foto',
              },
              admin: {
                description: 'Puoi caricare fino a 4 foto. Trascina le foto per cambiare l\'ordine.',
              },
              fields: [
                {
                  name: 'immagine',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Scegli o trascina un\'immagine',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Impostazioni Avanzate (SEO)',
          description: 'Questi campi vengono compilati automaticamente, modificali solo se necessario.',
          fields: [
            {
              name: 'slug',
              type: 'text',
              label: 'Indirizzo Web (Slug)',
              admin: {
                description: 'Viene creato da solo partendo dal nome. Serve per Google.',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (value && typeof value === 'string') {
                      return formatSlug(value)
                    }
                    if (data?.nome) {
                      return formatSlug(data.nome)
                    }
                    return value
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'disponibile',
      type: 'checkbox',
      label: 'PRODOTTO DISPONIBILE',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Togli la spunta se il prodotto è finito (apparirà come "Esaurito").',
      },
    },
    {
      name: 'inEvidenza',
      type: 'checkbox',
      label: 'MOSTRA IN VETRINA (Home)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Se attivo, il prodotto apparirà tra i primi nella pagina principale del sito.',
      },
    },
  ],
}
