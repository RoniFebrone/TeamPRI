import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team PRI — Agência de Design e Software',
  description: 'Criamos experiências digitais que conectam marcas e pessoas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
