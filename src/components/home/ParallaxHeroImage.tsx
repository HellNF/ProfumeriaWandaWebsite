'use client'

import { useEffect, useRef } from 'react'

export function ParallaxHeroImage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const scrollY = window.scrollY
      const speed = 0.15 // Adjust speed for intensity
      ref.current.style.transform = `translateY(${scrollY * speed}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className="relative h-full w-full will-change-transform">
      {children}
    </div>
  )
}
