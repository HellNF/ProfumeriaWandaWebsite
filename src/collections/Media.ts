// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import { stripLightBackgroundFromLogo } from '../lib/logoProcessing'

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
  hooks: {
    beforeOperation: [
      async ({ operation, req }) => {
        if ((operation !== 'create' && operation !== 'update') || !req.file) return

        const alt = typeof req.data?.alt === 'string' ? req.data.alt : null
        const processedLogo = await stripLightBackgroundFromLogo({
          alt,
          buffer: req.file.data,
          filename: req.file.name,
          mimeType: req.file.mimetype,
        })

        if (!processedLogo) return

        req.file.data = processedLogo.buffer
        req.file.name = processedLogo.filename
        req.file.mimetype = processedLogo.mimeType
        req.file.size = processedLogo.size
      },
    ],
  },
  upload: {
    crop: true,
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
        description:
          "Molto importante per la SEO e l'accessibilita. Se scrivi 'Logo <brand>' proviamo anche a rimuovere automaticamente lo sfondo chiaro dai loghi caricati.",
      },
    },
  ],
}
