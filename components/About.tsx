'use client'

import { Users, Globe, Rocket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

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

    const element = document.getElementById('about')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: t('about.features.team.title'),
      description: t('about.features.team.description'),
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('about.features.focus.title'),
      description: t('about.features.focus.description'),
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: t('about.features.expansion.title'),
      description: t('about.features.expansion.description'),
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* História */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Texto da história */}
          <div className="space-y-6">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                {t('about.story.p1')}
              </p>
              <p className="text-lg">
                {t('about.story.p2')}
              </p>
              <p className="text-lg">
                {t('about.story.p3')}
              </p>
            </div>
          </div>

          {/* Card decorativo */}
          <div className="relative">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{t('about.mission.title')}</h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Gradiente de fundo no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Ícone com gradiente */}
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

