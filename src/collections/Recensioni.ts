import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Recensioni: CollectionConfig = {
  slug: 'recensioni',
  labels: {
    singular: 'Recensione',
    plural: 'Recensioni',
  },
  admin: {
    useAsTitle: 'autore',
    group: 'Negozio',
    defaultColumns: ['autore', 'stelle', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [() => revalidateTag('recensioni', 'max')],
    afterDelete: [() => revalidateTag('recensioni', 'max')],
  },
  fields: [
    {
      name: 'autore',
      type: 'text',
      required: true,
      label: 'Nome del Cliente',
      admin: {
        placeholder: 'Es: Maria R.',
      },
    },
    {
      name: 'recensione',
      type: 'textarea',
      required: true,
      label: 'Cosa dicono di noi',
      admin: {
        description: 'Incolla qui il testo della recensione di Google.',
      },
    },
    {
      name: 'stelle',
      type: 'select',
      defaultValue: '5',
      options: [
        { label: '5 Stelle', value: '5' },
        { label: '4 Stelle', value: '4' },
      ],
      label: 'Valutazione',
    },
  ],
}
