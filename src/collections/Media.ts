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
    crop: true, // Forza l'abilitazione dell'editor di ritaglio
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
        formatOptions: { format: 'webp', quality: 80 },
      },
      {
        name: 'card',
        width: 800,
        height: 800,
        position: 'centre',
        formatOptions: { format: 'webp', quality: 85 },
      },
      {
        name: 'landscape',
        width: 1200,
        height: 675, // 16:9
        position: 'centre',
        formatOptions: { format: 'webp', quality: 85 },
      },
      {
        name: 'standard',
        width: 1024,
        height: 768, // 4:3
        position: 'centre',
        formatOptions: { format: 'webp', quality: 85 },
      },
      {
        name: 'photo',
        width: 1200,
        height: 800, // 3:2
        position: 'centre',
        formatOptions: { format: 'webp', quality: 85 },
      },
      {
        name: 'portrait',
        width: 600,
        height: 900, // 2:3
        position: 'centre',
        formatOptions: { format: 'webp', quality: 85 },
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
