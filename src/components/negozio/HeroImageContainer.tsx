'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface HeroImageContainerProps {
  src: string
  alt: string
  badgeText?: string
  badgeSubtext?: string
}

export function HeroImageContainer({ src, alt, badgeText, badgeSubtext }: HeroImageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const revealViewport = { once: true, amount: 0.35 } as const
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2])

  return (
    <div ref={containerRef} className="relative h-[420px] lg:h-[580px] w-full">
      {/* Decorative background element */}
      <motion.div 
        style={{ rotate }}
        className="absolute inset-0 bg-gradient-to-tl from-wanda-fucsia/8 to-transparent rounded-[2rem]" 
      />
      
      {/* Main Image Container with "Liquid Glass" effect */}
      <motion.div 
        style={{ y }}
        className="absolute top-8 right-8 w-[88%] h-[88%] p-[6px] rounded-[1.5rem] z-10 bg-white/10 backdrop-blur-sm border border-white/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        <div className="w-full h-full rounded-[1.25rem] overflow-hidden shadow-2xl relative">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover scale-110"
            priority
          />
        </div>
      </motion.div>

      {/* Floating Badge with "Magnetic" feel via Framer Motion */}
      {badgeText && (
        <motion.div 
          initial={{ opacity: 0, x: -20, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1 }}
          viewport={revealViewport}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="absolute bottom-6 -left-4 md:left-0 z-20"
        >
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-white/50">
            <p className="font-headline italic text-wanda-fucsia text-lg leading-snug">
              {badgeText}
            </p>
            {badgeSubtext && (
              <span className="text-[10px] text-wanda-text-soft font-bold tracking-[0.2em] uppercase mt-1 block">
                {badgeSubtext}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
