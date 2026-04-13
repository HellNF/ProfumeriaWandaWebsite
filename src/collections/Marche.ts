import type { CollectionConfig } from 'payload'

export const Marche: CollectionConfig = {
  slug: 'marche',
  labels: {
    singular: 'Marca',
    plural: 'Marche',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'logo'],
    group: 'Catalogo',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      label: 'Nome della Marca',
      required: true,
      unique: true,
      admin: {
        placeholder: 'Es: Chanel, Dior, Collistar...',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo della Marca',
      admin: {
        description: 'Carica il logo ufficiale del brand (opzionale).',
      },
    },
    {
      name: 'descrizione',
      type: 'textarea',
      label: 'Breve storia / Descrizione',
      admin: {
        description: 'Una breve descrizione del brand da mostrare sul sito.',
      },
    },
  ],
}
