'use client'

import { useEffect } from 'react'

const MAX_SIZE_BYTES = 3.5 * 1024 * 1024 // 3.5MB — sotto il limite Vercel di 4.5MB
const MAX_DIMENSION = 2400 // px max per lato

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      let { width, height } = img
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width >= height) {
          height = Math.round((height / width) * MAX_DIMENSION)
          width = MAX_DIMENSION
        } else {
          width = Math.round((width / height) * MAX_DIMENSION)
          height = MAX_DIMENSION
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)

      // Prova qualità decrescente finché il file è sotto il limite
      let quality = 0.88
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file)
            if (blob.size <= MAX_SIZE_BYTES || quality <= 0.4) {
              const ext = file.type === 'image/png' ? 'png' : 'jpg'
              const name = file.name.replace(/\.[^.]+$/, `.${ext}`)
              resolve(new File([blob], name, { type: blob.type }))
            } else {
              quality -= 0.1
              tryCompress()
            }
          },
          file.type === 'image/png' ? 'image/png' : 'image/jpeg',
          quality,
        )
      }
      tryCompress()
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(file) // fallback: invia file originale
    }

    img.src = url
  })
}

export function MediaUploadCompressor({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    const originalFetch = window.fetch

    window.fetch = async function (input, init) {
      if (init?.body instanceof FormData) {
        const formData = init.body
        const file = formData.get('file')

        if (
          file instanceof File &&
          file.type.startsWith('image/') &&
          file.size > MAX_SIZE_BYTES
        ) {
          const compressed = await compressImage(file)
          formData.set('file', compressed, compressed.name)
        }
      }
      return originalFetch.call(this, input, init)
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  return <>{children}</>
}
