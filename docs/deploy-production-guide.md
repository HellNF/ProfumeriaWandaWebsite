# Deploy in Produzione — Guida Generale

---

## 1. Codice Pronto

### Qualità del codice
- Tutti i test passano (`unit`, `integration`, `e2e`)
- Linting senza errori (`eslint`, `prettier`, o equivalente)
- TypeScript (o tipizzazione) senza errori
- Nessun `console.log`, `TODO` critico, o codice commentato lasciato per errore
- Review del codice completata (almeno un secondo occhio su feature critiche)

### Build locale obbligatoria
Esegui sempre il build in locale prima di pushare. Se fallisce in locale, fallisce in produzione.

```bash
npm run build   # o yarn build, cargo build, ecc.
```

### Dipendenze
- Lock file committato (`package-lock.json`, `yarn.lock`, `Cargo.lock`)
- Nessuna dipendenza con vulnerabilità note — verifica con `npm audit`
- Dipendenze di sviluppo non finiscono in produzione

---

## 2. Variabili d'Ambiente e Segreti

**Regola assoluta**: nessun segreto nel codice sorgente, mai.

```
✅ API keys in env vars
✅ Database credentials in env vars
✅ .env in .gitignore
❌ Hardcoded passwords/tokens nel codice
❌ .env committato nel repository
```

### Separazione ambienti
Usa ambienti distinti con variabili separate:

| Ambiente | Scopo |
|----------|-------|
| `development` | Locale, dati fittizi |
| `staging` / `preview` | Simula produzione, dati reali ma isolati |
| `production` | Utenti reali, dati reali |

Staging e produzione devono usare **database separati**. Mai testare su dati di produzione.

### `.env.example`
Mantieni un file `.env.example` nel repository con tutte le variabili necessarie ma senza valori reali. Serve ai nuovi sviluppatori e ricorda quali variabili configurare sul server.

---

## 3. Database

### Migrazioni
- Le migrazioni devono essere versionabili e reversibili (up/down)
- Esegui le migrazioni **prima** di deployare il nuovo codice, non dopo
- Testa sempre le migrazioni su staging prima di produzione
- Mai modificare manualmente il DB di produzione senza una migrazione tracciata

### Backup
- Backup automatici configurati e testati
- Prima di ogni migrazione importante: backup manuale
- Testa il restore almeno una volta — un backup che non si ripristina non vale nulla

### Connessioni
- Usa connection pooling (pgBouncer, RDS Proxy, ecc.) in ambienti serverless
- Limita i permessi DB: l'utente dell'app non deve avere `DROP`, `CREATE` in produzione
- Connection string mai in chiaro nel codice

---

## 4. Sicurezza

### Headers HTTP
Ogni app web dovrebbe rispondere con questi headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000 (solo HTTPS)
Content-Security-Policy: (varia per progetto)
```

Verifica con [securityheaders.com](https://securityheaders.com).

### HTTPS
- HTTPS obbligatorio in produzione, sempre
- Redirect automatico da HTTP a HTTPS
- Certificato TLS valido (Let's Encrypt è gratis)

### OWASP Top 10
I rischi più comuni da considerare prima del deploy:

| Rischio | Mitigazione |
|---------|-------------|
| SQL Injection | Usa ORM o query parametrizzate, mai string concatenation |
| XSS | Sanitizza l'output, usa CSP |
| CSRF | Token CSRF su form, SameSite cookie |
| Autenticazione debole | Password hashing (bcrypt/argon2), rate limiting login |
| Esposizione dati sensibili | HTTPS, encryption at rest per dati critici |
| Dipendenze vulnerabili | `npm audit`, Dependabot |

### Autenticazione e sessioni
- Sessioni con scadenza ragionevole
- Cookie con `HttpOnly`, `Secure`, `SameSite=Strict`
- Rate limiting su endpoint di login
- Password hashing con bcrypt o argon2 (mai MD5/SHA1)

---

## 5. Performance

### Core Web Vitals (per siti web)
Google usa queste metriche per il ranking:

| Metrica | Target | Cosa misura |
|---------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint — velocità caricamento |
| INP | < 200ms | Interaction to Next Paint — reattività |
| CLS | < 0.1 | Cumulative Layout Shift — stabilità visiva |

Verifica con [PageSpeed Insights](https://pagespeed.web.dev) o Lighthouse.

### Ottimizzazioni base
- Immagini compresse e nel formato giusto (WebP/AVIF)
- Assets statici con cache a lungo termine (`Cache-Control: max-age=31536000, immutable`)
- CDN per assets statici
- Lazy loading per immagini e componenti non critici
- Bundle JS minificato

---

## 6. Monitoring e Observability

### Cosa monitorare sempre

**Errori applicativi**
Configura un sistema di error tracking prima del go-live: Sentry (gratuito per progetti piccoli), Datadog, o Rollbar. Senza questo, vieni a sapere dei bug dagli utenti.

**Uptime**
Un monitor esterno che ti avvisa se il sito va giù: UptimeRobot (gratis), Better Uptime, o Pingdom.

**Log**
- Struttura i log in JSON (più facile da analizzare)
- Log ogni request con status code, durata, user agent
- Non loggare dati sensibili (password, token, dati personali)
- Configura retention: i log costano, non tenerli per sempre

**Metriche**
In ordine di priorità:
1. Error rate (% di request che falliscono)
2. Latenza (p95, p99 — non solo media)
3. Throughput (request/secondo)
4. Utilizzo risorse (CPU, memoria, connessioni DB)

---

## 7. Test Environment

Un test environment ben strutturato è il fondamento della qualità del software. L'obiettivo non è avere il 100% di coverage — è avere fiducia che il codice funzioni prima che arrivi agli utenti.

### La Piramide dei Test

```
        /\
       /  \
      / E2E \         pochi, lenti, costosi
     /________\
    /          \
   / Integration \    discreti, medi
  /______________\
 /                \
/    Unit Tests    \  molti, veloci, economici
/__________________\
```

Più sali nella piramide, più i test sono lenti, fragili e costosi da mantenere. La maggior parte della copertura deve stare in basso.

---

### Tipi di Test

#### Unit Test
Testano una singola funzione o componente in isolamento. Tutto ciò che è esterno (DB, API, filesystem) viene sostituito da mock o stub.

**Cosa testare:**
- Funzioni pure (calcoli, trasformazioni, validazioni)
- Logica di business complessa
- Edge cases e casi limite
- Componenti UI (rendering, interazioni base)

**Caratteristiche:**
- Velocissimi (millisecondi)
- Deterministici — stesso input, stesso output sempre
- Non dipendono da rete, DB, o stato esterno
- Facili da debuggare quando falliscono

**Strumenti comuni:**

| Ecosistema | Strumenti |
|------------|-----------|
| JavaScript/TypeScript | Jest, Vitest |
| React (componenti) | React Testing Library + Jest/Vitest |
| Python | pytest, unittest |
| Go | `testing` (stdlib) |
| Rust | `#[test]` (stdlib) |

**Esempio (Jest + TypeScript):**
```typescript
// ✅ Testa logica pura — nessuna dipendenza esterna
describe('calcolaSconto', () => {
  it('applica percentuale corretta', () => {
    expect(calcolaSconto(100, 20)).toBe(80)
  })

  it('non scende sotto zero', () => {
    expect(calcolaSconto(10, 150)).toBe(0)
  })

  it('gestisce prezzo zero', () => {
    expect(calcolaSconto(0, 50)).toBe(0)
  })
})
```

---

#### Integration Test
Testano che più moduli funzionino correttamente insieme. A differenza degli unit test, usano dipendenze reali o quasi-reali: database di test, filesystem temporaneo, server HTTP locale.

**Cosa testare:**
- Endpoint API (request → risposta completa, incluso DB)
- Interazione tra servizi interni
- Query al database (logica SQL/ORM)
- Flussi che attraversano più layer (controller → service → repository)

**Caratteristiche:**
- Più lenti degli unit test (secondi)
- Richiedono un ambiente configurato (DB di test, variabili d'ambiente)
- Trovano bug che gli unit test non vedono (mismatch tra layer)
- Da eseguire su ogni PR, non necessariamente ad ogni salvataggio

**Setup database di test:**
```
# .env.test
DATABASE_URI=postgresql://localhost:5432/myapp_test
# Mai usare il DB di sviluppo o produzione per i test
```

Il DB di test deve essere:
- Isolato — non condiviso tra developer o CI runs paralleli
- Resettabile — ogni test suite parte da uno stato noto
- Veloce — usa SQLite in memoria dove possibile, altrimenti PostgreSQL locale

**Esempio (supertest + Express):**
```typescript
describe('POST /api/prodotti', () => {
  beforeEach(async () => {
    await db.migrate.latest()
    await db.seed.run()          // stato noto prima di ogni test
  })

  afterEach(async () => {
    await db.migrate.rollback()  // pulizia dopo ogni test
  })

  it('crea prodotto e ritorna 201', async () => {
    const res = await request(app)
      .post('/api/prodotti')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ nome: 'Profumo Test', prezzo: 49.90 })

    expect(res.status).toBe(201)
    expect(res.body.nome).toBe('Profumo Test')

    // Verifica che sia davvero nel DB
    const prodotto = await db('prodotti').where({ id: res.body.id }).first()
    expect(prodotto).toBeDefined()
  })
})
```

---

#### E2E Test (End-to-End)
Simulano un utente reale che interagisce con l'applicazione tramite browser. Testano il flusso completo: UI → API → DB → risposta → rendering.

**Cosa testare:**
- Golden path (i flussi critici che devono sempre funzionare)
- Flussi di autenticazione (login, logout, sessione scaduta)
- Checkout / form critici
- Navigazione principale
- Regressioni su bug importanti già risolti

**Non testare con E2E:**
- Ogni singola variazione di UI
- Edge cases gestibili con unit test
- Funzionalità non critiche

**Strumenti comuni:**

| Strumento | Punti di forza |
|-----------|----------------|
| Playwright | Multi-browser, veloce, API moderna, consigliato |
| Cypress | Developer experience ottima, buon ecosistema |
| Selenium | Legacy, molto diffuso ma lento |
| Puppeteer | Solo Chromium, buono per scraping/test semplici |

**Esempio (Playwright):**
```typescript
test('utente può cercare e aggiungere prodotto al carrello', async ({ page }) => {
  await page.goto('/catalogo')

  await page.fill('[data-testid="search-input"]', 'Chanel')
  await page.click('[data-testid="search-submit"]')

  await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible()

  await page.click('[data-testid="product-card"]:first-child [data-testid="add-to-cart"]')

  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1')
})
```

**Dove eseguire gli E2E:**
- In locale: contro `localhost` con seed DB
- In CI: contro l'ambiente di staging dopo il deploy
- Mai contro produzione (effetti collaterali, dati reali)

---

### Configurazione dell'Ambiente di Test

#### Variabili d'ambiente separate
```bash
# .env.test (mai committato, solo .env.test.example)
NODE_ENV=test
DATABASE_URI=postgresql://localhost:5432/myapp_test
API_BASE_URL=http://localhost:3000
DISABLE_RATE_LIMITING=true     # utile in test
DISABLE_EMAIL_SENDING=true     # sostituisci con mock
```

#### Isolamento tra test
Ogni test deve essere indipendente. Tre strategie:

**1. Transaction rollback** (più veloce per DB test):
```typescript
beforeEach(() => db.beginTransaction())
afterEach(() => db.rollbackTransaction())
// I dati scritti nel test non persistono
```

**2. Truncate e seed** (più realistico):
```typescript
beforeEach(async () => {
  await truncateAllTables()
  await seedTestData()
})
```

**3. Database separato per ogni worker** (parallelo):
```
# Jest config
testEnvironment: 'node'
maxWorkers: 4
# Ogni worker usa myapp_test_1, myapp_test_2, ecc.
```

#### Mock e stub: quando usarli

| Usa mock per | Non mockare |
|--------------|-------------|
| Servizi esterni (email, SMS, pagamenti) | Il tuo stesso DB |
| API di terze parti | La logica di business core |
| Clock/Date (test deterministici) | Le tue API interne |
| File system in unit test | Il comportamento del framework |

**Regola pratica**: se moccki il DB nei test di integrazione, stai testando la tua logica di mock, non il tuo codice. Usa un DB reale.

---

### Code Coverage

La coverage misura quante linee/branch del codice vengono eseguite durante i test. È uno strumento, non un obiettivo.

**Target ragionevoli:**

| Tipo progetto | Coverage minima |
|---------------|-----------------|
| Libreria/SDK | 90%+ |
| Backend API | 70-80% |
| Frontend app | 60-70% |
| Script/utility | 50%+ |

**Attenzione alle trappole:**
- Coverage al 100% non significa codice senza bug
- Un test che esegue il codice senza `expect()` aumenta la coverage senza testare nulla
- Concentrati sulla coverage dei path critici, non sulla percentuale totale

```bash
# Genera report di coverage
jest --coverage

# Con soglia minima (fallisce il CI se non raggiunta)
jest --coverage --coverageThreshold='{"global":{"lines":70}}'
```

---

### Test in CI/CD

Ogni push dovrebbe eseguire i test automaticamente. Configurazione tipica:

```yaml
# GitHub Actions — .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: myapp_test
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test -- --coverage
        env:
          DATABASE_URI: postgresql://postgres:test@localhost:5432/myapp_test

      - name: Upload coverage
        uses: codecov/codecov-action@v4   # opzionale, traccia coverage nel tempo
```

**Regole per i test in CI:**
- I test devono essere deterministici — nessun flaky test tollerato
- Fallire velocemente: lint prima, build dopo, test alla fine
- Cache delle dipendenze (`node_modules`, `.next`) per velocizzare
- I test E2E girano su staging, non su ogni PR (troppo lenti)

---

### Testing delle API

Per API REST, testa sempre:

```
[ ] Status code corretto per ogni scenario
[ ] Schema della risposta (struttura JSON)
[ ] Autenticazione: endpoint protetti ritornano 401 senza token
[ ] Autorizzazione: utente non autorizzato riceve 403
[ ] Validazione input: dati malformati ricevono 400 con messaggio chiaro
[ ] Paginazione funziona correttamente
[ ] Rate limiting si attiva (se presente)
```

---

### Test di Regressione

Ogni volta che risolvi un bug in produzione:

1. Scrivi un test che riproduce il bug **prima** di fixarlo
2. Verifica che il test fallisca (il bug esiste)
3. Fixa il bug
4. Verifica che il test passi
5. Committa test + fix insieme

Questo garantisce che lo stesso bug non torni mai.

---

### Checklist Test Environment

```
[ ] Unit test configurati e funzionanti in locale
[ ] DB di test separato da development e production
[ ] Variabili d'ambiente per test in .env.test.example
[ ] Ogni test è isolato (no dipendenze tra test)
[ ] Mock configurati per servizi esterni (email, pagamenti)
[ ] Coverage minima definita e verificata in CI
[ ] Test girano automaticamente su ogni PR
[ ] E2E test configurati su ambiente staging
[ ] Nessun flaky test nel pipeline
[ ] Test di regressione per bug critici già risolti
```

---

## 8. CI/CD Pipeline

Un buon pipeline automatizza tutto ciò che è verificabile:

```
Push/PR
  │
  ├─ Lint + TypeScript check
  ├─ Unit tests
  ├─ Integration tests
  ├─ Build
  │
  ▼ (su main/merge)
  │
  ├─ Deploy su staging
  ├─ E2E tests su staging
  │
  ▼ (manuale o automatico)
  │
  └─ Deploy su produzione
```

**Regola**: il deploy in produzione non dovrebbe mai richiedere azioni manuali sul server. Tutto deve passare per il pipeline.

### Feature flags
Per feature grosse, considera i feature flag: deployano il codice in produzione ma la funzionalità è nascosta. Permette di separare il deploy dal release.

---

## 8. Strategia di Deploy

### Zero-downtime deployment
Evita interruzioni agli utenti:

- **Rolling deployment**: sostituisce le istanze gradualmente
- **Blue-green**: due ambienti identici, switch del traffico in un colpo
- **Canary**: rilascia al 5% degli utenti prima, poi scala

Vercel, Railway, Fly.io gestiscono questo automaticamente. Su infrastruttura propria (Docker, Kubernetes) va configurato.

### Rollback
Prima di ogni deploy importante, assicurati di sapere come tornare indietro:
- Tieni traccia dell'ultima versione stabile
- Le migrazioni DB devono avere un `down()`
- Su Vercel/Netlify: il rollback è un click — sfruttalo

---

## 9. Checklist Pre-Deploy

```
[ ] Build locale completata senza errori
[ ] Tutti i test passano
[ ] Nessun segreto nel codice
[ ] Variabili d'ambiente configurate sull'host
[ ] Migrazioni DB pronte e testate su staging
[ ] Backup DB eseguito
[ ] Monitoring/error tracking attivi
[ ] Uptime monitor configurato
[ ] HTTPS attivo
[ ] Security headers configurati
[ ] Test funzionale su staging (golden path)
[ ] Piano di rollback definito
```

---

## 10. Checklist Post-Deploy

```
[ ] Verifica golden path manualmente in produzione
[ ] Error tracking non mostra nuovi errori
[ ] Tempi di risposta nella norma
[ ] Log non mostrano anomalie
[ ] Backup automatico configurato e verificato
[ ] Documenta la versione deployata (tag git)
```

---

## Priorità per Progetti Piccoli

Se stai deployando qualcosa di piccolo e non hai tempo per tutto:

**Non negoziabile**
HTTPS, variabili d'ambiente separate, backup DB, error tracking, build locale prima del push

**Importante ma posticipabile**
CI/CD completo, staging separato, feature flags, metriche avanzate

**Opzionale**
Blue-green deploy, canary release, SLO formali
