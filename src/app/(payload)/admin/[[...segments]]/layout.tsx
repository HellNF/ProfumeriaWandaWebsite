import type { ReactNode } from 'react'
import type { ServerFunctionClient } from 'payload'

import config from '@payload-config'
import { RootLayout, handleServerFunctions, metadata } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'

import { importMap } from '../../importMap'

export { metadata }

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  })
}
