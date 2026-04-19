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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <div className="space-y-10 md:space-y-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl italic font-headline"
        >
          Passa a trovarci.
        </motion.h2>
        
        <div className="space-y-8 md:space-y-10">
          {/* Indirizzo */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4 md:gap-6 group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-wanda-fucsia/5 rounded-2xl flex items-center justify-center text-wanda-fucsia shrink-0 group-hover:bg-wanda-fucsia group-hover:text-white transition-all duration-500">
              <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="pt-1 md:pt-2">
              <h4 className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-wanda-text-soft mb-1 md:mb-2">Indirizzo</h4>
              <p className="text-lg md:text-xl font-medium italic leading-snug">
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
            className="flex gap-4 md:gap-6 group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-wanda-fucsia/5 rounded-2xl flex items-center justify-center text-wanda-fucsia shrink-0 group-hover:bg-wanda-fucsia group-hover:text-white transition-all duration-500">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="pt-1 md:pt-2 flex-1">
              <h4 className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-wanda-text-soft mb-3 md:mb-4">Orari di Apertura</h4>
              <ul className="space-y-2 md:space-y-3">
                {settings.orariStrutturati?.map((item: OpeningHoursItem, idx: number) => (
                  <li key={idx} className="flex justify-between items-center w-full max-w-sm border-b border-slate-100 pb-2 last:border-0">
                    <span className="font-bold text-[12px] md:text-sm text-wanda-nero">{item.giorni.map((day) => dayLabels[day]).join(', ')}</span>
                    <span className="text-[12px] md:text-sm font-medium text-wanda-text-soft">
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
            className="flex gap-4 md:gap-6 group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-wanda-fucsia/5 rounded-2xl flex items-center justify-center text-wanda-fucsia shrink-0 group-hover:bg-wanda-fucsia group-hover:text-white transition-all duration-500">
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="pt-1 md:pt-2 flex-1">
              <h4 className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-wanda-text-soft mb-5 md:mb-6">Contatti e Consulenza</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`tel:${settings.telefono?.replace(/\s/g, '')}`} 
                  className="btn-primary active:scale-95 text-xs md:text-sm py-3 text-center"
                >
                  Chiama in negozio
                </a>
                <a 
                  href={settings.linkWhatsApp ? `https://wa.me/${settings.linkWhatsApp.replace(/\D/g, '')}` : "#"}
                  className="btn-outline active:scale-95 text-xs md:text-sm py-3 text-center"
                >
                  Messaggio WhatsApp
                </a>
              </div>
              <p className="text-[11px] md:text-xs text-wanda-text-soft mt-6 italic bg-slate-50 p-4 rounded-xl border border-slate-100">
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
        className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] h-[400px] md:h-full min-h-[400px] relative border border-white/50"
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
        
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/80 backdrop-blur-xl p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 flex items-center justify-between z-10">
          <div className="space-y-1">
            <p className="font-headline italic text-lg md:text-xl text-wanda-nero">Nel cuore di Torino</p>
            <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-wanda-text-soft">Parcheggio riservato disponibile</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="bg-wanda-fucsia text-white w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-wanda-fucsia/30 shrink-0 ml-4"
          >
            <Navigation className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
