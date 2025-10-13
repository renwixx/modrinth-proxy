import Link from 'next/link'
import AnimatedBackground from './components/AnimatedBackground'
import AnimatedStats from './components/AnimatedStats'

export const metadata = {
  title: 'White Minecraft - Моды, плагины, шейдеры для Minecraft на русском',
  description: 'Скачать моды, плагины, шейдеры, ресурспаки и датапаки для Minecraft. Удобный каталог на русском языке. Тысячи модификаций для любой версии.',
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Анимированный фон */}
      <AnimatedBackground />
      
      {/* Градиентные пятна */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-modrinth-green/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-20">
        <div className="text-center mb-12 md:mb-20 animate-fade-in-up">
          <div className="mb-6 md:mb-8 inline-block">
            <img 
              src="/icon.png" 
              alt="White Minecraft Logo" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_30px_rgba(26,230,109,0.6)] transform hover:scale-110 hover:rotate-6 transition-all duration-300 animate-float"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 animate-fade-in-up animation-delay-200 px-4">
            <span className="bg-gradient-to-r from-modrinth-green via-green-400 to-blue-500 bg-clip-text text-transparent animate-gradient bg-300">
              Modrinth Proxy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 md:mb-4 animate-fade-in-up animation-delay-400 font-light px-4">
            Весь контент <span className="text-modrinth-green font-semibold">Minecraft</span> в одном месте
          </p>
          
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in-up animation-delay-600 px-4">
            Моды, плагины, шейдеры, ресурспаки, датапаки, модпаки — всё из Modrinth API.
            <br className="hidden md:block"/>Прямые ссылки на скачивание. Без хранения файлов.
          </p>

          {/* Категории контента - ультрасовременные карточки */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-6 md:mb-8 animate-fade-in-up animation-delay-800 px-4">
            {/* Моды */}
            <Link 
              href="/mods"
              className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 hover:border-modrinth-green/50 transition-all duration-700 hover:transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(26,230,109,0.3)] overflow-hidden"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-modrinth-green/0 via-modrinth-green/10 to-modrinth-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-300"></div>
              
              {/* Holographic effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="relative text-center">
                {/* SVG Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M13 3L4 14h7v7l9-11h-7V3z" fill="url(#grad-mods)" className="drop-shadow-[0_0_10px_rgba(26,230,109,0.5)]"/>
                    <defs>
                      <linearGradient id="grad-mods" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1ae66d" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <h3 className="font-bold text-base md:text-lg text-white mb-1 group-hover:text-modrinth-green transition-colors duration-500">Моды</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-500">Модификации</p>
              </div>
            </Link>

            {/* Плагины */}
            <Link 
              href="/plugins"
              className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 hover:border-blue-500/50 transition-all duration-700 hover:transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(59,130,246,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="url(#grad-plugins)" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"/>
                    <defs>
                      <linearGradient id="grad-plugins" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <h3 className="font-bold text-base md:text-lg text-white mb-1 group-hover:text-blue-400 transition-colors duration-500">Плагины</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-500">Серверные</p>
              </div>
            </Link>

            {/* Шейдеры */}
            <Link 
              href="/shaders"
              className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 hover:border-cyan-500/50 transition-all duration-700 hover:transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(6,182,212,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" stroke="url(#grad-shaders)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"/>
                    <defs>
                      <linearGradient id="grad-shaders" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#0891b2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <h3 className="font-bold text-base md:text-lg text-white mb-1 group-hover:text-cyan-400 transition-colors duration-500">Шейдеры</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-500">Графика</p>
              </div>
            </Link>

            {/* Ресурспаки */}
            <Link 
              href="/resourcepacks"
              className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 hover:border-purple-500/50 transition-all duration-700 hover:transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(168,85,247,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="url(#grad-resource)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"/>
                    <defs>
                      <linearGradient id="grad-resource" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <h3 className="font-bold text-base md:text-lg text-white mb-1 group-hover:text-purple-400 transition-colors duration-500">Ресурспаки</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-500">Текстуры</p>
              </div>
            </Link>

            {/* Датапаки */}
            <Link 
              href="/datapacks"
              className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 hover:border-orange-500/50 transition-all duration-700 hover:transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(249,115,22,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" stroke="url(#grad-data)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]"/>
                    <defs>
                      <linearGradient id="grad-data" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <h3 className="font-bold text-base md:text-lg text-white mb-1 group-hover:text-orange-400 transition-colors duration-500">Датапаки</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-500">Механика</p>
              </div>
            </Link>

            {/* Модпаки */}
            <Link 
              href="/modpacks"
              className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 hover:border-red-500/50 transition-all duration-700 hover:transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(239,68,68,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="url(#grad-modpack)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"/>
                    <defs>
                      <linearGradient id="grad-modpack" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <h3 className="font-bold text-base md:text-lg text-white mb-1 group-hover:text-red-400 transition-colors duration-500">Модпаки</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-500">Сборки</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-20 animate-fade-in-up animation-delay-1000">
          <div className="group bg-gradient-to-br from-modrinth-dark to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-modrinth-green/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-modrinth-green/20 backdrop-blur-sm">
            <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">⚡</div>
            <div className="text-4xl font-bold text-modrinth-green mb-2">
              <AnimatedStats end={100} suffix="%" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Моментально</h3>
            <p className="text-gray-400">Прямые запросы к API без посредников</p>
          </div>

          <div className="group bg-gradient-to-br from-modrinth-dark to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm">
            <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">🔒</div>
            <div className="text-4xl font-bold text-blue-400 mb-2">
              <AnimatedStats end={256} suffix="-bit" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Безопасно</h3>
            <p className="text-gray-400">Все файлы с официального Modrinth CDN</p>
          </div>

          <div className="group bg-gradient-to-br from-modrinth-dark to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 backdrop-blur-sm">
            <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">🚀</div>
            <div className="text-4xl font-bold text-purple-400 mb-2">
              <AnimatedStats end={0} suffix=" KB" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Без хранения</h3>
            <p className="text-gray-400">Не качаем файлы, только парсим API</p>
          </div>
        </div>

        {/* Особенности */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20">
          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-modrinth-green/50 transition-all duration-500 hover:transform hover:-translate-y-2 animate-fade-in-left animation-delay-1200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-modrinth-green/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-modrinth-green/30 transition-all duration-300 group-hover:rotate-6">
                <svg className="w-8 h-8 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Мощный поиск</h3>
                <p className="text-gray-400 leading-relaxed">
                  Находите любой контент через API Modrinth. Фильтры по версии Minecraft, загрузчику, категориям.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 animate-fade-in-right animation-delay-1400">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all duration-300 group-hover:rotate-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Прямые ссылки</h3>
                <p className="text-gray-400 leading-relaxed">
                  Все ссылки на скачивание ведут напрямую на Modrinth CDN. Максимальная скорость загрузки.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 animate-fade-in-left animation-delay-1600">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-all duration-300 group-hover:rotate-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Умные фильтры</h3>
                <p className="text-gray-400 leading-relaxed">
                  Фильтрация по версии Minecraft, загрузчику (Fabric/Forge/Quilt), типу релиза. Всё на клиенте.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 animate-fade-in-right animation-delay-1800">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/30 transition-all duration-300 group-hover:rotate-6">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Фильтрация контента</h3>
                <p className="text-gray-400 leading-relaxed">
                  Встроенная система блокировки нежелательного контента. Настраиваемый черный список.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Популярные моды */}
        <div className="animate-fade-in-up animation-delay-2000">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            <span className="bg-gradient-to-r from-modrinth-green to-blue-500 bg-clip-text text-transparent">
              Популярное
            </span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { name: 'Sodium', icon: '⚡', desc: 'Оптимизация рендеринга', color: 'from-yellow-500 to-orange-500', slug: 'sodium', type: 'mod' },
              { name: 'Complementary', icon: '✨', desc: 'Красивые шейдеры', color: 'from-green-500 to-emerald-500', slug: 'complementary-reimagined', type: 'shader' },
              { name: 'Terralith', icon: '🏔️', desc: '100 новых биомов', color: 'from-blue-500 to-purple-500', slug: 'terralith', type: 'datapack' },
              { name: 'LuckPerms', icon: '🔐', desc: 'Система прав', color: 'from-cyan-500 to-blue-500', slug: 'luckperms', type: 'plugin' },
              { name: 'Fresh Animations', icon: '🎬', desc: 'Анимированные мобы', color: 'from-amber-500 to-yellow-500', slug: 'fresh-animations', type: 'resourcepack' },
              { name: 'BSL Shaders', icon: '🌅', desc: 'Яркие и красочные', color: 'from-pink-500 to-rose-500', slug: 'bsl-shaders', type: 'shader' },
            ].map((mod, i) => (
              <Link
                key={mod.slug}
                href={`/${mod.type}/${mod.slug}`}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{ animationDelay: `${2200 + i * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">
                    {mod.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-modrinth-green transition-colors">
                    {mod.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {mod.desc}
                  </p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Призыв к действию - современный */}
        <div className="relative overflow-hidden animate-fade-in-up animation-delay-2400">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-modrinth-green/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,230,109,0.1),transparent_50%)]"></div>
          
          <div className="relative backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-modrinth-green to-blue-400 bg-clip-text text-transparent">
                  Начните своё приключение
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Тысячи модификаций ждут вас. От простых твиков до полного преобразования игры — <span className="text-modrinth-green font-semibold">найдите своё идеальное дополнение</span>
              </p>
            </div>

            {/* Categories Grid - горизонтальные карточки */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/mods" className="group relative bg-gradient-to-br from-modrinth-green/10 to-green-600/5 border border-modrinth-green/20 hover:border-modrinth-green/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-modrinth-green/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-modrinth-green to-green-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-modrinth-green transition-colors">Моды</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Добавьте новые возможности и механики в игру</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-modrinth-green group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/plugins" className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Плагины</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Расширьте функционал вашего сервера</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/shaders" className="group relative bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Шейдеры</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Преобразите графику с реалистичным освещением</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/resourcepacks" className="group relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Ресурспаки</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Измените визуальный стиль и звуки игры</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/datapacks" className="group relative bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">Датапаки</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Добавьте новые рецепты и игровую механику</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/modpacks" className="group relative bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">Модпаки</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Готовые сборки модов для быстрого старта</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Footer text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Все файлы проверены и загружаются напрямую с официального Modrinth CDN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
