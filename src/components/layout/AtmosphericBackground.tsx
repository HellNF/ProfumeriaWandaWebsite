'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function AtmosphericBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary Scent Orb - Fuchsia */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-wanda-fucsia/10 blur-[120px]"
      />

      {/* Secondary Scent Orb - Soft Rose */}
      <motion.div
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-wanda-fucsia-light/5 blur-[100px]"
      />

      {/* Tertiary Accent Orb - Violet */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -20, 50, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[30%] -left-[15%] w-[40vw] h-[40vw] rounded-full bg-wanda-violetto/5 blur-[90px]"
      />

      {/* Central Bloom - Neutral Warm */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,224,240,0.15)_0%,transparent_70%)]" />

      {/* Base wash for atmospheric depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-wanda-bg via-transparent to-white/20" />
    </div>
  )
}
