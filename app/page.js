import Link from 'next/link'
import AnimatedBackground from './components/AnimatedBackground'
import AnimatedStats from './components/AnimatedStats'

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
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-modrinth-green to-green-400 rounded-3xl flex items-center justify-center text-3xl md:text-4xl font-black text-black shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300 animate-float">
              M
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 animate-fade-in-up animation-delay-200 px-4">
            <span className="bg-gradient-to-r from-modrinth-green via-green-400 to-blue-500 bg-clip-text text-transparent animate-gradient bg-300">
              Modrinth Proxy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 md:mb-4 animate-fade-in-up animation-delay-400 font-light px-4">
            Быстрый доступ к <span className="text-modrinth-green font-semibold">Minecraft модам</span>
          </p>
          
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-in-up animation-delay-600 px-4">
            Прокси для Modrinth API. Все моды, все версии, прямые ссылки на скачивание.
            <br className="hidden md:block"/>Без хранения файлов. Только парсинг API.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 animate-fade-in-up animation-delay-800 px-4">
            <Link 
              href="/mods"
              className="group relative bg-gradient-to-r from-modrinth-green to-green-400 text-black px-8 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-modrinth-green/50 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-modrinth-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Начать поиск
              </span>
            </Link>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-20 animate-fade-in-up animation-delay-1000">
          <div className="group bg-gradient-to-br from-modrinth-dark to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-modrinth-green/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-modrinth-green/20 backdrop-blur-sm">
            <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">⚡</div>
            <div className="text-4xl font-bold text-modrinth-green mb-2">
              <AnimatedStats end={100} suffix="%" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Моментально</h3>
            <p className="text-gray-400">Прямые запросы к API без посредников</p>
          </div>

          <div className="group bg-gradient-to-br from-modrinth-dark to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm">
            <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🔒</div>
            <div className="text-4xl font-bold text-blue-400 mb-2">
              <AnimatedStats end={256} suffix="-bit" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Безопасно</h3>
            <p className="text-gray-400">Все файлы с официального Modrinth CDN</p>
          </div>

          <div className="group bg-gradient-to-br from-modrinth-dark to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 backdrop-blur-sm">
            <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🚀</div>
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
                  Находите любые моды через API Modrinth. Фильтры по версии Minecraft, загрузчику, категориям.
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
              { name: 'Sodium', icon: '⚡', desc: 'Оптимизация рендеринга', color: 'from-yellow-500 to-orange-500', slug: 'sodium', type: 'mods' },
              { name: 'Complementary', icon: '✨', desc: 'Красивые шейдеры', color: 'from-green-500 to-emerald-500', slug: 'complementary-reimagined', type: 'shaders' },
              { name: 'Terralith', icon: '🏔️', desc: '100 новых биомов', color: 'from-blue-500 to-purple-500', slug: 'terralith', type: 'datapacks' },
              { name: 'LuckPerms', icon: '🔐', desc: 'Система прав', color: 'from-cyan-500 to-blue-500', slug: 'luckperms', type: 'plugins' },
              { name: 'Fresh Animations', icon: '🎬', desc: 'Анимированные мобы', color: 'from-amber-500 to-yellow-500', slug: 'fresh-animations', type: 'resourcepacks' },
              { name: 'BSL Shaders', icon: '🌅', desc: 'Яркие и красочные', color: 'from-pink-500 to-rose-500', slug: 'bsl-shaders', type: 'shaders' },
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

          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 md:gap-3 justify-center text-center">
            <Link href="/mods" className="inline-flex items-center justify-center gap-1 text-modrinth-green hover:text-green-400 font-semibold text-xs lg:text-sm group">
              <span>Моды</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/plugins" className="inline-flex items-center justify-center gap-1 text-blue-400 hover:text-blue-300 font-semibold text-xs lg:text-sm group">
              <span>Плагины</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/shaders" className="inline-flex items-center justify-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold text-xs lg:text-sm group">
              <span>Шейдеры</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/resourcepacks" className="inline-flex items-center justify-center gap-1 text-purple-400 hover:text-purple-300 font-semibold text-xs lg:text-sm group">
              <span>Ресурспаки</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/datapacks" className="inline-flex items-center justify-center gap-1 text-orange-400 hover:text-orange-300 font-semibold text-xs lg:text-sm group">
              <span>Датапаки</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="relative bg-gradient-to-r from-modrinth-green/10 to-blue-500/10 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-modrinth-green/20 overflow-hidden animate-fade-in-up animation-delay-2400">
          <div className="absolute inset-0 bg-gradient-to-r from-modrinth-green/5 to-transparent animate-pulse-slow"></div>
          
          <div className="relative text-center">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black mb-4">
              Готовы улучшить свой Minecraft?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8">
              Тысячи модификаций доступны прямо сейчас
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row gap-2 justify-center">
              <Link href="/mods" className="inline-flex items-center justify-center gap-1 md:gap-1.5 bg-modrinth-green text-black px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm lg:text-base hover:bg-green-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Моды</span>
              </Link>
              <Link href="/plugins" className="inline-flex items-center justify-center gap-1 md:gap-1.5 bg-blue-600 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm lg:text-base hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Плагины</span>
              </Link>
              <Link href="/shaders" className="inline-flex items-center justify-center gap-1 md:gap-1.5 bg-cyan-600 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm lg:text-base hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Шейдеры</span>
              </Link>
              <Link href="/resourcepacks" className="inline-flex items-center justify-center gap-1 md:gap-1.5 bg-purple-600 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm lg:text-base hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Ресурспаки</span>
              </Link>
              <Link href="/datapacks" className="inline-flex items-center justify-center gap-1 md:gap-1.5 bg-orange-600 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm lg:text-base hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Датапаки</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
