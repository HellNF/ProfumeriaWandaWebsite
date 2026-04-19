# Profumeria Wanda Discovery Interview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scrivere `docs/intervista-discovery-profumeria-wanda.md` come guida ibrida di discovery approfondita, capace di raccogliere materiale narrativo, commerciale e visivo sufficiente a costruire un sito distintivo per Profumeria Wanda.

**Architecture:** Il deliverable finale e un singolo documento Markdown organizzato in cinque blocchi: introduzione operativa, intervista principale, moduli extra, shot list/materiali, sintesi post-intervista. Ogni macro-sezione usa lo stesso pattern interno per restare leggibile durante l'intervista e per trasformare facilmente le risposte in copy, struttura del sito e direzione fotografica.

**Tech Stack:** Markdown, git, PowerShell, ripgrep

---

## Struttura File

```text
docs/
├── intervista-discovery-profumeria-wanda.md
│   └── Deliverable finale: guida di discovery approfondita per i proprietari
└── superpowers/
    ├── specs/
    │   └── 2026-04-17-profumeria-wanda-discovery-interview-design.md
    │       └── Spec approvata: fonte di verita per struttura e obiettivi
    └── plans/
        └── 2026-04-17-profumeria-wanda-discovery-interview.md
            └── Questo piano di esecuzione
```

---

## Task 1: Creare il guscio del documento e le istruzioni d'uso

**Files:**
- Read: `docs/superpowers/specs/2026-04-17-profumeria-wanda-discovery-interview-design.md`
- Create: `docs/intervista-discovery-profumeria-wanda.md`

- [ ] **Step 1: Rileggi la spec approvata prima di scrivere**

Run:
```powershell
Get-Content docs\superpowers\specs\2026-04-17-profumeria-wanda-discovery-interview-design.md
```

Expected: la spec conferma formato ibrido, struttura a blocchi, target 140-200 prompt e deliverable `docs/intervista-discovery-profumeria-wanda.md`.

- [ ] **Step 2: Crea il file con titolo, obiettivo, istruzioni e indice operativo**

Scrivi questo contenuto iniziale in `docs/intervista-discovery-profumeria-wanda.md`:

```md
# Intervista Discovery Approfondita — Profumeria Wanda

> Documento operativo per raccogliere tutto cio che serve a costruire un sito capace di raccontare la storia del negozio, la qualita della consulenza, i servizi, il valore umano e i dettagli visivi che rendono Profumeria Wanda memorabile.

---

## Come usare questo documento

Questo file non va usato come un questionario rigido. Serve a guidare una discovery editoriale profonda.

Obiettivo: uscire dall'incontro con materiale abbastanza ricco da poter scrivere testi, decidere sezioni del sito, pianificare foto e impostare un tono di voce credibile.

Usalo cosi:

- non fare tutte le domande in ordine se emerge una pista forte;
- non accontentarti di risposte astratte come "puntiamo sulla qualita" o "abbiamo un buon rapporto con i clienti";
- quando senti una frase detta bene, trascrivila quasi letteralmente;
- ogni volta che emerge una scena concreta, segnala se merita una foto;
- chiedi esempi veri, episodi, persone, momenti, stagioni, casi reali;
- separa cio che e solo informativo da cio che e narrativamente potente;
- se una risposta sembra generica, chiedi: "mi fai un esempio?", "quando succede?", "chi ve lo dice?", "come si vede?";
- se un dettaglio sembra piccolo ma molto vero, annotalo: spesso e quello che cambia la qualita del sito;
- alla fine di ogni blocco, verifica se ci sono materiali da recuperare: foto storiche, packaging, vecchie insegne, attestati, ritagli, messaggi dei clienti, immagini del negozio.

## Cosa devi portarti via da questa discovery

Alla fine dell'intervista dovresti avere:

- una storia del negozio raccontabile bene;
- almeno 5-10 motivi reali per cui una cliente dovrebbe fidarsi;
- una lista chiara dei servizi e del modo in cui vengono erogati;
- differenzianti veri rispetto a catene, ecommerce e altri negozi;
- esempi di linguaggio usato dai proprietari;
- scene, gesti, persone e dettagli da fotografare;
- materiali d'archivio o prove concrete di autorevolezza;
- indicazioni sufficienti per scrivere homepage, storia, servizi, contatti e sezione fiducia.

## Formato delle sezioni

Ogni blocco segue sempre questa struttura:

1. Perche questa sezione conta
2. Domande principali
3. Domande di approfondimento
4. Domande che sbloccano dettagli veri
5. Cosa puo diventare sul sito
6. Materiali da chiedere o fotografare

## Indice operativo

### Intervista principale

1. Origini e storia del negozio
2. Identita profonda del negozio
3. Persone dietro al banco
4. Clientela reale
5. Esperienza in negozio
6. Prodotti, reparti e criteri di selezione
7. Servizi e consulenza
8. Autorevolezza e prove concrete
9. Differenziazione
10. Linguaggio e tono di voce
11. Obiettivi del sito
12. Cose da evitare, limiti e paure

### Moduli extra

A. Memoria storica e materiali d'archivio
B. Metodo di consulenza e casi reali
C. Marchi, assortimento e criteri di scelta
D. Regalo, occasioni speciali e confezioni
E. Reputazione, passaparola e clienti storici
F. Backstage del negozio
G. Domande laterali e apparentemente inutili

### Chiusura operativa

- Shot list e materiali da recuperare
- Sintesi post-intervista
```

- [ ] **Step 3: Verifica che le sezioni base siano presenti**

Run:
```powershell
rg -n "^## |^### " docs/intervista-discovery-profumeria-wanda.md
```

Expected: compaiono almeno `## Come usare questo documento`, `## Cosa devi portarti via da questa discovery`, `## Formato delle sezioni`, `## Indice operativo`, `### Intervista principale`, `### Moduli extra`, `### Chiusura operativa`.

- [ ] **Step 4: Commit**

```bash
git add docs/intervista-discovery-profumeria-wanda.md
git commit -m "docs: create discovery interview scaffold for Profumeria Wanda"
```

---

## Task 2: Scrivere i primi sei blocchi dell'intervista principale

**Files:**
- Modify: `docs/intervista-discovery-profumeria-wanda.md`
- Read: `docs/superpowers/specs/2026-04-17-profumeria-wanda-discovery-interview-design.md`

- [ ] **Step 1: Aggiungi i blocchi 1-3**

Inserisci dopo l'indice questo contenuto:

```md
---

## 1. Origini e storia del negozio

### Perche questa sezione conta

Queste risposte servono a trasformare la storicita del negozio in una narrazione concreta. Non basta dire "dal 1960": serve capire cosa e cambiato, cosa e rimasto e perche il negozio esiste ancora oggi.

### Domande principali

1. Quando nasce Profumeria Wanda e chi l'ha fondata?
2. In che contesto e nata: quartiere, paese, strada, tipo di clientela, epoca?
3. Qual era l'idea iniziale del negozio nei primi anni?
4. Come si e evoluto il negozio nel tempo: reparti, spazi, marchi, tipo di clientela?
5. Ci sono stati passaggi generazionali o momenti in cui il negozio ha cambiato direzione?
6. Quali sono stati i periodi piu importanti o piu delicati della sua storia?

### Domande di approfondimento

- Qual e stato il primo grande cambiamento che ricordate bene?
- C'e un momento in cui avete capito che il negozio aveva costruito una reputazione forte?
- Cosa e rimasto uguale rispetto all'inizio?
- Cosa avete dovuto cambiare per restare rilevanti?
- Ci sono stati anni difficili che vi hanno obbligato a ripensare il modo di lavorare?
- Se doveste raccontare la storia del negozio in tre capitoli, quali sarebbero?

### Domande che sbloccano dettagli veri

- Qual e il ricordo piu vivido che vi viene in mente pensando ai primi anni?
- C'e un oggetto, un mobile, un reparto o un'abitudine che per voi rappresenta ancora il negozio?
- Qual era il profumo del negozio tanti anni fa, se provate a ricordarlo?
- C'e una frase che una cliente storica potrebbe dire per descrivere Profumeria Wanda?
- Se il negozio fosse una persona, che carattere avrebbe dopo tutti questi anni?

### Cosa puo diventare sul sito

- sezione "La nostra storia";
- timeline breve ma forte;
- microcopy sulla continuita nel tempo;
- hero copy basato su eredita e presenza reale;
- box sulla data di fondazione raccontata con senso, non come semplice numero.

### Materiali da chiedere o fotografare

- foto del negozio nel passato;
- vecchie insegne, biglietti, sacchetti, confezioni;
- immagini dei fondatori o della famiglia;
- eventuali ritagli di giornale, premi o documenti storici;
- dettagli del negozio rimasti invariati nel tempo.

## 2. Identita profonda del negozio

### Perche questa sezione conta

Serve a capire che tipo di realta e Profumeria Wanda al di la dei prodotti venduti. Questa parte definisce il cuore del brand e aiuta a evitare un sito generico da semplice vetrina.

### Domande principali

1. Che tipo di negozio volete essere nella testa delle persone?
2. Quali valori difendete ogni giorno nel vostro modo di lavorare?
3. Che cosa significa per voi lavorare bene in profumeria oggi?
4. Quale impressione volete che una persona provi entrando da voi?
5. Cosa non vorreste mai che una cliente pensasse uscendo dal negozio?
6. In una frase, cosa rende davvero vostro questo negozio?

### Domande di approfondimento

- Quando parlate di professionalita, cosa intendete esattamente?
- Quanto conta per voi l'aspetto umano rispetto a quello commerciale?
- Cosa rifiutate nel modo di vendere di certi concorrenti?
- Quanto volete essere percepiti come eleganti, caldi, competenti, esclusivi o accessibili?
- Cosa fate con naturalezza che altri negozi non fanno o fanno peggio?

### Domande che sbloccano dettagli veri

- Se una cliente entrasse bendata e potesse capire dove si trova solo da come viene accolta, cosa noterebbe?
- Qual e una piccola cosa che fate sempre ma che forse non considerate speciale?
- In quale momento vi sentite piu "Profumeria Wanda"?
- Cosa non togliereste mai dal vostro modo di lavorare neanche se il mercato cambiasse ancora?

### Cosa puo diventare sul sito

- manifesto breve del negozio;
- sezione "Perche sceglierci";
- tono della homepage;
- promessa editoriale e posizionamento;
- blocchi di fiducia e di differenziazione.

### Materiali da chiedere o fotografare

- dettagli che esprimono identita: vetrina, banco, gesti, confezioni, insegna;
- immagini che mostrano il clima del negozio e non solo i prodotti;
- eventuali citazioni dei proprietari da usare come headline.

## 3. Persone dietro al banco

### Perche questa sezione conta

Nel retail di fiducia il volto umano vale quanto il prodotto. Questa sezione serve a capire chi consiglia, chi accoglie, chi conosce i clienti e come raccontare competenza e relazione.

### Domande principali

1. Chi lavora oggi in negozio e quali ruoli ha?
2. Da quanto tempo lavorate in questo settore e da quanto tempo in questo negozio?
3. Quali competenze specifiche portate ciascuno?
4. Come descrivereste il vostro modo di accogliere e consigliare?
5. Ci sono differenze di stile tra le persone che lavorano in negozio?
6. In quali situazioni una cliente capisce che sta parlando con qualcuno di competente?

### Domande di approfondimento

- Come vi formate o vi aggiornate?
- Ci sono reparti o categorie in cui vi sentite particolarmente forti?
- Come capite in poco tempo che tipo di cliente avete davanti?
- Come cambia il vostro approccio quando una cliente e indecisa, frettolosa o in difficolta?
- Ci sono frasi che dite spesso per mettere a proprio agio chi entra?

### Domande che sbloccano dettagli veri

- Chi e la persona che riconosce al volo il gusto di una cliente e come ci riesce?
- C'e un gesto tipico che fate sempre quando consigliate?
- Qual e una situazione in cui vi siete sentiti davvero utili, non solo venditori?
- Se doveste farvi fotografare al lavoro in un modo autentico, cosa stareste facendo?

### Cosa puo diventare sul sito

- sezione "Chi vi accoglie";
- copy sulla consulenza;
- didascalie per foto di team e mani al lavoro;
- microtesti che trasmettono fiducia umana e competenza concreta.

### Materiali da chiedere o fotografare

- ritratti ambientati;
- mani che mostrano, consigliano, confezionano;
- scene reali di conversazione al banco;
- dettagli di formazione, campionari, strumenti di lavoro.
```

- [ ] **Step 2: Aggiungi i blocchi 4-6**

Continua con questo contenuto:

```md
## 4. Clientela reale

### Perche questa sezione conta

Serve a evitare descrizioni astratte del target e a capire chi entra davvero in negozio, con quali bisogni, dubbi, occasioni d'acquisto e motivazioni di fiducia.

### Domande principali

1. Chi sono oggi i vostri clienti piu tipici?
2. Qual e la fascia d'eta che vi frequenta di piu?
3. Avete soprattutto clienti storici, nuovi clienti o un mix?
4. Per quali motivi le persone vengono da voi invece di comprare online?
5. Quali richieste sentite piu spesso durante l'anno?
6. Ci sono periodi in cui cambia il tipo di clientela o il motivo d'acquisto?

### Domande di approfondimento

- Chi e la vostra cliente ideale, se doveste descriverla bene?
- Quali paure o incertezze hanno spesso le persone prima di comprare?
- Le persone cercano piu consiglio, conferma, novita o regalo?
- Ci sono differenze tra clienti abituali e clienti di passaggio?
- Quali bisogni ricorrenti vedete che spesso i clienti non sanno esprimere bene?

### Domande che sbloccano dettagli veri

- Qual e il tipo di cliente che riconoscete subito appena entra?
- C'e una richiesta ricorrente che racconta bene il vostro lavoro?
- Quale frase sentite dire piu spesso quando una cliente esce soddisfatta?
- C'e una cliente storica che racconta bene il legame che avete costruito nel tempo?

### Cosa puo diventare sul sito

- sezioni orientate ai bisogni reali;
- FAQ basate sulle obiezioni piu frequenti;
- copy su fiducia, vicinanza e supporto;
- blocchi dedicati a regalo, scelta guidata e consulenza.

### Materiali da chiedere o fotografare

- eventuali messaggi o recensioni spontanee;
- scene autentiche di interazione con clienti abituali;
- dettagli che mostrano ascolto, accoglienza e relazione.

## 5. Esperienza in negozio

### Perche questa sezione conta

Un sito forte deve far intuire cosa succede davvero entrando in negozio. Questa sezione serve a tradurre l'esperienza fisica in contenuto visivo e testuale.

### Domande principali

1. Cosa succede di solito nei primi trenta secondi da quando una persona entra?
2. Che atmosfera volete creare nel punto vendita?
3. Ci sono rituali o attenzioni che fanno parte del vostro modo di lavorare?
4. Quanto tempo rimangono mediamente le persone in negozio?
5. Quali momenti dell'anno cambiano di piu il ritmo del negozio?
6. Come descrivereste il percorso di una cliente dall'ingresso all'acquisto?

### Domande di approfondimento

- Cosa notano di solito le persone appena entrano?
- Dove si fermano per prime?
- Come si capisce che un'esperienza e andata bene?
- Cosa fate per non far sentire la cliente pressata?
- Ci sono momenti in cui il negozio si trasforma visivamente o emotivamente?

### Domande che sbloccano dettagli veri

- Qual e la scena piu tipica che si vede in un giorno normale?
- C'e un punto preciso del negozio che racconta bene il vostro stile?
- Quale momento meriterebbe una foto perche spiega piu di mille parole cosa fate?
- Se doveste registrare un breve video autentico dentro il negozio, cosa mostrereste?

### Cosa puo diventare sul sito

- testo per sezione "Vieni a trovarci";
- storytelling immersivo per homepage o pagina negozio;
- art direction per foto ambientate;
- microcopy sulla consulenza non aggressiva.

### Materiali da chiedere o fotografare

- ingresso, banco, vetrina, reparto piu identitario;
- interazioni vere;
- dettagli di luce, texture, packaging, espositori;
- scene stagionali ricorrenti.

## 6. Prodotti, reparti e criteri di selezione

### Perche questa sezione conta

Questa sezione aiuta a raccontare l'offerta in modo piu intelligente di una lista di categorie. Serve a capire cosa caratterizza davvero l'assortimento e come viene selezionato.

### Domande principali

1. Quali reparti sono oggi centrali per il negozio?
2. Come descrivereste il rapporto tra profumeria, cosmetica, trucco e pelletteria?
3. Come scegliete i marchi o i prodotti da tenere?
4. Cosa vi fa dire di si o di no a una linea?
5. Ci sono categorie o prodotti che vi rappresentano meglio di altri?
6. Quali sono i prodotti o reparti che un nuovo visitatore dovrebbe conoscere subito?

### Domande di approfondimento

- Cosa cercano di piu i clienti e cosa invece consigliate voi con piu convinzione?
- Avete best seller storici?
- Ci sono prodotti sottovalutati che raccontano bene il vostro gusto o la vostra competenza?
- Come gestite l'equilibrio tra prodotti conosciuti e scoperte?
- In cosa siete selettivi?

### Domande che sbloccano dettagli veri

- Se doveste scegliere tre prodotti-simbolo del negozio, quali sarebbero e perche?
- C'e una marca che racconta bene la vostra idea di qualita?
- C'e un reparto che chi entra non si aspetta e invece sorprende molto?
- Quale categoria spiega meglio la vostra cura nella scelta?

### Cosa puo diventare sul sito

- struttura della pagina catalogo;
- sezioni "selezione curata";
- copy sui criteri di scelta;
- focus narrativi per reparti o categorie chiave.

### Materiali da chiedere o fotografare

- prodotti iconici;
- reparti piu rappresentativi;
- dettagli di esposizione;
- texture di packaging, pelle, profumi, make-up;
- eventuali marchi o linee da valorizzare con foto dedicate.
```

- [ ] **Step 3: Verifica che i primi sei blocchi siano stati aggiunti**

Run:
```powershell
rg -n "^## (1|2|3|4|5|6)\." docs/intervista-discovery-profumeria-wanda.md
```

Expected: compaiono sei heading numerati consecutivi da `## 1.` a `## 6.`.

- [ ] **Step 4: Commit**

```bash
git add docs/intervista-discovery-profumeria-wanda.md
git commit -m "docs: add first half of discovery interview"
```

---

## Task 3: Scrivere i blocchi 7-12 dell'intervista principale

**Files:**
- Modify: `docs/intervista-discovery-profumeria-wanda.md`

- [ ] **Step 1: Aggiungi i blocchi 7-9**

Inserisci questo contenuto dopo il blocco 6:

```md
## 7. Servizi e consulenza

### Perche questa sezione conta

Qui emerge il valore che il negozio offre oltre il prodotto. E una sezione essenziale per raccontare professionalita, supporto e motivi reali per entrare in contatto.

### Domande principali

1. Quali servizi offrite concretamente oltre alla vendita del prodotto?
2. In quali momenti il vostro consiglio fa davvero la differenza?
3. Come aiutate una persona che deve fare un regalo?
4. Offrite confezioni, suggerimenti personalizzati, abbinamenti o supporto su richiesta?
5. Ci sono giornate, eventi o attivita speciali legate a marchi o ricorrenze?
6. Come cambia il vostro servizio tra cliente abituale e cliente nuova?

### Domande di approfondimento

- Qual e il servizio piu sottovalutato che offrite?
- In che modo aiutate una cliente indecisa?
- Come consigliate senza forzare l'acquisto?
- Ci sono servizi che non vengono percepiti subito ma che fidelizzano molto?
- Quali domande fate per capire meglio chi avete davanti?

### Domande che sbloccano dettagli veri

- Mi raccontate un caso in cui il consiglio ha evitato un acquisto sbagliato?
- C'e un momento tipico in cui una cliente si rilassa e capisce di essere nel posto giusto?
- Quale gesto o attenzione fa dire spesso "grazie, mi avete aiutata davvero"?
- Se doveste far vedere il vostro servizio in una foto, cosa dovremmo immortalare?

### Cosa puo diventare sul sito

- pagina o sezione servizi;
- call to action su consulenza e supporto;
- contenuti dedicati al regalo;
- blocchi su esperienza assistita e scelta guidata.

### Materiali da chiedere o fotografare

- confezioni regalo;
- momenti di consulenza;
- prodotti abbinati per dimostrare cura e suggerimento;
- immagini di giornate speciali o attivita in negozio.

## 8. Autorevolezza e prove concrete

### Perche questa sezione conta

Il sito deve trasmettere fiducia con prove, non con aggettivi. Questa parte raccoglie gli elementi che dimostrano esperienza, continuita, competenza e reputazione.

### Domande principali

1. Quali elementi dimostrano in modo concreto la vostra esperienza?
2. Ci sono certificazioni, corsi, affiliazioni o collaborazioni da valorizzare?
3. Da quanti anni avete clienti che tornano regolarmente?
4. Quali segnali vi fanno capire che il negozio e considerato affidabile?
5. Ci sono marchi, partner o relazioni professionali che rafforzano la vostra credibilita?
6. In cosa vi sentite particolarmente autorevoli?

### Domande di approfondimento

- Avete ricevuto attestati, riconoscimenti o ringraziamenti significativi?
- Ci sono episodi in cui la fiducia di un cliente vi ha colpito?
- Che tipo di passaparola vi porta nuovi ingressi?
- Quali risultati vedete quando un cliente si affida davvero al vostro consiglio?
- C'e un reparto o un tipo di richiesta in cui siete un punto di riferimento?

### Domande che sbloccano dettagli veri

- Qual e la prova piu semplice ma piu forte che dice "questo negozio e serio"?
- C'e una frase detta da un cliente che vi e rimasta impressa perche spiegava bene la vostra affidabilita?
- Qual e un dettaglio del vostro lavoro che passa inosservato ma richiede vera competenza?
- Se doveste mostrare in tre immagini la vostra autorevolezza, cosa fotografereste?

### Cosa puo diventare sul sito

- sezione fiducia;
- proof points in homepage;
- box su esperienza e continuita;
- elementi di rassicurazione vicino a contatti, servizi o call to action.

### Materiali da chiedere o fotografare

- attestati e certificati;
- foto storiche che mostrano continuita;
- immagini di collaborazione con brand;
- materiali che confermano formazione o riconoscimenti;
- eventuali recensioni, messaggi, dediche.

## 9. Differenziazione

### Perche questa sezione conta

Serve a chiarire perche una persona dovrebbe scegliere Profumeria Wanda e non una catena, una piattaforma online o un altro negozio locale. Questa e una sezione strategica per tutta la comunicazione del sito.

### Domande principali

1. Perche una cliente dovrebbe venire da voi invece di comprare online?
2. In cosa siete diversi rispetto a catene o profumerie impersonali?
3. Cosa fate meglio di altri negozi della zona?
4. Cosa non fate volutamente, anche se potrebbe sembrare conveniente?
5. Qual e l'errore piu comune che vedete in certi modi di vendere?
6. Se poteste lasciare un solo messaggio nella testa di chi visita il sito, quale sarebbe?

### Domande di approfondimento

- Dove mettete piu cura rispetto agli altri?
- In cosa siete piu esigenti?
- Quali aspettative sbagliate hanno a volte i clienti prima di entrare?
- Cosa scoprono di voi che non si aspettavano?
- Qual e una promessa che potete fare davvero senza sembrare marketing?

### Domande che sbloccano dettagli veri

- C'e una situazione tipica in cui una cliente capisce la differenza tra voi e un'alternativa piu impersonale?
- Qual e un aspetto del vostro lavoro che online non potra mai sostituire?
- Se una cliente dovesse consigliarvi a un'amica, quale motivo concreto direbbe?
- Qual e una cosa che per voi fa la differenza ma che spesso il mercato tratta come secondaria?

### Cosa puo diventare sul sito

- sezione "Perche noi";
- headline distintiva;
- argomentazione contro l'effetto vetrina generica;
- supporto strategico a homepage, servizi e pagina negozio.

### Materiali da chiedere o fotografare

- scene che mostrano ascolto e relazione;
- dettagli di cura che distinguono il negozio;
- immagini che fanno percepire selezione, ordine, presenza umana.
```

- [ ] **Step 2: Aggiungi i blocchi 10-12**

Continua con questo contenuto:

```md
## 10. Linguaggio e tono di voce

### Perche questa sezione conta

Il sito deve parlare come il negozio, non come un template di settore. Qui si raccolgono lessico, livello di eleganza, calore e formule autentiche da riutilizzare.

### Domande principali

1. Come parlate di solito con una cliente quando volete metterla a suo agio?
2. Che tono sentite piu vostro: elegante, caldo, diretto, rassicurante, tecnico, confidenziale?
3. Ci sono parole che usate spesso quando consigliate?
4. Ci sono parole che non vi rappresentano o che non vorreste vedere sul sito?
5. Quanto volete sembrare sofisticati e quanto accessibili?
6. Se doveste descrivere il negozio con tre aggettivi onesti, quali scegliereste?

### Domande di approfondimento

- Preferite un linguaggio piu semplice o piu ricercato?
- Quanto conta sembrare esperti senza risultare distanti?
- Ci sono espressioni tipiche che i clienti associano a voi?
- Quando parlate di qualita, su cosa vi basate davvero?
- Che differenza c'e tra come parlate in negozio e come dovrebbe parlare il sito?

### Domande che sbloccano dettagli veri

- Qual e una frase che dite spesso e che vi rappresenta bene?
- C'e un modo di dire locale o personale che racconta il vostro stile?
- Quale frase non scrivereste mai perche suonerebbe falsa?
- Se il sito dovesse avere la vostra voce in una sola riga, come suonerebbe?

### Cosa puo diventare sul sito

- tono editoriale generale;
- headline e sottotitoli;
- microcopy su pulsanti, servizi, contatti;
- criteri per evitare un linguaggio troppo freddo o troppo patinato.

### Materiali da chiedere o fotografare

- note o frasi appuntate durante l'intervista;
- citazioni reali da usare come spunti di copy.

## 11. Obiettivi del sito

### Perche questa sezione conta

Questa parte allinea il sito a risultati concreti. Serve a capire cosa deve ottenere online il negozio nei primi mesi e quali priorita comunicative vanno messe davanti.

### Domande principali

1. Cosa deve ottenere il sito nei primi tre-sei mesi?
2. Vi interessa di piu farvi trovare, trasmettere fiducia, aumentare visite in negozio o facilitare contatti?
3. Quali azioni vi piacerebbe che una persona facesse dopo aver visitato il sito?
4. Quali contenuti non possono assolutamente mancare?
5. C'e una pagina o una sezione che secondo voi dovra essere particolarmente forte?
6. Come capirete se il sito sta funzionando?

### Domande di approfondimento

- Vi aspettate piu contatti WhatsApp, piu passaggi in negozio o piu percezione di qualita?
- Ci sono servizi o reparti che volete spingere di piu?
- Cosa vorreste che una persona capisse in meno di un minuto entrando nel sito?
- Quali dubbi dovrebbe sciogliere subito il sito?
- Il sito dovra servire piu ai clienti nuovi o anche ai clienti storici?

### Domande che sbloccano dettagli veri

- Se una cliente aprisse il sito dal telefono parcheggiata fuori dal negozio, cosa dovrebbe trovare immediatamente?
- Qual e il contenuto che, se fatto bene, vi farebbe dire "ecco, questo ci rappresenta"?
- C'e una cosa che oggi spiegate troppe volte a voce e che il sito dovrebbe alleggerire?
- Se il sito fosse utile solo per una situazione concreta, quale sarebbe?

### Cosa puo diventare sul sito

- priorita di navigazione;
- gerarchia della homepage;
- CTA principali;
- struttura di pagine, moduli contatto e informazioni pratiche.

### Materiali da chiedere o fotografare

- eventuali riferimenti a contatti, orari, eventi, servizi e materiali che devono essere sempre aggiornabili.

## 12. Cose da evitare, limiti e paure

### Perche questa sezione conta

Sapere cosa non dire e quasi importante quanto sapere cosa dire. Questa sezione evita che il sito finisca fuori tono o faccia promesse non sostenibili.

### Domande principali

1. Cosa non volete assolutamente comunicare sul sito?
2. Quale immagine del negozio vi farebbe dire "questo non siamo noi"?
3. Ci sono promesse che non volete fare perche non vi rappresentano?
4. Cosa vi imbarazzerebbe vedere scritto online sul vostro conto?
5. Cosa temete di piu in un sito fatto male per un negozio come il vostro?
6. C'e qualcosa che preferite tenere sullo sfondo invece di mettere in primo piano?

### Domande di approfondimento

- Avete paura di sembrare troppo lussuosi, troppo popolari, troppo generici o troppo freddi?
- C'e un linguaggio che trovate finto o artificioso?
- Cosa sarebbe troppo costruito rispetto alla vostra realta?
- Ci sono limiti pratici o operativi che il sito deve rispettare?
- Quali contenuti rischierebbero di creare aspettative sbagliate?

### Domande che sbloccano dettagli veri

- Quale frase o immagine vi farebbe chiudere subito una bozza perche "non ci somiglia per niente"?
- C'e un tipo di estetica che vi allontana?
- Quale errore vedete spesso nei siti di negozi locali?
- Cosa deve restare semplice e non diventare troppo "pubblicitario"?

### Cosa puo diventare sul sito

- criteri editoriali di esclusione;
- guardrail per copy e visual;
- limiti chiari per scelte di design, tono e contenuto.

### Materiali da chiedere o fotografare

- esempi di immagini o stili che i proprietari sentono lontani;
- annotazioni su parole da non usare;
- vincoli pratici da ricordare durante design e copy.
```

- [ ] **Step 3: Verifica il completamento dell'intervista principale**

Run:
```powershell
rg -n "^## (7|8|9|10|11|12)\." docs/intervista-discovery-profumeria-wanda.md
```

Expected: compaiono sei heading numerati consecutivi da `## 7.` a `## 12.`.

- [ ] **Step 4: Commit**

```bash
git add docs/intervista-discovery-profumeria-wanda.md
git commit -m "docs: complete core discovery interview sections"
```

---

## Task 4: Aggiungere moduli extra, shot list e sintesi finale

**Files:**
- Modify: `docs/intervista-discovery-profumeria-wanda.md`

- [ ] **Step 1: Aggiungi i moduli extra A-C**

Inserisci questo contenuto dopo il blocco 12:

```md
---

## Modulo Extra A. Memoria storica e materiali d'archivio

### Perche questa sezione conta

Serve a trovare tutto cio che puo dare profondita, autenticita e spessore visivo al sito: non solo informazioni, ma tracce del tempo.

### Domande principali

1. Quali materiali storici esistono ancora e dove si trovano?
2. Avete album, scatole, cassetti o archivi con foto del negozio?
3. Ci sono oggetti o documenti che raccontano bene l'evoluzione del punto vendita?
4. Esistono vecchie confezioni, biglietti, insegne o grafiche che meritano di essere documentate?

### Domande di approfondimento

- Chi in famiglia conserva meglio la memoria del negozio?
- Ci sono date che vanno controllate bene prima di pubblicarle?
- Avete immagini legate a eventi, anniversari o cambi di sede?
- Esiste qualche oggetto che tutti associano al negozio?

### Domande che sbloccano dettagli veri

- Qual e il cassetto che dovremmo assolutamente aprire?
- C'e una foto che vi emoziona ogni volta che la riguardate?
- Quale oggetto racconta il passaggio del tempo piu di una frase?

### Cosa puo diventare sul sito

- gallery storica;
- timeline visiva;
- dettagli di autenticita nel racconto del brand.

### Materiali da chiedere o fotografare

- fotografie d'epoca;
- carte intestate, sacchetti, confezioni;
- targhe, attestati, ritagli stampa;
- dettagli di arredi storici.

## Modulo Extra B. Metodo di consulenza e casi reali

### Perche questa sezione conta

Qui si raccolgono esempi utili a far percepire il negozio come un luogo di guida, non solo di esposizione o vendita.

### Domande principali

1. Come impostate una consulenza quando una cliente non sa bene cosa cerca?
2. Quali domande fate per arrivare a una proposta sensata?
3. Come gestite gusti, budget, occasione d'uso e preferenze personali?
4. Ci sono casi ricorrenti in cui il vostro intervento cambia davvero l'esito dell'acquisto?

### Domande di approfondimento

- Qual e l'errore piu comune che aiutate a evitare?
- Come cambia il vostro consiglio per regalo, uso personale, occasione speciale o riacquisto?
- In quali casi preferite sconsigliare un prodotto?
- Come capite quando avete trovato la proposta giusta?

### Domande che sbloccano dettagli veri

- Mi raccontate un caso preciso dall'inizio alla fine?
- Quale tipo di cliente esce piu spesso sollevata grazie al vostro aiuto?
- C'e una frase detta da una cliente che vi fa capire che la consulenza ha funzionato?

### Cosa puo diventare sul sito

- sezioni su consulenza personalizzata;
- storytelling di casi tipici;
- copy su ascolto, metodo e accompagnamento.

### Materiali da chiedere o fotografare

- scene di dialogo e prova;
- mani che mostrano alternative;
- momenti di scelta e confezionamento.

## Modulo Extra C. Marchi, assortimento e criteri di scelta

### Perche questa sezione conta

Serve ad approfondire il lato curatoriale del negozio: non solo cosa c'e, ma perche c'e.

### Domande principali

1. Come capite se un marchio e adatto al negozio?
2. Cosa cercate in una linea prima di introdurla?
3. Come bilanciate marchi noti, richieste del pubblico e gusto personale?
4. C'e un brand che racconta molto bene il vostro modo di selezionare?

### Domande di approfondimento

- Quanto conta la fiducia nel marchio rispetto alla performance del prodotto?
- Cosa vi fa rinunciare a una linea?
- Avete categorie che curate con particolare attenzione?
- Ci sono marchi che hanno accompagnato il negozio per molti anni?

### Domande che sbloccano dettagli veri

- Quale marchio portereste come esempio davanti a una cliente che vuole capire come scegliete?
- C'e una linea che vi ha convinti lentamente e oggi ritenete fondamentale?
- Quale scaffale racconta meglio il vostro gusto?

### Cosa puo diventare sul sito

- copy sulla selezione;
- focus su linee o categorie guida;
- tono curatoriale del catalogo.

### Materiali da chiedere o fotografare

- scaffali ben rappresentativi;
- packaging iconici;
- combinazioni di prodotto che mostrano il gusto del negozio.
```

- [ ] **Step 2: Aggiungi i moduli extra D-G, la shot list e la sintesi post-intervista**

Continua con questo contenuto:

```md
## Modulo Extra D. Regalo, occasioni speciali e confezioni

### Perche questa sezione conta

Molti acquisti nascono da ricorrenze, urgenze o desiderio di fare bella figura. Questo modulo aiuta a costruire copy e immagini ad alta conversione emotiva.

### Domande principali

1. In quali occasioni le persone si rivolgono piu spesso a voi per un regalo?
2. Come aiutate chi deve scegliere per qualcun altro?
3. Quanto conta la confezione nel vostro servizio?
4. Ci sono periodi dell'anno in cui il tema regalo diventa centrale?

### Domande di approfondimento

- Quali domande fate per orientare una scelta regalo?
- Ci sono abbinamenti o fasce di spesa tipiche?
- Quanto pesa l'impatto visivo del regalo finale?
- Cosa apprezzano di piu le persone quando ricevono un vostro pacchetto?

### Domande che sbloccano dettagli veri

- Qual e il regalo piu memorabile che ricordate?
- C'e una confezione che vi rappresenta particolarmente bene?
- Quale scena di preparazione regalo meriterebbe una foto?

### Cosa puo diventare sul sito

- sezione regalo;
- CTA per occasioni speciali;
- contenuti stagionali;
- visual dedicati a confezioni e attenzione al dettaglio.

### Materiali da chiedere o fotografare

- pacchetti regalo;
- nastri, carte, dettagli di confezionamento;
- scene di preparazione.

## Modulo Extra E. Reputazione, passaparola e clienti storici

### Perche questa sezione conta

Il passaparola e una forma di autorevolezza potentissima. Questo modulo aiuta a raccogliere segnali di fiducia accumulati nel tempo.

### Domande principali

1. Come arrivano di solito i nuovi clienti?
2. Quanto pesa il passaparola nella crescita del negozio?
3. Ci sono clienti storici che frequentano il negozio da decenni?
4. Quali sono i motivi per cui le persone vi raccomandano?

### Domande di approfondimento

- Vi dicono mai "mi hanno parlato bene di voi"?
- C'e una qualita che i clienti riconoscono in modo ricorrente?
- Quali relazioni si sono costruite nel tempo?
- C'e un tipo di fiducia che vi siete conquistati lentamente?

### Domande che sbloccano dettagli veri

- Qual e la testimonianza informale piu bella che ricordate?
- C'e una storia di fedelta che racconta bene il negozio?
- Quale frase sentite dire quando qualcuno vi presenta a un'amica?

### Cosa puo diventare sul sito

- social proof credibile;
- prova narrativa della reputazione;
- tono rassicurante e locale.

### Materiali da chiedere o fotografare

- messaggi, biglietti, recensioni, dediche;
- eventuali ricorrenze con clienti storici;
- scene che mostrano relazione e continuita.

## Modulo Extra F. Backstage del negozio

### Perche questa sezione conta

Molti dettagli che fanno percepire professionalita stanno dietro le quinte. Questo modulo aiuta a trovare immagini e contenuti meno ovvi ma molto forti.

### Domande principali

1. Cosa succede prima dell'apertura o dopo la chiusura?
2. Come curate ordine, esposizione e riassortimento?
3. Ci sono gesti di preparazione che il cliente non vede ma che contano molto?
4. Quali aspetti del lavoro richiedono piu attenzione di quanto sembri?

### Domande di approfondimento

- Chi si occupa di allestimenti, riordino, confezioni o vetrina?
- Quanto lavoro c'e dietro una presentazione pulita e coerente?
- Ci sono momenti di backstage che raccontano bene la vostra serieta?
- Qual e il lavoro invisibile che rende possibile una buona esperienza cliente?

### Domande che sbloccano dettagli veri

- Quale gesto di backstage meriterebbe un close-up?
- C'e un rituale di apertura o chiusura che vi rappresenta?
- Se dovessimo fotografare solo il lavoro invisibile, cosa mostreremmo?

### Cosa puo diventare sul sito

- immagini di cura e metodo;
- contenuti sul dietro le quinte;
- percezione di serieta e attenzione.

### Materiali da chiedere o fotografare

- allestimento vetrina;
- riordino scaffali;
- preparazione banco;
- mani al lavoro su dettagli invisibili al cliente.

## Modulo Extra G. Domande laterali e apparentemente inutili

### Perche questa sezione conta

Queste domande servono a rompere la patina da intervista e a far emergere dettagli che spesso diventano i passaggi piu vivi del sito.

### Domande principali

1. Qual e il vostro angolo preferito del negozio?
2. C'e un oggetto che non togliereste mai?
3. Quale periodo dell'anno ha un'energia speciale per voi?
4. C'e un profumo, un materiale o una scena che vi fa pensare subito al negozio?

### Domande di approfondimento

- Quale cliente ricordate con piu affetto?
- C'e una giornata tipica che vi rappresenta meglio di un grande evento?
- Quale dettaglio del negozio notate sempre voi ma quasi nessun altro?
- Quale parte del vostro lavoro e faticosa ma bellissima?

### Domande che sbloccano dettagli veri

- Quale immagine mentale vi viene se dico "Profumeria Wanda in una scena"?
- Se il negozio avesse una colonna sonora silenziosa, che atmosfera avrebbe?
- C'e una piccola imperfezione o abitudine che per voi fa parte dell'anima del posto?
- Quale gesto, visto da vicino, dice subito che qui c'e mestiere?

### Cosa puo diventare sul sito

- dettagli di copy che alzano il livello;
- caption fotografiche;
- scelte visive meno banali;
- microelementi di identita.

### Materiali da chiedere o fotografare

- dettagli minori ma forti;
- texture, angoli, oggetti, mani, piccoli riti;
- immagini non ovvie che evitano un sito troppo standard.

---

## Shot List e materiali da recuperare

Usa questa checklist finale appena chiudi la discovery.

### Persone da fotografare

- proprietari in un ritratto ambientato;
- persone al banco durante una consulenza;
- mani mentre mostrano, consigliano, confezionano;
- eventuali collaboratori nei reparti piu rappresentativi.

### Scene da fotografare

- ingresso e vetrina;
- accoglienza cliente;
- momento di consiglio;
- scelta regalo;
- confezionamento;
- dettagli di esposizione;
- backstage di apertura, riordino o allestimento.

### Dettagli da fotografare

- packaging;
- texture di pelle, flaconi, make-up, carte, nastri;
- dettagli di scaffali e insegna;
- elementi storici rimasti nel negozio;
- oggetti simbolici.

### Materiali da recuperare

- foto storiche;
- vecchie insegne;
- biglietti, sacchetti, carte regalo;
- attestati, articoli, riconoscimenti;
- recensioni o messaggi spontanei;
- loghi e materiali dei brand citabili.

---

## Sintesi post-intervista

Compila questa sezione subito dopo l'incontro, quando le impressioni sono ancora fresche.

### Messaggi chiave emersi

- 
- 
- 

### Differenzianti reali

- 
- 
- 

### Frasi o citazioni da tenere

- 
- 
- 

### Sezioni indispensabili del sito

- 
- 
- 

### Idee per hero, storia, servizi e gallery

- Hero:
- Storia:
- Servizi:
- Gallery:

### Materiali mancanti da recuperare

- 
- 
- 
```

- [ ] **Step 3: Verifica che i moduli extra e la chiusura operativa siano presenti**

Run:
```powershell
rg -n "^## Modulo Extra|^## Shot List|^## Sintesi post-intervista" docs/intervista-discovery-profumeria-wanda.md
```

Expected: compaiono i sette moduli extra, `## Shot List e materiali da recuperare` e `## Sintesi post-intervista`.

- [ ] **Step 4: Commit**

```bash
git add docs/intervista-discovery-profumeria-wanda.md
git commit -m "docs: add discovery interview modules and post-interview tools"
```

---

## Task 5: Rifinire il documento, aumentare la profondita e verificare i requisiti della spec

**Files:**
- Modify: `docs/intervista-discovery-profumeria-wanda.md`
- Read: `docs/superpowers/specs/2026-04-17-profumeria-wanda-discovery-interview-design.md`

- [ ] **Step 1: Aumenta il numero di prompt reali fino a raggiungere la soglia richiesta**

Aggiungi in ciascuno dei 12 blocchi principali almeno:

- 1 domanda principale in piu se il blocco ne ha solo 6;
- 1-2 follow-up in piu dove senti che il tema e ancora troppo generico;
- 1 prompt visivo aggiuntivo in `Domande che sbloccano dettagli veri`;
- 1 bullet in piu in `Materiali da chiedere o fotografare`.

Usa come guida questi inserimenti minimi:

```md
## 1. Origini e storia del negozio
- Domanda aggiuntiva: Quale momento vi ha fatto capire che il negozio non era solo un'attivita commerciale ma un punto di riferimento?

## 2. Identita profonda del negozio
- Domanda aggiuntiva: Che differenza c'e tra vendere bene un prodotto e far vivere bene l'esperienza del negozio?

## 3. Persone dietro al banco
- Domanda aggiuntiva: Cosa capisce una cliente esperta in pochi minuti del vostro livello di competenza?

## 4. Clientela reale
- Domanda aggiuntiva: C'e un bisogno ricorrente che i clienti non sanno nominare ma voi riconoscete subito?

## 5. Esperienza in negozio
- Domanda aggiuntiva: In quale momento preciso una persona passa da "sto guardando" a "mi sento seguita bene"?

## 6. Prodotti, reparti e criteri di selezione
- Domanda aggiuntiva: Quale reparto vi permette piu di altri di mostrare gusto, occhio e selezione?

## 7. Servizi e consulenza
- Domanda aggiuntiva: C'e un servizio che offrite quasi sempre ma che i clienti danno per scontato?

## 8. Autorevolezza e prove concrete
- Domanda aggiuntiva: Qual e una prova silenziosa della vostra serieta che non dichiarate mai ma che si percepisce?

## 9. Differenziazione
- Domanda aggiuntiva: Qual e una scelta che vi costa piu fatica ma vi distingue davvero?

## 10. Linguaggio e tono di voce
- Domanda aggiuntiva: Quale parola usereste per far capire calore senza sembrare troppo confidenziali?

## 11. Obiettivi del sito
- Domanda aggiuntiva: Quale contenuto dovrebbe convincere anche chi non vi conosce affatto?

## 12. Cose da evitare, limiti e paure
- Domanda aggiuntiva: Che tipo di estetica o messaggio rischierebbe di farvi sembrare un negozio qualsiasi?
```

- [ ] **Step 2: Verifica il numero minimo di domande**

Tutte le domande devono finire con `?` per rendere possibile il conteggio automatico.

Run:
```powershell
(Select-String -Path docs\intervista-discovery-profumeria-wanda.md -Pattern "\?$").Count
```

Expected: numero `>= 140`.

- [ ] **Step 3: Verifica che non ci siano placeholder o note temporanee**

Run:
```powershell
rg -n "TODO|TBD|placeholder|lorem ipsum|da completare" docs/intervista-discovery-profumeria-wanda.md
```

Expected: nessun risultato.

- [ ] **Step 4: Verifica la copertura della spec**

Controlla manualmente che il documento copra:

- storia;
- identita;
- persone;
- clientela;
- esperienza;
- prodotti;
- servizi;
- autorevolezza;
- differenziazione;
- tono;
- obiettivi;
- limiti;
- moduli extra;
- shot list;
- sintesi finale.

Se manca anche solo uno di questi blocchi, aggiungilo prima di chiudere il task.

- [ ] **Step 5: Rileggi il file finale**

Run:
```powershell
Get-Content docs\intervista-discovery-profumeria-wanda.md
```

Expected: il documento suona come una guida editoriale forte, non come un modulo burocratico.

- [ ] **Step 6: Commit**

```bash
git add docs/intervista-discovery-profumeria-wanda.md
git commit -m "docs: finalize Profumeria Wanda discovery interview"
```

---

## Self-Review

### 1. Spec coverage

La spec richiede:

- formato ibrido da discovery approfondita;
- istruzioni d'uso;
- intervista principale;
- moduli extra;
- shot list e materiali;
- sintesi post-intervista;
- target di profondita sufficiente a generare copy, struttura e shooting;
- circa 140-200 prompt reali.

Questo piano copre ogni punto con task separati:

- Task 1: introduzione, istruzioni, indice, formato;
- Task 2-3: intervista principale completa;
- Task 4: moduli extra, shot list, sintesi;
- Task 5: verifica finale, aumento della profondita, controllo automatico del numero di domande.

### 2. Placeholder scan

Il piano non lascia segnaposto operativi o rinvii vaghi. I contenuti da inserire sono espliciti e i controlli finali cercano note temporanee anche nel deliverable.

### 3. Type consistency

I nomi dei file, delle sezioni e dei blocchi sono coerenti in tutto il piano:

- file finale sempre `docs/intervista-discovery-profumeria-wanda.md`;
- file spec sempre `docs/superpowers/specs/2026-04-17-profumeria-wanda-discovery-interview-design.md`;
- blocchi finali sempre: intervista principale, moduli extra, shot list, sintesi post-intervista.
