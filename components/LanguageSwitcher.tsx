'use client'

import { Globe } from 'lucide-react'
import { useState } from 'react'

type Language = 'pt' | 'en' | 'es'

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('pt')
  const [isOpen, setIsOpen] = useState(false)

  // TODO: Implementar tradução real com i18n (next-intl ou similar)
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang)
    setIsOpen(false)
    // Aqui você pode implementar a mudança de idioma real
    // Por exemplo: router.push(router.pathname, router.asPath, { locale: lang })
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLang)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 text-white transition-all duration-300 hover:bg-gray-800"
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
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800 border border-gray-700 shadow-2xl z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 ${
                  currentLang === lang.code
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-l-2 border-purple-500'
                    : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-white text-sm font-medium">{lang.label}</span>
                {currentLang === lang.code && (
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

