import './globals.css'
import Link from 'next/link'
import MobileNav from './components/MobileNav'
import Navigation from './components/Navigation'

export const metadata = {
  title: 'White Minecraft - Моды для Minecraft',
  description: 'Удобный поиск и скачивание модов, плагинов, шейдеров для Minecraft на русском языке',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="transition-colors duration-300">
        <nav className="bg-modrinth-darker border-b border-gray-800 sticky top-0 z-30 backdrop-blur-lg bg-opacity-95 shadow-lg">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0 relative">
                <img 
                  src="/icon.png" 
                  alt="Logo" 
                  draggable="false"
                  className="w-8 h-8 md:w-9 md:h-9 object-contain drop-shadow-[0_0_8px_rgba(26,230,109,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_12px_rgba(26,230,109,0.7)] select-none pointer-events-none"
                />
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-modrinth-green to-green-400 bg-clip-text text-transparent hidden sm:block group-hover:from-green-400 group-hover:to-modrinth-green transition-all select-none">ModrinthProxy</span>
                
                <div className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-[2px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50 select-none">
                  <div className="relative select-none">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-gray-800 select-none"></div>
                    <div className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs whitespace-nowrap shadow-xl border border-gray-700 select-none">
                      <div className="flex items-center gap-1.5 select-none">
                        <svg className="w-3.5 h-3.5 text-modrinth-green animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span className="font-medium select-none">modrinth.white-minecraft.net</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Navigation />
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-4 md:py-8 pb-20 lg:pb-8">
          {children}
        </main>
        <MobileNav />
        <footer className="border-t border-gray-800 mt-8 md:mt-16 mb-20 lg:mb-0 bg-gradient-to-b from-modrinth-darker to-black/50">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold bg-gradient-to-r from-modrinth-green to-green-400 bg-clip-text text-transparent mb-3 select-none">
                  ModrinthProxy
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Удобный поиск и скачивание модификаций для Minecraft. 
                  Современный интерфейс на русском языке.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-3">
                  Открытый код
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  Полностью открытый проект
                </p>
                <a 
                  href="https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 group text-sm font-medium shadow-lg hover:shadow-modrinth-green/20 hover:scale-105"
                >
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Open Source</span>
                </a>
              </div>

              <div className="text-center md:text-right">
                <h3 className="text-lg font-bold text-white mb-3">
                  Поддержка
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Нашли баг? Есть предложения? 
                  <br/>
                  <a href="https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy/issues" target="_blank" rel="noopener noreferrer" className="text-modrinth-green hover:text-green-400 transition-colors font-medium">
                    GitHub Issues
                  </a>
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                <Link href="/bmadnco" className="flex items-center gap-2 text-gray-400 hover:text-modrinth-green text-xs transition-colors group">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">О проекте и как это работает</span>
                </Link>
                
                <div className="h-4 w-px bg-gray-700 hidden md:block"></div>
                
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Все права на Minecraft принадлежат Mojang Studios</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-4 py-2 inline-block bg-gray-900/50 rounded-lg border border-gray-800">
                  NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}


