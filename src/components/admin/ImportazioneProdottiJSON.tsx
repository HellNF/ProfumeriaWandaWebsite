'use client'

import { useState, useRef } from 'react'

interface ProdottoInput {
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
}

interface ImportResults {
  creati: number
  saltati: number
  errori: { nome: string; errore: string }[]
}

const EXAMPLE = JSON.stringify(
  [
    {
      nome: 'Acqua di Giò',
      marca: 'Giorgio Armani',
      categoria: 'profumeria',
      destinatario: 'uomo',
      formato: 100,
      descrizione: 'Fresco e marino, ispirato al Mediterraneo.',
      prezzo: 95.0,
      fotoUrls: ['https://esempio.com/acqua-di-gio.jpg'],
      disponibile: true,
      inEvidenza: false,
    },
  ],
  null,
  2,
)

export function ImportazioneProdottiJSON() {
  const [prodotti, setProdotti] = useState<ProdottoInput[] | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ImportResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showExample, setShowExample] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function processFile(file: File) {
    if (!file) return
    if (!file.name.endsWith('.json')) {
      setError('Il file deve essere un .json')
      return
    }
    setResults(null)
    setError(null)
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (!Array.isArray(data)) throw new Error('Il file deve contenere un array JSON')
        // Validazione base
        const invalidi = data.filter((p) => !p.nome || !p.marca || !p.categoria || p.prezzo == null)
        if (invalidi.length > 0) {
          throw new Error(
            `${invalidi.length} prodotti mancano di campi obbligatori (nome, marca, categoria, prezzo)`,
          )
        }
        setProdotti(data)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'JSON non valido')
        setProdotti(null)
      }
    }
    reader.readAsText(file)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function onDragLeave() {
    setIsDragging(false)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  async function handleImport() {
    if (!prodotti) return
    setLoading(true)
    setResults(null)
    setError(null)

    try {
      const res = await fetch('/api/globals/importatore-prodotti/importa-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prodotti),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Errore del server')
      setResults(data)
      setProdotti(null)
      setFileName('')
      if (fileRef.current) fileRef.current.value = ''
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150, #e0e0e0)',
        borderRadius: 8,
        padding: 24,
        marginBottom: 32,
        background: 'var(--theme-elevation-50, #fafafa)',
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
        Importa da file JSON
      </h4>
      <p
        style={{
          marginTop: 0,
          marginBottom: 16,
          color: 'var(--theme-elevation-500, #666)',
          fontSize: 14,
        }}
      >
        Trascina qui il file <code>.json</code> con l&apos;array dei prodotti o clicca per selezionarlo.
        Le marche devono già esistere nel gestionale.
      </p>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? '#b4005d' : 'var(--theme-elevation-200, #ccc)'}`,
          borderRadius: 8,
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? 'rgba(180, 0, 93, 0.05)' : 'transparent',
          transition: 'all 0.2s ease',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
        <div style={{ fontWeight: 600, color: isDragging ? '#b4005d' : 'inherit' }}>
          {isDragging ? 'Rilascia il file qui' : 'Trascina il file JSON dei prodotti qui o clicca per sfogliare'}
        </div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
          Solo file .json accettati
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 500 }}>
          Campi obbligatori per ogni prodotto:{' '}
          <code>nome, marca (nome esatto), categoria, prezzo</code>
        </p>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#666' }}>
          Categorie valide:{' '}
          <code>
            profumeria · cosmetici · trucco · pelletteria · borse-valigie · idee-regalo · altro
          </code>
        </p>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#666' }}>
          Destinatario (opzionale): <code>donna · uomo · unisex</code>
        </p>

        <button
          onClick={() => setShowExample((v) => !v)}
          style={{
            background: 'none',
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '4px 12px',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          {showExample ? '▲ Nascondi esempio' : '▼ Mostra esempio JSON'}
        </button>
      </div>

      {showExample && (
        <pre
          style={{
            background: '#f4f4f4',
            border: '1px solid #ddd',
            borderRadius: 4,
            padding: 12,
            fontSize: 12,
            overflowX: 'auto',
            marginBottom: 16,
          }}
        >
          {EXAMPLE}
        </pre>
      )}

      {error && (
        <p style={{ color: '#c0392b', marginBottom: 16, fontWeight: 500 }}>❌ {error}</p>
      )}

      {prodotti && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 500 }}>
            📂 <strong>{fileName}</strong> — {prodotti.length} prodotti trovati
          </p>
          <ul
            style={{
              margin: '0 0 16px',
              paddingLeft: 20,
              fontSize: 13,
              color: '#555',
              maxHeight: 140,
              overflowY: 'auto',
            }}
          >
            {prodotti.slice(0, 12).map((p, i) => (
              <li key={i}>
                {p.nome}{' '}
                <span style={{ color: '#888' }}>
                  — {p.marca} · {p.categoria} · €{p.prezzo}
                </span>
              </li>
            ))}
            {prodotti.length > 12 && (
              <li style={{ color: '#888' }}>...e altri {prodotti.length - 12}</li>
            )}
          </ul>
          <button
            onClick={handleImport}
            disabled={loading}
            style={{
              background: loading ? '#999' : '#b4005d',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '10px 24px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {loading
              ? '⏳ Importazione in corso…'
              : `🚀 Importa ${prodotti.length} prodotti`}
          </button>
        </div>
      )}

      {results && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: 6,
            padding: 16,
            fontSize: 14,
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 600 }}>✅ Importazione completata</p>
          <p style={{ margin: '0 0 4px' }}>
            <strong>{results.creati}</strong> prodotti creati &nbsp;·&nbsp;
            <strong>{results.saltati}</strong> saltati (già presenti)
          </p>
          {results.errori.length > 0 && (
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#c0392b' }}>
                ❌ {results.errori.length} errori
              </summary>
              <ul style={{ marginTop: 8, paddingLeft: 20, fontSize: 13 }}>
                {results.errori.map((e, i) => (
                  <li key={i}>
                    <strong>{e.nome}</strong>: {e.errore}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}
