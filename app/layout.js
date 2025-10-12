import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Modrinth Proxy - Minecraft Mods',
  description: 'Прокси для Modrinth API - поиск и скачивание Minecraft модов',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="transition-colors duration-300">
        <nav className="bg-modrinth-darker border-b border-gray-800 sticky top-0 z-30 backdrop-blur-lg bg-opacity-95 shadow-lg">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-modrinth-green to-green-400 rounded-xl flex items-center justify-center font-bold text-base md:text-lg shadow-lg group-hover:shadow-modrinth-green/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  M
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-modrinth-green to-green-400 bg-clip-text text-transparent hidden sm:block group-hover:from-green-400 group-hover:to-modrinth-green transition-all">Modrinth Proxy</span>
              </Link>
              
              <div className="flex items-center gap-0.5 md:gap-1 flex-1 overflow-x-auto custom-scrollbar pb-1">
                <Link href="/mods" className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-modrinth-green/10 whitespace-nowrap">
                  <span className="text-xs md:text-sm font-semibold text-gray-300 group-hover:text-modrinth-green transition-colors flex items-center gap-1">
                    <span className="hidden sm:inline">⚡</span>
                    <span>Моды</span>
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-modrinth-green to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </Link>
                
                <Link href="/plugins" className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500/10 whitespace-nowrap">
                  <span className="text-xs md:text-sm font-semibold text-gray-300 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    <span className="hidden sm:inline">🎤</span>
                    <span>Плагины</span>
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </Link>
                
                <Link href="/shaders" className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 whitespace-nowrap">
                  <span className="text-xs md:text-sm font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <span className="hidden sm:inline">✨</span>
                    <span>Шейдеры</span>
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </Link>
                
                <Link href="/resourcepacks" className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-500/10 whitespace-nowrap">
                  <span className="text-xs md:text-sm font-semibold text-gray-300 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                    <span className="hidden sm:inline">🎨</span>
                    <span>Ресурспаки</span>
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </Link>
                
                <Link href="/datapacks" className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-orange-500/10 whitespace-nowrap">
                  <span className="text-xs md:text-sm font-semibold text-gray-300 group-hover:text-orange-400 transition-colors flex items-center gap-1">
                    <span className="hidden sm:inline">🏔️</span>
                    <span>Датапаки</span>
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-4 md:py-8">
          {children}
        </main>
        <footer className="border-t border-gray-800 mt-8 md:mt-16">
          <div className="container mx-auto px-4 py-4 md:py-6 text-center text-gray-400 text-xs md:text-sm">
            <p>Данные предоставлены Modrinth API. Этот сайт является только прокси.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

