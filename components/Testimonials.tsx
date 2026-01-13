'use client'

import { useEffect, useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useLanguage } from '@/contexts/LanguageContext'

interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  avatar: string
}

export default function Testimonials() {
  const { t, locale } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  // Depoimentos com traduções aplicadas
  const testimonials = useMemo(() => [
    {
      name: t('testimonials.items.1.name'),
      role: t('testimonials.items.1.role'),
      company: t('testimonials.items.1.company'),
      text: t('testimonials.items.1.text'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
    {
      name: t('testimonials.items.2.name'),
      role: t('testimonials.items.2.role'),
      company: t('testimonials.items.2.company'),
      text: t('testimonials.items.2.text'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    },
    {
      name: t('testimonials.items.3.name'),
      role: t('testimonials.items.3.role'),
      company: t('testimonials.items.3.company'),
      text: t('testimonials.items.3.text'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
  ], [t, locale])

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

    const element = document.getElementById('testimonials')
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
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">{t('testimonials.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="glass-effect rounded-2xl p-8 border border-white/10 h-full hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
                  {/* Avatar */}
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-purple-500 mr-4"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Texto do depoimento */}
                  <p className="text-gray-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Estrelas decorativas */}
                  <div className="mt-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #a855f7 !important;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #a855f7 !important;
        }
        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          font-size: 24px;
        }
      `}} />
    </section>
  )
}

