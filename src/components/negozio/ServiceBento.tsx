'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Wind, Coffee, LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  imageSrc: string
  imageAlt: string
  className?: string
  index: number
}

function ServiceCard({ title, description, icon: Icon, imageSrc, imageAlt, className, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden bg-white rounded-3xl border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 md:p-10 ${className}`}
    >
      <div className="flex flex-col h-full gap-8">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-wanda-fucsia/5 flex items-center justify-center text-wanda-fucsia group-hover:scale-110 group-hover:bg-wanda-fucsia group-hover:text-white transition-all duration-500">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-headline italic">{title}</h3>
          <p className="text-wanda-text-soft leading-relaxed max-w-sm">{description}</p>
        </div>
        
        <div className="relative flex-1 min-h-[240px] rounded-2xl overflow-hidden grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700">
          <Image 
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  )
}

interface ServiceBentoProps {
  imgConsulenza: string
  altConsulenza: string
  imgCaffe: string
  altCaffe: string
}

export function ServiceBento({ imgConsulenza, altConsulenza, imgCaffe, altCaffe }: ServiceBentoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ServiceCard 
        index={0}
        title="Consulenza Olfattiva"
        description="Ti aiutiamo a trovare la tua firma olfattiva. Attraverso un percorso sensoriale, scopriremo insieme le note che meglio esprimono la tua personalità."
        icon={Wind}
        imageSrc={imgConsulenza}
        imageAlt={altConsulenza}
        className="md:col-span-2"
      />
      
      <ServiceCard 
        index={1}
        title="Un caffè e due chiacchiere"
        description="Non abbiamo mai fretta. Il tempo speso con i nostri clienti è il nostro valore più prezioso."
        icon={Coffee}
        imageSrc={imgCaffe}
        imageAlt={altCaffe}
      />
    </div>
  )
}
