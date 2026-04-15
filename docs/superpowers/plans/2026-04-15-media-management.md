# Media Management — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Spostare lo storage dei media Payload da disco locale a Supabase Storage (S3) per compatibilità con Vercel, e ottimizzare imageSizes da 6 a 2 varianti.

**Architecture:** Plugin `@payloadcms/storage-s3` intercetta gli upload Payload e li redirige a Supabase Storage via API S3-compatibile. Sharp genera le 2 varianti in memoria su Vercel, poi il plugin carica originale + varianti sul bucket. Il DB PostgreSQL salva solo i metadati (URL, filename, alt). Il frontend punta direttamente a Supabase CDN.

**Tech Stack:** `@payloadcms/storage-s3@3.x`, Supabase Storage (S3-compatible), Payload CMS v3, Next.js App Router, Jest

---

## File Map

| File | Azione | Responsabilità |
|------|--------|---------------|
| `src/payload.config.ts` | Modifica | Registra plugin s3Storage |
| `src/collections/Media.ts` | Modifica | Rimuove staticDir, taglia 4 imageSizes |
| `src/collections/Prodotti.ts` | Modifica | Aggiunge index: true su 3 campi |
| `next.config.ts` | Modifica | Aggiunge hostname Supabase a remotePatterns |
| `.env` | Modifica | Aggiunge 5 env vars S3 |
| `src/lib/utils.ts` | Modifica | Aggiorna normalizePayloadUrl per URL Supabase |
| `src/lib/__tests__/utils.test.ts` | Modifica | Aggiunge test per nuovo URL pattern |

---

## Prerequisiti manuali (PRIMA di qualsiasi task)

> Queste azioni si fanno nel browser sul dashboard Supabase — non sono automatizzabili senza service role key.

- [ ] Vai su [supabase.com](https://supabase.com) → progetto `kcenuiwiyhschkgqattd`
- [ ] **Crea bucket:** Storage → New bucket → Nome: `wanda-media` → spunta "Public bucket" → Save
- [ ] **Genera S3 keys:** Project Settings → Storage → S3 Access Keys → New access key
- [ ] Copia **Access Key ID** e **Secret Access Key** — servono nel Task 1

---

## Task 1: Env vars S3

**Files:**
- Modifica: `.env`

- [ ] **Step 1: Aggiungi le 5 variabili al file `.env`**

```bash
# Supabase Storage S3
SUPABASE_S3_ACCESS_KEY_ID=<incolla qui l'Access Key ID dal dashboard>
SUPABASE_S3_SECRET_ACCESS_KEY=<incolla qui il Secret>
SUPABASE_S3_BUCKET=wanda-media
SUPABASE_S3_ENDPOINT=https://kcenuiwiyhschkgqattd.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=eu-west-3
```

- [ ] **Step 2: Verifica che le variabili siano presenti**

```bash
grep SUPABASE_S3 .env
```

Expected output:
```
SUPABASE_S3_ACCESS_KEY_ID=...
SUPABASE_S3_SECRET_ACCESS_KEY=...
SUPABASE_S3_BUCKET=wanda-media
SUPABASE_S3_ENDPOINT=https://kcenuiwiyhschkgqattd.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=eu-west-3
```

- [ ] **Step 3: Commit**

```bash
git add .env
git commit -m "chore: add Supabase S3 env vars for media storage"
```

---

## Task 2: Installa dipendenza

**Files:**
- Modifica: `package.json`, `package-lock.json`

- [ ] **Step 1: Installa il package alla versione allineata con Payload**

```bash
npm install @payloadcms/storage-s3@3.82.1
```

- [ ] **Step 2: Verifica che sia in package.json**

```bash
grep storage-s3 package.json
```

Expected: `"@payloadcms/storage-s3": "3.82.1"`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add @payloadcms/storage-s3 dependency"
```

---

## Task 3: Aggiorna next.config.ts

**Files:**
- Modifica: `next.config.ts`

- [ ] **Step 1: Aggiungi hostname Supabase a remotePatterns**

Apri `next.config.ts`. Il blocco `images.remotePatterns` attuale è:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
    },
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '3000',
    },
  ],
},
```

Sostituiscilo con:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'kcenuiwiyhschkgqattd.supabase.co',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
    },
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '3000',
    },
  ],
},
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "feat: allow Supabase Storage hostname in Next.js image remotePatterns"
```

---

## Task 4: Aggiorna normalizePayloadUrl

**Files:**
- Modifica: `src/lib/utils.ts`
- Modifica: `src/lib/__tests__/utils.test.ts`

`normalizePayloadUrl` sostituisce `localhost:3000` con il server URL env. Con Supabase, gli URL sono già assoluti (`https://...supabase.co/...`) — la funzione non deve toccarli.

- [ ] **Step 1: Leggi l'implementazione attuale di normalizePayloadUrl in `src/lib/utils.ts`**

Individua la funzione `normalizePayloadUrl`. Verifica il comportamento attuale.

- [ ] **Step 2: Scrivi il test prima di toccare il codice**

In `src/lib/__tests__/utils.test.ts`, aggiungi in fondo:

```ts
describe('normalizePayloadUrl', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SERVER_URL

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://profumeriawanda.it'
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_SERVER_URL = originalEnv
  })

  it('non modifica URL Supabase già assoluti', () => {
    const url = 'https://kcenuiwiyhschkgqattd.supabase.co/storage/v1/object/public/wanda-media/foto.webp'
    expect(normalizePayloadUrl(url)).toBe(url)
  })

  it('sostituisce localhost con NEXT_PUBLIC_SERVER_URL', () => {
    const url = 'http://localhost:3000/media/foto.webp'
    expect(normalizePayloadUrl(url)).toBe('https://profumeriawanda.it/media/foto.webp')
  })

  it('restituisce null per input null/undefined', () => {
    expect(normalizePayloadUrl(null)).toBeNull()
    expect(normalizePayloadUrl(undefined)).toBeNull()
  })
})
```

Aggiungi `normalizePayloadUrl` all'import nella prima riga del test file:
```ts
import { formatPrice, getCategoryLabel, getDiscountPercent, normalizePayloadUrl } from '../utils'
```

- [ ] **Step 3: Esegui i test per verificare che falliscano o passino già**

```bash
npm test -- --testPathPattern=utils
```

Se `normalizePayloadUrl` già non tocca URL assoluti → i test passano → nessuna modifica al codice necessaria. Se falliscono → vai allo step 4.

- [ ] **Step 4 (solo se test falliscono): Aggiorna normalizePayloadUrl in `src/lib/utils.ts`**

Assicurati che la funzione non modifichi URL che iniziano con `https://` (già assoluti da Supabase):

```ts
export function normalizePayloadUrl(url: string | null | undefined): string | null {
  if (!url) return null
  // URL già assoluti (es. Supabase Storage) — non toccare
  if (url.startsWith('https://') || url.startsWith('//')) return url
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, serverUrl)
}
```

- [ ] **Step 5: Esegui i test**

```bash
npm test -- --testPathPattern=utils
```

Expected: tutti PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/utils.ts src/lib/__tests__/utils.test.ts
git commit -m "test: add normalizePayloadUrl tests for Supabase URL passthrough"
```

---

## Task 5: Aggiorna Media.ts

**Files:**
- Modifica: `src/collections/Media.ts`

- [ ] **Step 1: Sostituisci tutto il contenuto di `src/collections/Media.ts`**

```ts
// src/collections/Media.ts
import type { CollectionConfig } from 'payload'

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
    crop: {
      aspectRatios: [
        { label: 'Quadrato (1:1)', value: 1 / 1 },
        { label: 'Ritratto (4:5)', value: 4 / 5 },
        { label: 'Cinemascope (16:9)', value: 16 / 9 },
        { label: 'A4 (1:1.41)', value: 1 / 1.41 },
        { label: 'Custom', value: undefined },
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
        description: "Molto importante per la SEO e l'accessibilità. Descrivi brevemente cosa mostra l'immagine.",
      },
    },
  ],
}
```

Nota: `staticDir` rimosso (gestito dal plugin S3). Import `path` e `fileURLToPath` rimossi (non più necessari).

- [ ] **Step 2: Commit**

```bash
git add src/collections/Media.ts
git commit -m "feat: reduce Media imageSizes from 6 to 2 (thumbnail + card), remove staticDir"
```

---

## Task 6: Aggiorna Prodotti.ts — indici mancanti

**Files:**
- Modifica: `src/collections/Prodotti.ts`

Aggiungi `index: true` a 3 campi per ottimizzare le query del catalogo e homepage.

- [ ] **Step 1: Aggiungi `index: true` al campo `categoria`**

In `src/collections/Prodotti.ts`, trova il campo `categoria` (circa riga 88). Aggiungi `index: true`:

```ts
{
  name: 'categoria',
  type: 'select',
  required: true,
  label: 'Categoria del Negozio',
  index: true,           // <-- aggiungi questa riga
  admin: {
    width: '50%',
    description: 'Scegli dove apparirà il prodotto nel catalogo.',
  },
  options: [
    // ... invariato
  ],
},
```

- [ ] **Step 2: Aggiungi `index: true` al campo `disponibile`**

Trova il campo `disponibile` (sidebar, circa riga 272). Aggiungi `index: true`:

```ts
{
  name: 'disponibile',
  type: 'checkbox',
  label: 'PRODOTTO DISPONIBILE',
  defaultValue: true,
  index: true,           // <-- aggiungi questa riga
  admin: {
    position: 'sidebar',
    description: "Togli la spunta se il prodotto è finito (apparirà come \"Esaurito\").",
  },
},
```

- [ ] **Step 3: Aggiungi `index: true` al campo `inEvidenza`**

Trova il campo `inEvidenza` (sidebar, circa riga 280). Aggiungi `index: true`:

```ts
{
  name: 'inEvidenza',
  type: 'checkbox',
  label: 'MOSTRA IN VETRINA (Home)',
  defaultValue: false,
  index: true,           // <-- aggiungi questa riga
  admin: {
    position: 'sidebar',
    description: 'Se attivo, il prodotto apparirà tra i primi nella pagina principale del sito.',
  },
},
```

- [ ] **Step 4: Commit**

```bash
git add src/collections/Prodotti.ts
git commit -m "perf: add DB indexes on categoria, disponibile, inEvidenza for catalog query optimization"
```

---

## Task 7: Configura plugin S3 in payload.config.ts

**Files:**
- Modifica: `src/payload.config.ts`

- [ ] **Step 1: Sostituisci il contenuto di `src/payload.config.ts`**

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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
      icons: [{ url: '/media/WandaFavicon.ico' }],
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
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.SUPABASE_S3_BUCKET || 'wanda-media',
      config: {
        endpoint: process.env.SUPABASE_S3_ENDPOINT,
        region: process.env.SUPABASE_S3_REGION || 'eu-west-3',
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  telemetry: false,
})
```

- [ ] **Step 2: Verifica che TypeScript non abbia errori**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: nessun output (zero errori)

- [ ] **Step 3: Commit**

```bash
git add src/payload.config.ts
git commit -m "feat: configure @payloadcms/storage-s3 plugin for Supabase Storage"
```

---

## Task 8: Genera ed esegui Payload migration

**Files:**
- Crea: `src/migrations/<timestamp>_media_s3_indexes.ts` (generato da Payload)

Le modifiche a `Media.ts` (rimozione 4 imageSizes) e `Prodotti.ts` (3 nuovi indici) richiedono una migration DB.

- [ ] **Step 1: Genera la migration**

```bash
npm run payload migrate:create -- --name media_s3_indexes
```

Expected: output tipo `Migration created at src/migrations/20260415_..._media_s3_indexes.ts`

- [ ] **Step 2: Ispeziona la migration generata**

```bash
cat src/migrations/20260415_*_media_s3_indexes.ts
```

Verifica che contenga:
- `DROP INDEX` per i 4 imageSizes rimossi (`landscape`, `standard`, `photo`, `portrait`)
- `CREATE INDEX` per `categoria`, `disponibile`, `inEvidenza` su `prodotti`

- [ ] **Step 3: Esegui la migration sul DB**

```bash
npm run payload migrate
```

Expected:
```
Migrating: 20260415_..._media_s3_indexes
Migrated:  20260415_..._media_s3_indexes (Xms)
```

- [ ] **Step 4: Commit**

```bash
git add src/migrations/
git commit -m "feat: add Payload migration for S3 media sizes cleanup and catalog indexes"
```

---

## Task 9: Test end-to-end upload

- [ ] **Step 1: Avvia il server di sviluppo**

```bash
npm run dev
```

- [ ] **Step 2: Vai all'admin Payload**

Apri `http://localhost:3000/admin` nel browser. Login con le credenziali admin.

- [ ] **Step 3: Carica un'immagine di test**

Vai su **Libreria Media** → **Crea nuovo** → carica qualsiasi immagine JPG/PNG → compila il campo Alt → Salva.

- [ ] **Step 4: Verifica che l'immagine sia su Supabase**

Vai su Supabase Dashboard → Storage → bucket `wanda-media`.

Expected: trovi 3 file con prefisso uguale:
```
<filename>.jpg          (originale)
<filename>-400x400.webp (thumbnail)
<filename>-800x800.webp (card)
```

- [ ] **Step 5: Verifica URL nel DB**

Nel record Media appena creato in Payload admin, controlla il campo URL. Expected:
```
https://kcenuiwiyhschkgqattd.supabase.co/storage/v1/object/public/wanda-media/<filename>.jpg
```

- [ ] **Step 6: Verifica rendering frontend**

Vai su `http://localhost:3000/catalogo`. I ProductCard devono mostrare le immagini dei prodotti esistenti (se hanno foto caricate). Se le foto erano locali, ricaricale tramite admin.

- [ ] **Step 7: Commit finale**

```bash
git add -A
git commit -m "feat: complete Supabase Storage migration for Payload media"
```

---

## Note post-implementazione

**Immagini esistenti in `public/media/`:** Le immagini già caricate localmente (visibili in `public/media/`) non vengono migrate automaticamente. Devono essere ricaricate dal gestionale Payload dopo il deploy. Per un ambiente di sviluppo locale è sufficiente ricaricarle manualmente.

**Variabili su Vercel:** Ricordati di aggiungere le 5 variabili `SUPABASE_S3_*` anche nelle Environment Variables di Vercel prima del deploy.
