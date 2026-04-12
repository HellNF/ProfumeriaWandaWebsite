# Brainstorming — Profumeria Wanda Website

> Sessione di grilling completa: decisioni di design, tech stack, CMS, roadmap, logo brief, automazioni AI.

---

## 1. Contesto e Obiettivo

**Il negozio**
- Negozio fisico con tre reparti: profumeria + cosmetici/trucco + pelletteria (borse, valigie, zaini)
- Affiliato **ETHOS**: l'ente fornisce prodotti, formazione tecnica e una carta fedeltà condivisa fra negozi affiliati. Non impone vincoli grafici al sito; dettagli tecnici dell'integrazione da riconfirmare col cliente.
- Attivo **dal 1960**: la storicità è un valore di brand da comunicare.

**Scopo del sito**
Presenza online elegante e moderna. Non è un e-commerce: il sito è una **landing page + vetrina catalogo** per promuovere passivamente il negozio e far trovare i clienti online.

**Target clientela**
Prevalentemente femminile, fascia 30–70 anni, fascia economica media-alta. Abitudini d'acquisto tradizionali ma crescente uso del mobile per cercare negozi locali.

**Gestione**
I proprietari (non tecnici) devono poter aggiornare prodotti, promozioni ed eventi in autonomia, senza intervento dello sviluppatore.

---

## 2. Decisioni di Design

### Palette colori
| Token | Hex | Uso |
|---|---|---|
| `wanda-nero` | `#0A0A0A` | Sfondi scuri, testo principale |
| `wanda-bianco` | `#FFFFFF` | Sfondi chiari |
| `wanda-fucsia` | `#D4006E` | Accento principale, CTA, badge promo |
| `wanda-violetto` | `#7B2D8B` | Accento secondario |
| `wanda-gray-light` | `#F5F5F5` | Sfondi sezione neutri |
| `wanda-gray-mid` | `#9CA3AF` | Testo secondario, placeholder |

### Tipografia
- **Titoli/Hero:** *Playfair Display* (serif elegante — richiama la stampa di moda)
- **Body/UI:** *Inter* (sans-serif moderna — alta leggibilità)
- Caricati via `next/font/google` con CSS variables

### Estetica
- Stile "boutique" / rivista cartacea digitale — elegante ma non ostentato
- Non lusso, non fast fashion: fascia media-alta accessibile
- Mobile-first con bottom navigation bar permanente su mobile

### Badge promozionali
- Pill colorata fucsia sulla foto prodotto con "PROMO" o "−X%"
- Disponibilità: badge grigio "Non disponibile" in alto a destra sulla card

---

## 3. Logo — Brief per Graphic Designer

**Situazione attuale**
Il logo attuale è uno script corsivo con nome del negozio e decori circolari (spirali, foglie). È vecchio, non vettoriale, non scalabile.

**Obiettivo**
Wordmark moderno e scalabile in SVG, che mantenga personalità senza sembrare generico.

**Elementi da preservare**
- Il nome "Wanda" (il cuore del brand)
- La data "dal 1960" (valore storico)
- Un accento di colore fucsia

**Direzione stilistica**
- Wordmark pulito: il nome "Wanda" come elemento principale
- "profumeria" sopra in small caps tracking ampio (come i marchi di moda)
- "dal 1960" sotto, piccolo, in tracking
- Carattere serif con spirito contemporaneo (es. Cormorant Garamond, Didot, Bodoni alternativo)
- Accento fucsia: su una lettera, su un punto decorativo, o su una sottile linea orizzontale

**Cosa evitare**
- Icone generiche (flaconi di profumo, fiori)
- Corsivo intricato non leggibile in piccolo
- Soluzioni troppo lussuose/couture

**Formati richiesti**
- SVG vettoriale (master)
- PNG trasparente 2x per web
- Versione orizzontale (logo + payoff)
- Versione icona/favicon (solo "W" o iniziale)
- Variante chiara (su sfondo scuro) e scura (su sfondo bianco)

---

## 4. Struttura Pagine

```
/ Home
  ├── Hero grande (immagine/claim dal CMS)
  ├── Prodotti in evidenza (grid 4–6 prodotti flaggati inEvidenza)
  ├── [Fase 2] Banner promozioni attive (auto da CMS, scompaiono a scadenza)
  ├── [Fase 2] Feed Instagram (ultime 6 foto)
  └── Link social + menzione carta fedeltà ETHOS

/catalogo
  ├── Filtro categoria (Profumeria · Cosmetici · Trucco · Pelletteria · Borse/Valigie · Altro)
  ├── Toggle "Solo in promozione"
  └── Card prodotto con badge sconto e badge disponibilità

/negozio
  ├── Descrizione negozio / chi siamo
  ├── Orari e indirizzo
  ├── Google Maps embed
  ├── Contatti (telefono, WhatsApp)
  ├── Link social (Instagram, Facebook)
  └── Menzione affiliazione ETHOS + carta fedeltà

[Fase 2] /promozioni
  └── Lista promozioni attive (scadute nascoste automaticamente per data)

[Fase 2] /eventi
  └── Lista eventi futuri con CTA "Prenota su WhatsApp" o Calendly embed
```

**Navigazione mobile:** bottom bar con 3 voci (Home · Catalogo · Negozio)
**Navigazione desktop:** header sticky con logo + links

---

## 5. Schema Dati Payload CMS

### Collection: Prodotti
```
nome            (text, required)
categoria       (select: profumeria | cosmetici | trucco | pelletteria | borse-valigie | altro)
marca           (text, opzionale)
descrizione     (textarea, max ~200 chars)
foto            (array immagini, max 4, upload → Media)
prezzo          (number, opzionale — se vuoto non appare)
inPromozione    (boolean, default false)
prezzoScontato  (number, visibile solo se inPromozione=true)
disponibile     (boolean, default true) — strict false check per badge
inEvidenza      (boolean, default false) — appare in homepage
```

**Note:**
- Foto polimorfiche: l'immagine può essere un oggetto `{ url, alt }` (uploaded) o una stringa (URL esterno) — la card gestisce entrambi i casi.
- Il badge "Non disponibile" usa `disponibile === false` (strict check) — i prodotti con campo non impostato non mostrano il badge.

### Collection: Media
```
Tipo: upload
staticDir: public/media
Thumbs: thumbnail 400×400, card 800×800
mimeTypes: image/*
access: { read: () => true }
```

### Collection: Users
```
Built-in Payload auth collection
Admin email + password
```

### Global: ImpostazioniNegozio
```
nomeNegozio           (text)
descrizioneNegozio    (textarea)
orari                 (textarea, whitespace-pre-line per a-capo)
indirizzo             (text)
telefono              (text)
linkInstagram         (text, URL)
linkFacebook          (text, URL)
linkWhatsApp          (text, numero)
testoHero             (text, titolo h1 homepage)
sottotitoloHero       (text, subtitolo homepage)
immagineHero          (upload → Media)
googleMapsEmbedUrl    (text, URL embed iframe)
```

**Nota sicurezza:** `access: { read: () => true }` su tutte le collections/globals per permettere query non autenticate dal frontend.

### [Fase 2] Collection: Promozioni
```
titolo              (text, required)
immagineCopertina   (image)
testo               (richtext)
dataInizio          (date)
dataFine            (date) → nascosta automaticamente dopo scadenza
prodottiCollegati   (relation → Prodotti, opzionale)
```

### [Fase 2] Collection: Eventi
```
titolo            (text, required)
data              (date)
descrizione       (richtext)
immagine          (image)
tipoPrenotazione  (select: nessuna | whatsapp | calendly)
linkPrenotazione  (url, opzionale)
```

---

## 6. Stack Tecnico — Decisioni e Rationale

| Layer | Tecnologia | Rationale |
|---|---|---|
| Frontend | **Next.js 15** (App Router) | SSR/SSG, SEO ottimale, Server Components |
| CMS / Admin | **Payload CMS 3** | Admin panel intuitivo, headless, serverless su Vercel, nessun vendor lock-in |
| Database | **PostgreSQL via Supabase** (free tier) | Managed, zero cold start (vs Neon), include storage file |
| Hosting frontend + CMS | **Vercel** | Deploy automatico da git, CDN globale, tier gratuito generoso |
| CSS | **Tailwind CSS v3** | ⚠️ v3 obbligatorio — Tailwind v4 è incompatibile con Payload CMS 3 |
| Font | **next/font/google** | Playfair Display + Inter, CSS variables |
| Analytics semplice | **Plausible Analytics** | No cookie banner, GDPR-ready, dashboard intuitiva |
| Analytics avanzato | **Google Analytics 4** | Per analisi esperte — Fase 2 |
| Testing | **Jest + React Testing Library** | TDD per componenti UI critici |

### Vincolo critico — versioni
- **Next.js:** `15.4.11` (pinned per compatibilità peer dep con Payload CMS 3)
- **Tailwind:** v3 (non v4 — v4 usa CSS-first config incompatibile con Payload)
- **React:** 19.x

### Automazioni AI — Fase 3
| Componente | Scelta | Note |
|---|---|---|
| Orchestratore | **n8n self-hosted** | Su mini PC in negozio o VPS (TBD con cliente) |
| AI locale | **Ollama + Gemma4** | Su mini PC locale, genera caption social |
| Tunnel webhook | **Cloudflare Tunnel** | Espone n8n a internet, gratuito, no port forwarding |
| Fallback cloud | Claude Haiku / Gemini Flash | Se locale non disponibile — ~10-20 post/mese, costo trascurabile |

---

## 7. Architettura Filtering Catalogo

I filtri del catalogo usano URL-based state (no client state):
```
/catalogo?categoria=profumeria&promo=1
```

- `FilterBar` è un Client Component (`'use client'`) che legge e scrive i search params
- `CatalogoPage` è un Server Component che legge i searchParams, interroga Payload e passa i prodotti a `ProductGrid`
- Nessun fetch client-side — tutto avviene server-side al cambio URL
- Compatibile con SSR e bookmark/condivisione URL

---

## 8. Prenotazione Eventi (Fase 2)

- **Immediatamente operativo:** link WhatsApp deep-link con messaggio pre-compilato (`wa.me/...`)
- **Per eventi strutturati:** Calendly embed (consulenze trucco, armocromia, ecc.)
- **Futuro:** prenotazione integrata nel CMS (non esclusa, da valutare)
- I proprietari gestiscono le prenotazioni in autonomia (email di notifica + Calendly dashboard)

---

## 9. Flusso Automazione Social AI (Fase 3)

```
1. Proprietario pubblica prodotto/promo nel CMS
         ↓ webhook Payload
2. n8n riceve evento
         ↓
3. Genera caption ottimizzata (Gemma4 via Ollama)
   + [Fase 3b] immagine grafica (template HTML→PNG)
         ↓
4. Invia anteprima al proprietario (WhatsApp o email)
         ↓
5. Proprietario approva con un click
         ↓
6. n8n pubblica su Instagram/Facebook via API
```

**Architettura webhook aperta:** ogni evento CMS (nuovo prodotto, nuova promo, nuovo evento) emette un webhook intercettabile da n8n. Qualsiasi automazione futura si aggiunge senza modificare il codice del sito.

---

## 10. Catalogo Prodotti — Logistica

- Stima articoli: 200–300, non tutti verranno caricati subito
- Il negozio **non ha un catalogo fotografico pronto** — le foto sono da costruire progressivamente
- **Primo import:** script da CSV/Excel compilato dai proprietari (Fase 2)
- **Gestione corrente:** i proprietari aggiornano manualmente dal pannello Payload

---

## 11. SEO Locale

- **Structured data:** `LocalBusiness` schema (JSON-LD) sulla pagina /negozio
- **Sitemap XML:** generata automaticamente da Next.js (`src/app/sitemap.ts`)
- **Robots.txt:** blocca `/admin/` e `/api/`, permette tutto il resto
- **Meta tag:** titolo, descrizione, openGraph per ogni pagina
- **Obiettivo primario:** apparire su Google Maps/ricerca locale per "profumeria [città]"
- Google Business Profile collegato (fuori scope del sito)

---

## 12. Roadmap a Fasi

### Fase 1 — MVP ✅ (completato)
- [x] Setup Next.js 15 + Payload CMS 3 + Supabase PostgreSQL su Vercel
- [x] Design system: palette, font, componenti base
- [x] Pagine: Home, Catalogo (con filtri), Il Negozio
- [x] Admin panel con gestione prodotti e impostazioni negozio
- [x] SEO: structured data, sitemap.xml, robots.txt, metadata
- [x] Plausible Analytics
- [x] Mobile-first layout con bottom nav
- [x] Deploy Vercel con `vercel.json`

### Fase 2 — Completamento
- [ ] Pagina Promozioni (con scadenza automatica)
- [ ] Pagina Eventi (con CTA prenotazione)
- [ ] Feed Instagram in homepage
- [ ] Google Analytics 4
- [ ] Script import prodotti da CSV
- [ ] Filtro marca nel catalogo

### Fase 3 — Automazioni AI
- [ ] n8n self-hosted (mini PC o VPS — TBD)
- [ ] Cloudflare Tunnel per webhook
- [ ] Generazione caption AI (Gemma4/Ollama)
- [ ] Template grafico per post social
- [ ] Webhook architecture CMS → n8n → social

### Fase 4 — Future (TBD col cliente)
- [ ] Booking integrato nel CMS
- [ ] Gestione giacenze real-time (integrazione gestionale interno)
- [ ] Integrazione catalogo/dati ETHOS
- [ ] Newsletter automation
- [ ] Ulteriori workflow n8n

---

## 13. Punti Aperti da Riconfirmare col Cliente

1. **ETHOS:** vincoli/opportunità dell'affiliazione — possibilità di feed catalogo automatico, integrazione tecnica carta fedeltà
2. **Deployment n8n:** mini PC locale vs VPS — analisi costi e affidabilità
3. **Modello AI:** Gemma4 locale definitivo vs fallback cloud — valutazione efficacia
4. **Logo:** commissionare a graphic designer con brief del §3
5. **Foto prodotti:** piano per costruire il catalogo fotografico
6. **Import CSV:** formato dati da concordare per il primo import massivo

---

## 14. Note Implementazione — Gotcha e Fix Critici

### Sicurezza
- `PAYLOAD_SECRET` deve essere una stringa casuale 32+ char — il codice lancia eccezione se mancante (no fallback a stringa vuota)
- `access: { read: () => true }` obbligatorio su collections/globals per query frontend non autenticate

### TypeScript / Payload
- `prodotti as any` è un workaround accettato per i tipi generati da Payload — accompagnare con `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
- `searchParams` in Next.js 15 è una `Promise<{...}>` — deve essere awaited
- `FilterBar` usa `useSearchParams()` — deve essere wrappato in `<Suspense>` nella pagina

### CSS
- `disponibile === false` (strict check) — `!disponibile` mostrerebbe il badge anche per `undefined`
- `pt-12 pb-24` invece di `py-12 pb-24` — chiarezza esplicita senza dipendenze implicite
- `container` con `center: true` in tailwind.config → `mx-auto` è ridondante con `container`

### JSON-LD
- `JSON.stringify(data).replace(/<\/script>/gi, '<\\/script>')` — prevenire XSS da CMS value contenente `</script>`

### WhatsApp URL
- `wa.me/${numero.replace(/\D/g, '')}` — strippare tutti i non-digit
- `tel:${telefono.replace(/\s/g, '')}` — RFC 3966 vuole no spazi
