// src/collections/Prodotti.ts
import type { CollectionConfig } from 'payload'

export const Prodotti: CollectionConfig = {
  slug: 'prodotti',
  labels: {
    singular: 'Prodotto',
    plural: 'Prodotti',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'categoria', 'marca', 'prezzo', 'disponibile', 'inEvidenza'],
    listSearchableFields: ['nome', 'marca'],
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
      label: 'Nome prodotto',
    },
    {
      name: 'categoria',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'Profumeria', value: 'profumeria' },
        { label: 'Cosmetici', value: 'cosmetici' },
        { label: 'Trucco', value: 'trucco' },
        { label: 'Pelletteria', value: 'pelletteria' },
        { label: 'Borse & Valigie', value: 'borse-valigie' },
        { label: 'Altro', value: 'altro' },
      ],
    },
    {
      name: 'marca',
      type: 'text',
      label: 'Marca',
    },
    {
      name: 'descrizione',
      type: 'textarea',
      label: 'Descrizione',
      admin: {
        description: 'Massimo 200 caratteri',
      },
    },
    {
      name: 'foto',
      type: 'array',
      label: 'Foto',
      maxRows: 4,
      admin: {
        description: 'Massimo 4 immagini',
      },
      fields: [
        {
          name: 'immagine',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'prezzo',
      type: 'number',
      label: 'Prezzo (€)',
      admin: {
        description: 'Lascia vuoto per non mostrare il prezzo',
      },
    },
    {
      name: 'inPromozione',
      type: 'checkbox',
      label: 'In promozione',
      defaultValue: false,
    },
    {
      name: 'prezzoScontato',
      type: 'number',
      label: 'Prezzo scontato (€)',
      admin: {
        condition: (data) => Boolean(data?.inPromozione),
        description: 'Visibile solo se "In promozione" è attivo',
      },
    },
    {
      name: 'disponibile',
      type: 'checkbox',
      label: 'Disponibile',
      defaultValue: true,
    },
    {
      name: 'inEvidenza',
      type: 'checkbox',
      label: 'In evidenza in homepage',
      defaultValue: false,
      admin: {
        description: 'Mostra questo prodotto nella sezione in evidenza della homepage',
      },
    },
  ],
}
