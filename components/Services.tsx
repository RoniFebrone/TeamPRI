'use client'

import { Palette, Code, Image, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  const services = [
    {
      icon: <Palette className="w-12 h-12" />,
      title: t('services.uiux.title'),
      description: t('services.uiux.description'),
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: t('services.web.title'),
      description: t('services.web.description'),
    },
    {
      icon: <Image className="w-12 h-12" />,
      title: t('services.branding.title'),
      description: t('services.branding.description'),
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: t('services.custom.title'),
      description: t('services.custom.description'),
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('services')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradiente de fundo no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Ícone com gradiente */}
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

