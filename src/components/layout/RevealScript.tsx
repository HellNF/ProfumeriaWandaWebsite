'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function RevealScript() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
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

    // Watch for DOM changes (like products loading or filtering)
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname, searchParams]) // Re-run on navigation or filter changes

  return null
}
