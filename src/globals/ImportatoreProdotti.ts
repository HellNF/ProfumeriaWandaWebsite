import type { GlobalConfig, PayloadRequest } from 'payload'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

async function uploadMediaFromUrl(
  payload: PayloadRequest['payload'],
  imageUrl: string,
  altText: string,
): Promise<string | number | null> {
  try {
    const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(15_000) })
    if (!imgRes.ok) return null
    const buffer = Buffer.from(await imgRes.arrayBuffer())
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg'
    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg'
    const filename = altText.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60) + '.' + ext

    const media = await payload.create({
      collection: 'media',
      data: { alt: altText },
      file: { data: buffer, mimetype: contentType, name: filename, size: buffer.length },
    })
    return media.id
  } catch {
    return null
  }
}

// ─── Endpoint handler ─────────────────────────────────────────────────────────

async function importaJsonHandler(req: PayloadRequest): Promise<Response> {
  if (!req.user) {
    return Response.json({ error: 'Non autenticato' }, { status: 401 })
  }

  let prodotti: {
    nome: string
    marca: string
    categoria: string
    destinatario?: string | null
    formato?: number | null
    descrizione?: string | null
    prezzo: number
    fotoUrls?: string[] | null
    disponibile?: boolean
    inEvidenza?: boolean
    inPromozione?: boolean
    percentualeSconto?: number | null
  }[]

  try {
    if (typeof req.json !== 'function') {
      throw new Error('Request body non disponibile')
    }
    prodotti = await req.json()
    if (!Array.isArray(prodotti)) throw new Error('Il body deve essere un array')
  } catch {
    return Response.json({ error: 'Body JSON non valido' }, { status: 400 })
  }

  const payload = req.payload
  const risultati = {
    creati: 0,
    saltati: 0,
    errori: [] as { nome: string; errore: string }[],
  }

  // Cache locale marche per evitare query ripetute
  const marcheCache = new Map<string, string | number>()

  for (const prodotto of prodotti) {
    if (!prodotto.nome || !prodotto.marca || !prodotto.categoria || prodotto.prezzo == null) {
      risultati.errori.push({
        nome: prodotto.nome ?? '(senza nome)',
        errore: 'Campi obbligatori mancanti: nome, marca, categoria, prezzo',
      })
      continue
    }

    // Salta se esiste già (stesso slug)
    const slug = formatSlug(prodotto.nome)
    const esistente = await payload.find({
      collection: 'prodotti',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (esistente.totalDocs > 0) {
      risultati.saltati++
      continue
    }

    // Risolvi ID marca (con cache)
    let marcaId: string | number | null = null
    const nomeNorm = prodotto.marca.trim()
    if (marcheCache.has(nomeNorm)) {
      marcaId = marcheCache.get(nomeNorm)!
    } else {
      const trovata = await payload.find({
        collection: 'marche',
        where: { nome: { equals: nomeNorm } },
        limit: 1,
      })
      if (trovata.totalDocs > 0) {
        marcaId = trovata.docs[0].id
        marcheCache.set(nomeNorm, marcaId)
      }
    }

    if (!marcaId) {
      risultati.errori.push({
        nome: prodotto.nome,
        errore: `Marca "${nomeNorm}" non trovata nel gestionale`,
      })
      continue
    }

    // Carica le foto
    const fotoArray: { immagine: string | number }[] = []
    if (prodotto.fotoUrls?.length) {
      for (const url of prodotto.fotoUrls.slice(0, 4)) {
        const mediaId = await uploadMediaFromUrl(payload, url, prodotto.nome)
        if (mediaId) fotoArray.push({ immagine: mediaId })
      }
    }

    // Calcolo prezzo scontato
    let prezzoScontato: number | null = null
    if (prodotto.inPromozione && prodotto.percentualeSconto) {
      const sconto = (prodotto.prezzo * prodotto.percentualeSconto) / 100
      prezzoScontato = parseFloat((prodotto.prezzo - sconto).toFixed(2))
    }

    try {
      await payload.create({
        collection: 'prodotti',
        data: {
          nome: prodotto.nome,
          slug,
          marca: marcaId,
          categoria: prodotto.categoria as string,
          ...(prodotto.destinatario ? { destinatario: prodotto.destinatario } : {}),
          ...(prodotto.formato ? { formato: prodotto.formato } : {}),
          ...(prodotto.descrizione ? { descrizione: prodotto.descrizione } : {}),
          prezzo: prodotto.prezzo,
          disponibile: prodotto.disponibile ?? true,
          inEvidenza: prodotto.inEvidenza ?? false,
          inPromozione: prodotto.inPromozione ?? false,
          ...(prodotto.percentualeSconto ? { percentualeSconto: prodotto.percentualeSconto } : {}),
          ...(prezzoScontato !== null ? { prezzoScontato } : {}),
          ...(fotoArray.length > 0 ? { foto: fotoArray } : {}),
        },
      })
      risultati.creati++
    } catch (e: unknown) {
      risultati.errori.push({
        nome: prodotto.nome,
        errore: e instanceof Error ? e.message : 'Errore sconosciuto',
      })
    }
  }

  return Response.json(risultati)
}

// ─── Global config ────────────────────────────────────────────────────────────

export const ImportatoreProdotti: GlobalConfig = {
  slug: 'importatore-prodotti',
  label: 'Importatore Prodotti',
  admin: {
    group: 'Amministrazione',
    description: 'Importa prodotti da file JSON. Le marche devono essere già presenti nel gestionale.',
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
          Field: '/components/admin/ImportazioneProdottiJSON#ImportazioneProdottiJSON',
        },
      },
    },
  ],
}
