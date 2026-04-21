import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  serverExternalPackages: ['monaco-editor'],
  transpilePackages: ['@payloadcms/storage-s3'],
  turbopack: {},
  async headers() {
    return [
      {
        // Usa la sintassi standard di Next.js per intercettare tutte le rotte
        source: '/:path*',
        headers: securityHeaders,
      },
      // ⚠️ ABBIAMO RIMOSSO IL BLOCCO DEL CONTENT SECURITY POLICY PER /ADMIN ⚠️
      // Lasciamo che sia Payload a gestire la sicurezza della sua interfaccia.
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'kcenuiwiyhschkgqattd.supabase.co' },
      { protocol: 'https', hostname: 'kcenuiwiyhschkgqattd.storage.supabase.co' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'http', hostname: '127.0.0.1', port: '3000' },
    ],
  },
}

export default withPayload(nextConfig)