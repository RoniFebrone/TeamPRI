'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Logo desfocada como background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <img 
          src="/nossaIdentidadeVisual/logosemFundo.svg" 
          alt="Team PRI Background" 
          className="w-full h-full object-contain"
          style={{ 
            width: '150%', 
            height: '150%',
            minWidth: '100px',
            minHeight: '100px',
            filter: 'blur(5px)' 
          }}
        />
      </div>
      
      {/* Gradiente animado de fundo refinado */}
      <div className="absolute inset-0 gradient-bg opacity-30"></div>
      
      {/* Efeito de brilho sutil */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>
      
      {/* Grid pattern sutil */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Conteúdo principal */}
      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-white">{t('hero.subtitle')}</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>

        {/* Botão CTA refinado */}
        <a
          href="#contact"
          className="group relative inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-3">
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>
      </div>

    </section>
  )
}

