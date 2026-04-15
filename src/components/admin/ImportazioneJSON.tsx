'use client'

import { useState, useRef } from 'react'

interface BrandInput {
  nome: string
  logoUrl?: string | null
  descrizione?: string | null
}

interface ImportResults {
  creati: number
  saltati: number
  errori: { nome: string; errore: string }[]
}

export function ImportazioneJSON() {
  const [brands, setBrands] = useState<BrandInput[] | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ImportResults | null>(null)
  const [error, setError] = useState<string | null>(null)
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
        setBrands(data)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'JSON non valido')
        setBrands(null)
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
    if (!brands) return
    setLoading(true)
    setResults(null)
    setError(null)

    try {
      const res = await fetch('/api/globals/importatore-marche/importa-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brands),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Errore del server')
      setResults(data)
      setBrands(null)
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
      <p style={{ marginTop: 0, marginBottom: 16, color: 'var(--theme-elevation-500, #666)', fontSize: 14 }}>
        Trascina qui il file <code>.json</code> con l&apos;array dei brand o clicca per selezionarlo.
        I loghi verranno scaricati e i record creati automaticamente.
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
        <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
        <div style={{ fontWeight: 600, color: isDragging ? '#b4005d' : 'inherit' }}>
          {isDragging ? 'Rilascia il file qui' : 'Trascina il file JSON qui o clicca per sfogliare'}
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

      {error && (
        <p style={{ color: '#c0392b', marginBottom: 16, fontWeight: 500 }}>
          ❌ {error}
        </p>
      )}

      {brands && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 500 }}>
            📂 <strong>{fileName}</strong> — {brands.length} brand trovati
          </p>
          <ul style={{ margin: '0 0 16px', paddingLeft: 20, fontSize: 13, color: '#555', maxHeight: 120, overflowY: 'auto' }}>
            {brands.slice(0, 10).map((b, i) => (
              <li key={i}>{b.nome}{b.logoUrl ? ' (logo incluso)' : ''}</li>
            ))}
            {brands.length > 10 && <li>...e altri {brands.length - 10}</li>}
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
            {loading ? '⏳ Importazione in corso…' : `🚀 Importa ${brands.length} brand`}
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
            <strong>{results.creati}</strong> brand creati &nbsp;·&nbsp;
            <strong>{results.saltati}</strong> saltati (già presenti)
          </p>
          {results.errori.length > 0 && (
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#c0392b' }}>
                ❌ {results.errori.length} errori
              </summary>
              <ul style={{ marginTop: 8, paddingLeft: 20, fontSize: 13 }}>
                {results.errori.map((e, i) => (
                  <li key={i}><strong>{e.nome}</strong>: {e.errore}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}
