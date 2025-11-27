'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Locale } from '@/lib/translations'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('locale') as Locale
      if (saved && ['pt', 'en', 'es', 'fr'].includes(saved)) {
        return saved
      }
    }
    return 'pt'
  })

  const t = (key: string): string => {
    try {
      // Importação dinâmica dos arquivos de tradução
      let translations: any
      switch (locale) {
        case 'en':
          translations = require('@/messages/en.json')
          break
        case 'es':
          translations = require('@/messages/es.json')
          break
        case 'fr':
          translations = require('@/messages/fr.json')
          break
        default:
          translations = require('@/messages/pt.json')
      }
      
      const keys = key.split('.')
      let value: any = translations
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    } catch {
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

