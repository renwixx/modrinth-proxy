'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function MobileNav({ onFilterClick }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const isActive = (path) => {
    if (path === '/mods') return pathname.startsWith('/mods')
    if (path === '/plugins') return pathname.startsWith('/plugins')
    if (path === '/shaders') return pathname.startsWith('/shaders')
    if (path === '/resourcepacks') return pathname.startsWith('/resourcepacks')
    if (path === '/datapacks') return pathname.startsWith('/datapacks')
    if (path === '/modpacks') return pathname.startsWith('/modpacks')
    if (path === '/news') return pathname.startsWith('/news')
    return false
  }

  const navItems = [
    { href: '/mods', label: 'Моды', emoji: '⚡', color: 'from-green-500 to-emerald-500' },
    { href: '/plugins', label: 'Плагины', emoji: '🎤', color: 'from-blue-500 to-cyan-500' },
    { href: '/shaders', label: 'Шейдеры', emoji: '✨', color: 'from-purple-500 to-pink-500' },
    { href: '/resourcepacks', label: 'Ресурспаки', emoji: '🎨', color: 'from-orange-500 to-amber-500' },
    { href: '/datapacks', label: 'Датапаки', emoji: '🏔️', color: 'from-indigo-500 to-blue-500' },
    { href: '/modpacks', label: 'Модпаки', emoji: '📦', color: 'from-red-500 to-rose-500' },
    { href: '/news', label: 'Новости', emoji: '📰', color: 'from-yellow-500 to-amber-500' },
  ]

  const showFilterButton = pathname.startsWith('/mods') || 
                          pathname.startsWith('/plugins') || 
                          pathname.startsWith('/shaders') || 
                          pathname.startsWith('/resourcepacks') || 
                          pathname.startsWith('/datapacks')

  const handleFilterClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toggleMobileFilter'))
    }
  }

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Меню</span>
          </button>
          
          {showFilterButton && (
            <button
              onClick={handleFilterClick}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Фильтр</span>
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-700 rounded-t-3xl shadow-2xl pb-safe animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
            </div>
            
            <div className="p-3 pb-16">
              <h3 className="text-sm font-bold text-white mb-3 text-center">Навигация</h3>
              
              <div className="grid grid-cols-2 gap-2 mobile-nav-grid">
                {navItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                        active
                          ? 'bg-gradient-to-br ' + item.color + ' shadow-md'
                          : 'bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      <span className={`text-sm font-medium text-center ${
                        active ? 'text-white' : 'text-gray-300'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

