'use client'

import { useEffect } from 'react'

type NavigatorWithPerformanceHints = Navigator & {
  connection?: {
    saveData?: boolean
  }
  deviceMemory?: number
}

export function RevealScript() {
  useEffect(() => {
    const navigatorWithHints = navigator as NavigatorWithPerformanceHints
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldSkipReveal =
      prefersReducedMotion ||
      navigatorWithHints.connection?.saveData === true ||
      (typeof navigatorWithHints.deviceMemory === 'number' &&
        navigatorWithHints.deviceMemory <= 4) ||
      navigator.hardwareConcurrency <= 4

    const markVisible = (element: Element) => {
      element.classList.add('is-visible')
      element.removeAttribute('data-reveal-observed')
    }

    if (shouldSkipReveal) {
      document.querySelectorAll('.reveal-on-scroll').forEach((element) => {
        markVisible(element)
      })

      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextVisible = entries.filter((entry) => entry.isIntersecting)

        if (nextVisible.length === 0) {
          return
        }

        window.requestAnimationFrame(() => {
          nextVisible.forEach((entry) => {
            markVisible(entry.target)
            observer.unobserve(entry.target)
          })
        })
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    )

    const observeElements = (root: ParentNode = document) => {
      const elements = root.querySelectorAll(
        '.reveal-on-scroll:not(.is-visible):not([data-reveal-observed])',
      )

      elements.forEach((element) => {
        element.setAttribute('data-reveal-observed', 'true')
        observer.observe(element)
      })
    }

    observeElements()

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return

          if (node.matches('.reveal-on-scroll')) {
            node.setAttribute('data-reveal-observed', 'true')
            observer.observe(node)
          }

          observeElements(node)
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}
