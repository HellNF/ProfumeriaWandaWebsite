'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import { MapEmbed } from './MapEmbed'
import type { ImpostazioniNegozio } from '@/types/cms'

interface ContactSectionProps {
  settings: ImpostazioniNegozio
  dayLabels: Record<string, string>
}

export function ContactSection({ settings, dayLabels }: ContactSectionProps) {
  const revealViewport = { once: true, amount: 0.2 } as const
  type OpeningHoursItem = NonNullable<ImpostazioniNegozio['orariStrutturati']>[number]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl italic font-headline"
        >
          Passa a trovarci.
        </motion.h2>
        
        <div className="space-y-10">
          {/* Indirizzo */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-6 group"
          >
            <div className="w-14 h-14 bg-wanda-fucsia/5 rounded-2xl flex items-center justify-center text-wanda-fucsia shrink-0 group-hover:bg-wanda-fucsia group-hover:text-white transition-all duration-500">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-bold tracking-widest uppercase text-wanda-text-soft mb-2">Indirizzo</h4>
              <p className="text-xl font-medium italic">
                {settings.indirizzo}<br />
                {settings.cap} {settings.citta} ({settings.provincia})
              </p>
            </div>
          </motion.div>

          {/* Orari */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6 group"
          >
            <div className="w-14 h-14 bg-wanda-fucsia/5 rounded-2xl flex items-center justify-center text-wanda-fucsia shrink-0 group-hover:bg-wanda-fucsia group-hover:text-white transition-all duration-500">
              <Clock className="w-6 h-6" />
            </div>
            <div className="pt-2 flex-1">
              <h4 className="text-sm font-bold tracking-widest uppercase text-wanda-text-soft mb-4">Orari di Apertura</h4>
              <ul className="space-y-3">
                {settings.orariStrutturati?.map((item: OpeningHoursItem, idx: number) => (
                  <li key={idx} className="flex justify-between items-center w-full max-w-sm border-b border-slate-100 pb-2 last:border-0">
                    <span className="font-bold text-sm text-wanda-nero">{item.giorni.map((day) => dayLabels[day]).join(', ')}</span>
                    <span className="text-sm font-medium text-wanda-text-soft">
                      {item.chiuso ? 'Chiuso' : (
                        item.pausaPranzo 
                          ? `${item.oraApertura}-${item.oraChiusuraPranzo} / ${item.oraRiaperturaPranzo}-${item.oraChiusura}`
                          : `${item.oraApertura}-${item.oraChiusura}`
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contatti */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-6 group"
          >
            <div className="w-14 h-14 bg-wanda-fucsia/5 rounded-2xl flex items-center justify-center text-wanda-fucsia shrink-0 group-hover:bg-wanda-fucsia group-hover:text-white transition-all duration-500">
              <Phone className="w-6 h-6" />
            </div>
            <div className="pt-2 flex-1">
              <h4 className="text-sm font-bold tracking-widest uppercase text-wanda-text-soft mb-6">Contatti e Consulenza</h4>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={`tel:${settings.telefono?.replace(/\s/g, '')}`} 
                  className="btn-primary active:scale-95 text-sm"
                >
                  Chiama in negozio
                </a>
                <a 
                  href={settings.linkWhatsApp ? `https://wa.me/${settings.linkWhatsApp.replace(/\D/g, '')}` : "#"}
                  className="btn-outline active:scale-95 text-sm"
                >
                  Messaggio WhatsApp
                </a>
              </div>
              <p className="text-xs text-wanda-text-soft mt-6 italic bg-slate-50 p-4 rounded-xl border border-slate-100">
                Siamo disponibili telefonicamente durante gli orari di apertura per ordini, consigli rapidi o per fissare una consulenza privata.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={revealViewport}
        transition={{ duration: 0.8 }}
        className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] h-[500px] md:h-full min-h-[500px] relative border border-white/50"
      >
        {settings.googleMapsEmbedUrl ? (
          <div className="absolute inset-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
            <MapEmbed src={settings.googleMapsEmbedUrl} />
          </div>
        ) : (
          <div className="w-full h-full bg-wanda-surface-low flex items-center justify-center text-wanda-text-soft italic">
            Mappa in arrivo
          </div>
        )}
        
        <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-headline italic text-xl text-wanda-nero">Nel cuore di Torino</p>
            <p className="text-xs font-bold tracking-widest uppercase text-wanda-text-soft">Parcheggio riservato disponibile</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="bg-wanda-fucsia text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-wanda-fucsia/30"
          >
            <Navigation className="w-6 h-6 fill-current" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
