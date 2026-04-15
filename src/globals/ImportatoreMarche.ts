import type { GlobalConfig, PayloadRequest } from 'payload'

// ─── Endpoint handler ─────────────────────────────────────────────────────────

async function importaJsonHandler(req: PayloadRequest): Promise<Response> {
  if (!req.user) {
    return Response.json({ error: 'Non autenticato' }, { status: 401 })
  }

  let brands: { nome: string; logoUrl?: string | null; descrizione?: string | null }[]
  try {
    if (typeof req.json !== 'function') {
      throw new Error('Request body non disponibile')
    }
    brands = await req.json()
    if (!Array.isArray(brands)) throw new Error('Il body deve essere un array')
  } catch {
    return Response.json({ error: 'Body JSON non valido' }, { status: 400 })
  }

  const payload = req.payload
  const risultati = { creati: 0, saltati: 0, errori: [] as { nome: string; errore: string }[] }

  for (const brand of brands) {
    if (!brand.nome) continue

    // Salta se esiste già
    const esistente = await payload.find({
      collection: 'marche',
      where: { nome: { equals: brand.nome } },
      limit: 1,
    })
    if (esistente.totalDocs > 0) {
      risultati.saltati++
      continue
    }

    // Scarica e carica il logo
    let logoId: string | number | null = null
    if (brand.logoUrl) {
      try {
        const imgRes = await fetch(brand.logoUrl, { signal: AbortSignal.timeout(10_000) })
        if (imgRes.ok) {
          const buffer = Buffer.from(await imgRes.arrayBuffer())
          const contentType = imgRes.headers.get('content-type') || 'image/jpeg'
          const ext = contentType.includes('png') ? 'png' : 'jpg'
          const filename = brand.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-logo.' + ext

          const media = await payload.create({
            collection: 'media',
            data: { alt: `Logo ${brand.nome}` },
            file: {
              data: buffer,
              mimetype: contentType,
              name: filename,
              size: buffer.length,
            },
          })
          logoId = media.id
        }
      } catch {
        // Continua senza logo
      }
    }

    // Crea la marca
    try {
      await payload.create({
        collection: 'marche',
        data: {
          nome: brand.nome,
          descrizione: brand.descrizione ?? undefined,
          ...(logoId ? { logo: logoId } : {}),
        },
      })
      risultati.creati++
    } catch (e: unknown) {
      risultati.errori.push({
        nome: brand.nome,
        errore: e instanceof Error ? e.message : 'Errore sconosciuto',
      })
    }
  }

  return Response.json(risultati)
}

// ─── Global config ────────────────────────────────────────────────────────────

export const ImportatoreMarche: GlobalConfig = {
  slug: 'importatore-marche',
  label: 'Strumento Importazione Marche',
  admin: {
    group: 'Amministrazione',
    description: 'Importa brand da file JSON o inseriscili manualmente qui sotto.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
  },
  endpoints: [
    {
      path: '/importa-json',
      method: 'post',
      handler: importaJsonHandler,
    },
  ],
  fields: [
    {
      name: 'importazioneJSON',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/ImportazioneJSON#ImportazioneJSON',
        },
      },
    },
    {
      name: 'marcheDaImportare',
      type: 'array',
      label: 'Brand da importare manualmente (alternativo al JSON)',
      labels: {
        singular: 'Brand da importare',
        plural: 'Brand da importare',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'nome',
              type: 'text',
              required: true,
              label: 'Nome Brand',
              admin: { width: '30%' },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              admin: { width: '30%' },
            },
            {
              name: 'descrizione',
              type: 'textarea',
              label: 'Breve Descrizione',
              admin: { width: '40%', rows: 2 },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (!doc.marcheDaImportare || doc.marcheDaImportare.length === 0) return
        const { payload } = req
        for (const item of doc.marcheDaImportare) {
          const esistente = await payload.find({
            collection: 'marche',
            where: { nome: { equals: item.nome } },
          })
          if (esistente.totalDocs === 0) {
            try {
              await payload.create({
                collection: 'marche',
                data: { nome: item.nome, logo: item.logo, descrizione: item.descrizione },
              })
            } catch (e) {
              console.error(`Errore importazione ${item.nome}:`, e)
            }
          }
        }
      },
    ],
  },
}
