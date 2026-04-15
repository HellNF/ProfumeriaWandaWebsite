#!/usr/bin/env node
/**
 * import-marche.mjs
 *
 * Carica in massa i brand Ethos nel gestionale Payload CMS.
 * Per ogni brand:
 *   1. Scarica il logo dall'URL (se presente)
 *   2. Lo carica su /api/media → ottiene l'ID
 *   3. Crea il brand su /api/marche con nome, descrizione e logo
 *
 * Utilizzo:
 *   PAYLOAD_EMAIL=admin@example.com PAYLOAD_PASSWORD=tuapassword node scripts/import-marche.mjs
 *
 * Opzionale (default: http://localhost:3000):
 *   PAYLOAD_URL=https://tuodominio.vercel.app node scripts/import-marche.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE_URL = process.env.PAYLOAD_URL || 'http://localhost:3000'
const EMAIL    = process.env.PAYLOAD_EMAIL
const PASSWORD = process.env.PAYLOAD_PASSWORD

// ─── Validazione ──────────────────────────────────────────────────────────────

if (!EMAIL || !PASSWORD) {
  console.error('❌ Devi fornire le credenziali admin come variabili d\'ambiente:')
  console.error('   PAYLOAD_EMAIL=admin@example.com PAYLOAD_PASSWORD=tuapassword node scripts/import-marche.mjs')
  process.exit(1)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function login() {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const data = await res.json()
  if (!data.token) {
    throw new Error(`Login fallito: ${JSON.stringify(data.errors ?? data)}`)
  }
  return data.token
}

async function uploadMedia(token, imageUrl, brandName) {
  let res
  try {
    res = await fetch(imageUrl, { signal: AbortSignal.timeout(10_000) })
  } catch {
    return null
  }
  if (!res.ok) return null

  const buffer = await res.arrayBuffer()
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const ext = contentType.includes('png') ? 'png' : 'jpg'
  const filename = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-logo.' + ext

  const formData = new FormData()
  formData.append('file', new Blob([buffer], { type: contentType }), filename)
  formData.append('alt', `Logo ${brandName}`)

  const uploadRes = await fetch(`${BASE_URL}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: formData,
  })

  const data = await uploadRes.json()
  return data?.doc?.id ?? null
}

async function brandExists(token, nome) {
  const res = await fetch(
    `${BASE_URL}/api/marche?where[nome][equals]=${encodeURIComponent(nome)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } }
  )
  const data = await res.json()
  return (data?.totalDocs ?? 0) > 0
}

async function createBrand(token, { nome, descrizione, logoId }) {
  const body = { nome, descrizione }
  if (logoId) body.logo = logoId

  const res = await fetch(`${BASE_URL}/api/marche`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  })
  return res.json()
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const dataPath = path.join(__dirname, '../docs/ethos-brands-data.json')
  const brands = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  console.log(`\n🚀 Avvio import di ${brands.length} brand su ${BASE_URL}\n`)

  const token = await login()
  console.log('✅ Login effettuato\n')

  let created = 0
  let skipped = 0
  let errors  = 0

  for (const brand of brands) {
    // Salta se esiste già
    const exists = await brandExists(token, brand.nome)
    if (exists) {
      console.log(`⏭  ${brand.nome} già presente, salto`)
      skipped++
      continue
    }

    // Carica logo
    let logoId = null
    if (brand.logoUrl) {
      logoId = await uploadMedia(token, brand.logoUrl, brand.nome)
      if (logoId) {
        console.log(`📸 Logo caricato: ${brand.nome}`)
      } else {
        console.warn(`⚠️  Logo non disponibile per ${brand.nome}, creo senza immagine`)
      }
    }

    // Crea brand
    const result = await createBrand(token, {
      nome: brand.nome,
      descrizione: brand.descrizione,
      logoId,
    })

    if (result?.doc?.id) {
      console.log(`✅ ${brand.nome} creato (ID: ${result.doc.id})`)
      created++
    } else {
      const errMsg = result?.errors?.map(e => e.message).join(', ') ?? JSON.stringify(result)
      console.error(`❌ Errore per ${brand.nome}: ${errMsg}`)
      errors++
    }

    // Pausa tra i brand per non sovraccaricare il server
    await sleep(400)
  }

  console.log('\n─────────────────────────────────────')
  console.log(`🎉 Import completato!`)
  console.log(`   ✅ Creati:  ${created}`)
  console.log(`   ⏭  Saltati: ${skipped} (già presenti)`)
  console.log(`   ❌ Errori:  ${errors}`)
  console.log('─────────────────────────────────────\n')
}

main().catch(err => {
  console.error('❌ Errore fatale:', err.message)
  process.exit(1)
})
