import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppProvider from '@/app/redux/AppProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Usedo',
    template: `%s | Usedo`,
  },
  description: 'Kuwaiit best blog on technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
