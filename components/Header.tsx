'use client'

import { useState, useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect border-b border-white/10 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center h-full">
            <img 
              src="/nossaIdentidadeVisual/TeamPri.svg" 
              alt="Team PRI" 
              className="h-10 md:h-12 w-auto"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(0, 75, 126, 0.5))',
                borderRadius: '10px',
                
                
                
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                
                transition: 'all 0.3s ease',
              }}
            />
          </a>

          {/* Seletor de idioma */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

