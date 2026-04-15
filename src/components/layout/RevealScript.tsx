'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function RevealScript() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Rimuove is-visible dal DOM prima di ricominciare: evita hydration mismatch
    // su navigazione SPA dove il DOM vecchio persiste mentre React riconcilia
    document.querySelectorAll('.reveal-on-scroll.is-visible').forEach((el) => {
      el.classList.remove('is-visible')
    })

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)')
      elements.forEach((el) => observer.observe(el))
    }

    // Initial observation
    observeElements()

    return () => {
      observer.disconnect()
    }
  }, [pathname, searchParams]) // Re-run on navigation or filter changes

  return null
}
