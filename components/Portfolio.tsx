'use client'

import { Palette, Globe, Code2, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

type Category = 'all' | 'designer' | 'landing-pages' | 'sistemas'

interface Project {
  id: number
  title: string
  category: Category
  description: string
  image: string
  link?: string
  tags: string[]
}

// Projetos de exemplo - você pode substituir pelos projetos reais
const projects: Project[] = [
  // Projetos de Designer
  {
    id: 1,
    title: 'Identidade Visual - TechStart',
    category: 'designer',
    description: 'Criação completa de identidade visual moderna e impactante para startup de tecnologia.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    link: '#',
    tags: ['Branding', 'Logo Design', 'UI/UX'],
  },
  {
    id: 2,
    title: 'Redesign App Mobile',
    category: 'designer',
    description: 'Redesign completo de aplicativo mobile com foco em usabilidade e experiência do usuário.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    link: '#',
    tags: ['Mobile Design', 'UI/UX', 'Prototipagem'],
  },
  {
    id: 3,
    title: 'Sistema de Design',
    category: 'designer',
    description: 'Desenvolvimento de design system completo para garantir consistência visual.',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop',
    link: '#',
    tags: ['Design System', 'Componentes', 'Documentação'],
  },
  // Projetos de Landing Pages
  {
    id: 4,
    title: 'Landing Page - CloudDesk SaaS Plataforma ',
    category: 'landing-pages',
    description: 'Uma landing page moderna e completa para o SaaS fictício CloudDesk, construída com Next.js 14, TailwindCSS e Framer Motion.',
    image: '/CloudDesk2.gif',
    link: 'https://lp-cloud-desk-fic.vercel.app',
    tags: ['Next.js', 'TailwindCSS', 'Responsivo'],
  },
  {
    id: 5,
    title: 'Landing Page - E-commerce',
    category: 'landing-pages',
    description: 'Página de destino otimizada para e-commerce com foco em vendas e conversão.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    link: '#',
    tags: ['React', 'E-commerce', 'SEO'],
  },
  {
    id: 6,
    title: 'Landing Page - Produto Digital',
    category: 'landing-pages',
    description: 'Landing page impactante para lançamento de produto digital com animações modernas.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    link: '#',
    tags: ['Animations', 'Performance', 'Modern'],
  },
  // Projetos de Sistemas
  {
    id: 7,
    title: 'Sistema de Gestão ERP',
    category: 'sistemas',
    description: 'Sistema completo de gestão empresarial com múltiplos módulos e integrações.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    link: '#',
    tags: ['Full-stack', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 8,
    title: 'Plataforma de E-learning',
    category: 'sistemas',
    description: 'Plataforma completa de ensino online com videoaulas, exercícios e certificados.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    link: '#',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 9,
    title: 'Sistema de Agendamento',
    category: 'sistemas',
    description: 'Sistema de agendamento online com calendário integrado e notificações automáticas.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    link: '#',
    tags: ['TypeScript', 'Next.js', 'Prisma'],
  },
]

const categories = [
  { id: 'all' as Category, label: 'Todos', icon: <Code2 className="w-5 h-5" /> },
  { id: 'designer' as Category, label: 'Designer', icon: <Palette className="w-5 h-5" /> },
  { id: 'landing-pages' as Category, label: 'Landing Pages', icon: <Globe className="w-5 h-5" /> },
  { id: 'sistemas' as Category, label: 'Sistemas', icon: <Code2 className="w-5 h-5" /> },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [isVisible, setIsVisible] = useState(true) // Inicia como true para garantir visibilidade
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

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

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory))
    }
  }, [activeCategory])

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Nossos Projetos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Conheça alguns dos trabalhos que desenvolvemos com paixão e dedicação
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
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
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
              <p className="text-gray-400 text-lg">Nenhum projeto encontrado nesta categoria.</p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Imagem do projeto */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
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
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    {categories.find(c => c.id === project.category)?.label}
                  </span>
                </div>

                {/* Link externo */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:scale-110"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Conteúdo do card */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
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
    </section>
  )
}

