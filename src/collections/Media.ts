// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Libreria Media',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    group: 'Catalogo',
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    crop: {
      aspectRatios: [
        {
          label: 'Quadrato (1:1)',
          value: 1 / 1,
        },
        {
          label: 'Ritratto (4:5)',
          value: 4 / 5,
        },
        {
          label: 'Cinemascope (16:9)',
          value: 16 / 9,
        },
        {
          label: 'A4 (1:1.41)',
          value: 1 / 1.41,
        },
        {
          label: 'Custom',
          value: undefined,
        },
      ],
    },
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'card',
        width: 800,
        height: 800,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'landscape',
        width: 1200,
        height: 675, // 16:9
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'standard',
        width: 1024,
        height: 768, // 4:3
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'photo',
        width: 1200,
        height: 800, // 3:2
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'portrait',
        width: 600,
        height: 900, // 2:3
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Testo Alternativo (Alt Text)',
      required: true,
      admin: {
        description: 'Molto importante per la SEO e l\'accessibilità. Descrivi brevemente cosa mostra l\'immagine.',
      },
    },
  ],
}
