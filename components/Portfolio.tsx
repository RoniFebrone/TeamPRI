'use client'

import { Palette, Globe, Code2, ExternalLink, Monitor, X, Maximize2 } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

type Category = 'all' | 'designer' | 'landing-pages' | 'websites' | 'sistemas'

interface Project {
  id: number
  title: string
  category: Category
  description: string
  image: string
  link?: string
  tags: string[]
}

// Estrutura base dos projetos (sem textos traduzidos)
const projectsBase: Omit<Project, 'title' | 'description'>[] = [
  // Projetos de Designer
  {
    id: 1,
    category: 'designer',
    image: '/IdentidadeVisual/AuraMotors.svg',
    link: '#',
    tags: ['Branding', 'Logo Design', 'UI/UX'],
  },
  {
    id: 2,
    category: 'designer',
    image: '/IdentidadeVisual/LeCeleste.svg',
    link: '#',
    tags: ['Mobile Design', 'UI/UX', 'Prototipagem'],
  },
  // Projetos de Landing Pages
  {
    id: 4,
    category: 'landing-pages',
    image: '/CloudDesk2.gif',
    link: 'https://lp-cloud-desk-fic.vercel.app',
    tags: ['Next.js', 'TailwindCSS', 'Responsivo'],
  },
  {
    id: 5,
    category: 'landing-pages',
    image: '/BoostMind.gif',
    link: '#',
    tags: ['Next.js', 'TailwindCSS', 'Responsivo'],
  },
  {
    id: 6,
    category: 'landing-pages',
    image: '/Minimalista.gif',
    link: '#',
    tags: ['Design Minimalista', 'Moderno', 'Responsivo'],
  },
  // Projetos de Websites
  {
    id: 7,
    category: 'websites',
    image: '/AuraMotors.gif',
    link: '#',
    tags: ['Next.js', 'Responsivo', 'E-commerce'],
  },
  {
    id: 8,
    category: 'websites',
    image: '/Restaurante.gif',
    link: '#',
    tags: ['React', 'Responsivo', 'UI/UX'],
  },
]

export default function Portfolio() {
  const { t, locale } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [isVisible, setIsVisible] = useState(true) // Inicia como true para garantir visibilidade
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Projetos com traduções aplicadas (atualiza quando o idioma muda)
  const projects = useMemo(() => {
    return projectsBase.map((project) => {
      const translatedLink = t(`portfolio.projects.${project.id}.link`)
      return {
        ...project,
        title: t(`portfolio.projects.${project.id}.title`),
        description: t(`portfolio.projects.${project.id}.description`),
        // Usa o link da tradução se existir, senão usa o link do projectsBase
        link: translatedLink && translatedLink !== `portfolio.projects.${project.id}.link` 
          ? translatedLink 
          : project.link,
      }
    })
  }, [t, locale])

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  const categories = [
    { id: 'all' as Category, label: t('portfolio.all'), icon: <Code2 className="w-5 h-5" /> },
    { id: 'designer' as Category, label: t('portfolio.designer'), icon: <Palette className="w-5 h-5" /> },
    { id: 'landing-pages' as Category, label: t('portfolio.landingPages'), icon: <Globe className="w-5 h-5" /> },
    { id: 'websites' as Category, label: t('portfolio.websites'), icon: <Monitor className="w-5 h-5" /> },
    { id: 'sistemas' as Category, label: t('portfolio.systems'), icon: <Code2 className="w-5 h-5" /> },
  ]

  useEffect(() => {
    // Define como visível após um pequeno delay para garantir renderização
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

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

    const element = document.getElementById('portfolio')
    if (element) {
      observer.observe(element)
    }

    return () => {
      clearTimeout(timer)
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Atualiza os projetos filtrados quando o idioma ou categoria mudam
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory))
    }
  }, [activeCategory, projects])

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape)
      // Previne scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">{t('portfolio.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Filtros de categoria */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                  : 'glass-effect text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              <span className={activeCategory === category.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}>
                {category.icon}
              </span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">{t('portfolio.noProjects')}</p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 ${
                project.category === 'designer' ? 'cursor-pointer' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                if (project.category === 'designer') {
                  setSelectedProject(project)
                }
              }}
            >
              {/* Imagem do projeto */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
                {/* Indicador de GIF */}
                
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback caso a imagem não carregue
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge de categoria */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    {categories.find(c => c.id === project.category)?.label}
                  </span>
                </div>

                {/* Botão de ação - Modal para Designer, Link externo para outros */}
                {project.category === 'designer' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProject(project)
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:scale-110"
                    aria-label="Ver imagem em tamanho maior"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                ) : project.link && project.link !== '#' ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:scale-110"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                ) : null}
              </div>

              {/* Conteúdo do card */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 rounded-md text-xs bg-gray-700/50 text-gray-300 border border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      {/* Modal para exibir imagens de Designer */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 hover:scale-110"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagem */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="max-w-full max-h-[80vh] object-contain"
                loading="lazy"
              />
            </div>

            {/* Informações do projeto */}
            <div className="p-6 border-t border-gray-700 bg-gray-800/50">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

