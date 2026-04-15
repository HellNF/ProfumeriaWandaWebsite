# Media Management — Design Spec
**Data:** 2026-04-15  
**Progetto:** Profumeria Wanda Website  
**Stato:** Approvato

---

## Problema

Payload CMS salva gli upload in `public/media/` su disco locale. Vercel ha filesystem efimero: i file caricati spariscono ad ogni deploy. Il sito non può andare in produzione senza object storage esterno.

---

## Soluzione

**Supabase Storage** via plugin `@payloadcms/storage-s3` (Supabase espone API S3-compatibile).

Supabase è già provider del DB — zero provider aggiuntivi.

---

## Architettura

### Flusso upload (nuovo)

```
Admin carica immagine in Payload
  → Payload riceve file in memoria
  → Sharp genera 2 varianti WebP (thumbnail + card)
  → Plugin S3 carica originale + 2 varianti su bucket "wanda-media"
  → Payload salva solo metadati (url, filename, alt, sizes) nel DB PostgreSQL
  → Frontend legge url dal DB → punta direttamente a Supabase CDN
```

### Bucket

- Nome: `wanda-media`
- Accesso: pubblico (immagini prodotti pubbliche per definizione)
- Provider: Supabase Storage (S3-compatible)
- Endpoint: `https://kcenuiwiyhschkgqattd.supabase.co/storage/v1/s3`
- Region: `eu-west-3`

---

## Modifiche imageSizes

### Prima (6 varianti — 7 file per immagine)
`thumbnail`, `card`, `landscape`, `standard`, `photo`, `portrait`

### Dopo (2 varianti — 3 file per immagine)

| Variante | Dimensione | Uso |
|----------|-----------|-----|
| `thumbnail` | 400×400 webp q80 | Anteprima admin Payload |
| `card` | 800×800 webp q85 | `ProductCard.tsx` frontend |

`landscape`, `standard`, `photo`, `portrait` eliminati: nessun componente frontend li usa.
Risparmio storage: ~57% (da 7 a 3 file/immagine).

---

## Modifiche codice

### 1. `package.json`
Aggiungi dipendenza:
```
@payloadcms/storage-s3
```

### 2. `src/payload.config.ts`
- Importa e registra `s3Storage` plugin
- Rimuovi `upload.limits` dal root config (gestito dal plugin)
- Configurazione bucket e credenziali S3 via env vars

### 3. `src/collections/Media.ts`
- Rimuovi `staticDir` (non più necessario)
- Rimuovi 4 imageSizes: `landscape`, `standard`, `photo`, `portrait`
- Mantieni: `thumbnail`, `card`, `adminThumbnail`

### 4. `src/collections/Prodotti.ts`
Aggiungi `index: true` a 3 campi per ottimizzazione query catalogo:
- `categoria` — filtro principale pagina catalogo
- `disponibile` — filtro homepage "prodotti disponibili"
- `inEvidenza` — filtro homepage featured products

### 5. `next.config.ts`
Aggiungi hostname Supabase a `remotePatterns`:
```
hostname: 'kcenuiwiyhschkgqattd.supabase.co'
```

### 6. `.env` / `.env.local`
Aggiungi 5 variabili:
```
SUPABASE_S3_ACCESS_KEY_ID=
SUPABASE_S3_SECRET_ACCESS_KEY=
SUPABASE_S3_BUCKET=wanda-media
SUPABASE_S3_ENDPOINT=https://kcenuiwiyhschkgqattd.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=eu-west-3
```

---

## DB Audit — Risultati

### Eseguito con
`npx supabase db lint --linked` + `npx supabase inspect db index-stats --linked`

### Risultati

| Check | Stato | Note |
|-------|-------|------|
| Schema lint | ✅ OK | Nessun errore |
| Replication slots | ✅ OK | Nessuno aperto |
| Sicurezza RLS | ✅ OK | Payload gestisce auth server-side |
| Connessione pooling | ✅ OK | pgbouncer attivo |
| Indici inutilizzati | ℹ️ Normale | ~40 indici Payload a 0 scan — DB ha 5 prodotti, seq scan ottimale su tabelle piccole |
| **Indici mancanti** | ⚠️ Fix richiesto | `categoria`, `disponibile`, `inEvidenza` su `prodotti` |

### Indici mancanti — dettaglio

`prodotti.categoria`: query catalogo filtra per categoria (endpoint principale del sito).  
`prodotti.disponibile`: homepage e catalogo filtrano `disponibile = true`.  
`prodotti.inEvidenza`: homepage filtra `inEvidenza = true`.

Fix: aggiungere `index: true` nel Prodotti collection config → Payload genera migration automaticamente.

### Cleanup automatico
Gli indici per le imageSizes eliminate (`landscape`, `photo`, `portrait`, `standard`) vengono rimossi automaticamente quando si lancia `payload migrate` dopo la modifica a `Media.ts`.

---

## Prerequisiti manuali (dashboard Supabase)

Prima dell'implementazione, l'utente deve:

1. **Creare bucket** `wanda-media` → Storage → New bucket → Public
2. **Generare S3 Access Keys** → Project Settings → Storage → S3 Access Keys → New access key
3. **Copiare** Access Key ID e Secret nel `.env`

---

## Stima storage

- 300 immagini originali × ~1.5MB media = ~450MB
- 300 thumbnail (400px webp) × ~60KB = ~18MB
- 300 card (800px webp) × ~180KB = ~54MB
- **Totale: ~522MB** — dentro limite free Supabase (1GB)

---

## Fuori scope

- Migrazione immagini esistenti da `public/media/` a Supabase Storage (da fare manualmente o script separato)
- Trasformazioni on-the-fly (non necessarie con 2 varianti fisse)
- CDN custom (Supabase CDN built-in è sufficiente)
