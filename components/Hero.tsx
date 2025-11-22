'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradiente animado de fundo */}
      <div className="absolute inset-0 gradient-bg opacity-20"></div>
      
      {/* Efeito de partículas/brilho */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Conteúdo principal */}
      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-gradient">Team PRI</span>
          <br />
          <span className="text-white">Agência de Design e Software</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Criamos experiências digitais que conectam marcas e pessoas.
        </p>

        {/* Botão CTA */}
        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/50">
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">
            Solicitar Orçamento
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Shape decorativo no canto */}
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#8b3aff"
            d="M45.7,-47.1C58.1,-35.2,66.2,-20.1,68.1,-4.3C70,11.5,65.7,28,57.1,41.2C48.5,54.4,35.6,64.3,21.2,68.1C6.8,71.9,-9.1,69.6,-23.3,64.1C-37.5,58.6,-50.9,49.9,-60.2,37.8C-69.5,25.7,-74.7,10.2,-73.2,-4.4C-71.7,-19,-63.5,-32.8,-52.1,-44.1C-40.7,-55.4,-26.1,-64.2,-10.8,-67.1C4.5,-70,20.5,-67,35.2,-59.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </section>
  )
}

