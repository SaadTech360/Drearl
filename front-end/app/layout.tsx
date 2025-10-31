import type { Metadata } from 'next'
import './globals.css'
import Layout from './components/Layout'

import { headers } from 'next/headers' // added
import ContextProvider from './context'

export const metadata: Metadata = {
  title: 'DREARL',
  description: 'Powered by Reown'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const cookies = (await headers()).get('cookie')

  return (
    <html lang="en">
      <body className="" suppressHydrationWarning={true}>
        <ContextProvider cookies={cookies}>
          <Layout>{children}</Layout>
        </ContextProvider>
      </body>
    </html>
  )
}