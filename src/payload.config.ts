import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Prodotti } from './collections/Prodotti.ts'
import { Marche } from './collections/Marche.ts'
import { Recensioni } from './collections/Recensioni.ts'
import { ImpostazioniNegozio } from './globals/ImpostazioniNegozio.ts'
import { ImportatoreMarche } from './globals/ImportatoreMarche.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Profumeria Wanda Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Prodotti, Marche, Media, Users, Recensioni],
  globals: [ImpostazioniNegozio, ImportatoreMarche],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB limit per file
    },
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  telemetry: false, // Opt-out of anonymous telemetry for privacy
})
