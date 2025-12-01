'use client'

import { Globe } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { type Locale } from '@/lib/translations'

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
    // Salva no localStorage para persistir
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  const currentLanguage = languages.find((lang) => lang.code === locale)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-white/10 hover:border-indigo-500/50 text-white transition-all duration-300"
        aria-label="Selecionar idioma"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLanguage?.label}</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 rounded-xl glass-effect border border-white/10 shadow-2xl z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 ${
                  locale === lang.code
                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-l-2 border-indigo-500'
                    : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-white text-sm font-medium">{lang.label}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-purple-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

