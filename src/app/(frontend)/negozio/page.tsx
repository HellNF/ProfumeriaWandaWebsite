// src/app/(frontend)/negozio/page.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { MapEmbed } from '@/components/negozio/MapEmbed'
import { StructuredData } from '@/components/negozio/StructuredData'

export const metadata: Metadata = {
  title: 'Il Negozio',
  description: 'Visita Profumeria Wanda: orari, indirizzo e come trovarci.',
}

export default async function NegozioPage() {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'impostazioni-negozio' })

  return (
    <main className="container mx-auto px-4 py-12">
      <StructuredData
        nomeNegozio={settings.nomeNegozio ?? 'Profumeria Wanda'}
        descrizione={settings.descrizioneNegozio}
        indirizzo={settings.indirizzo}
        telefono={settings.telefono}
        orari={settings.orari}
        linkInstagram={settings.linkInstagram}
        linkFacebook={settings.linkFacebook}
      />

      <div className="mb-10">
        <p className="text-wanda-fucsia text-xs tracking-[0.3em] uppercase mb-2">Vieni a trovarci</p>
        <h1 className="font-serif text-4xl text-wanda-nero">Il Negozio</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Info */}
        <div className="space-y-6">
          {settings.descrizioneNegozio && (
            <p className="text-gray-600 leading-relaxed">{settings.descrizioneNegozio}</p>
          )}

          {settings.orari && (
            <div>
              <h2 className="font-serif text-lg mb-2">Orari</h2>
              <p className="text-gray-600 whitespace-pre-line">{settings.orari}</p>
            </div>
          )}

          {settings.indirizzo && (
            <div>
              <h2 className="font-serif text-lg mb-2">Indirizzo</h2>
              <p className="text-gray-600">{settings.indirizzo}</p>
            </div>
          )}

          {settings.telefono && (
            <div>
              <h2 className="font-serif text-lg mb-2">Telefono</h2>
              <a
                href={`tel:${settings.telefono}`}
                className="text-wanda-fucsia hover:underline"
              >
                {settings.telefono}
              </a>
            </div>
          )}

          {/* Social */}
          <div>
            <h2 className="font-serif text-lg mb-3">Seguici</h2>
            <div className="flex gap-4">
              {settings.linkInstagram && (
                <a
                  href={settings.linkInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs px-4 py-2"
                >
                  Instagram
                </a>
              )}
              {settings.linkFacebook && (
                <a
                  href={settings.linkFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs px-4 py-2"
                >
                  Facebook
                </a>
              )}
              {settings.linkWhatsApp && (
                <a
                  href={`https://wa.me/${settings.linkWhatsApp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-4 py-2 inline-block"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* ETHOS */}
          <div className="border border-gray-100 p-4 bg-wanda-gray-light">
            <p className="text-sm text-gray-600">
              <strong>Affiliata ETHOS</strong> — Accettiamo la carta fedeltà ETHOS.
              Accumula punti e goditi vantaggi esclusivi.
            </p>
          </div>
        </div>

        {/* Mappa */}
        <div>
          {settings.googleMapsEmbedUrl ? (
            <MapEmbed src={settings.googleMapsEmbedUrl} />
          ) : (
            <div className="aspect-video bg-wanda-gray-light flex items-center justify-center text-wanda-gray-mid text-sm">
              Mappa non configurata — aggiungi l&apos;URL embed dalle Impostazioni Negozio
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
