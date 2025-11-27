'use client'

import { Instagram, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const menuItems = [
    { label: 'Início', href: '#home' },
    { label: 'Serviços', href: '#services' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Contato', href: '#contact' },
  ]

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e descrição */}
          <div className="col-span-1">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-gradient">Team PRI</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Criamos experiências digitais que conectam marcas e pessoas. 
              Transformando ideias em realidade através de design e tecnologia.
            </p>
          </div>

          {/* Menu de navegação */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Navegação</h4>
            <nav className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Redes sociais */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50"
                  aria-label={social.label}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Team PRI. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Feito com <span className="text-pink-500">♥</span> pela Team PRI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

