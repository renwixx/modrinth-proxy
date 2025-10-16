import { BLACKLIST_PROJECTS, BLACKLIST_ORGANIZATIONS, BLACKLIST_PATTERNS } from '@/lib/contentFilter'

export const metadata = {
  title: 'О проекте - ModrinthProxy',
  description: 'Как работает наш сервис и технические детали',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-modrinth-green via-blue-400 to-purple-400 bg-clip-text text-transparent">
            О проекте ModrinthProxy
          </h1>
          <p className="text-xl text-gray-400">
            Технические детали и принципы работы
          </p>
        </div>

        <div className="space-y-8 animate-fade-in-up">
          <section className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-2xl p-8 border border-gray-700 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Что это такое?
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p className="text-lg">
                ModrinthProxy - это современный веб-интерфейс для удобного поиска и скачивания модификаций для Minecraft.
              </p>
              <p>
                Наш сервис работает как <span className="font-semibold text-white">каталог модификаций</span>, предоставляя удобный доступ к информации из открытых источников. 
                Мы не храним файлы модификаций - все ссылки ведут напрямую на <span className="font-semibold text-modrinth-green">официальные источники</span>.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-8 border border-blue-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Как это работает?
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <div className="text-4xl mb-2">1️⃣</div>
                  <h3 className="font-bold text-white mb-2">Запрос</h3>
                  <p className="text-sm">Вы ищете мод на нашем сайте</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <div className="text-4xl mb-2">2️⃣</div>
                  <h3 className="font-bold text-white mb-2">Поиск</h3>
                  <p className="text-sm">Система находит информацию в базах данных</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <div className="text-4xl mb-2">3️⃣</div>
                  <h3 className="font-bold text-white mb-2">Результат</h3>
                  <p className="text-sm">Вы получаете прямую ссылку на официальный файл</p>
                </div>
              </div>
              <p>
                Технически, наш сервис является <span className="font-semibold text-blue-400">промежуточным звеном</span> между пользователем и источниками данных. 
                Мы предоставляем удобный интерфейс на русском языке и применяем фильтрацию контента.
              </p>
              <div className="bg-blue-950/30 border border-blue-700/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-200">
                  <strong>Важно:</strong> Все ссылки на скачивание ведут на серверы авторов модификаций. 
                  Наши серверы не взаимодействуют с файлами - мы только предоставляем информацию.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-8 border border-purple-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Соблюдение законодательства РФ
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Мы стремимся соблюдать действующее законодательство Российской Федерации и применяем меры по фильтрации контента:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Блокировка проектов:</strong> Проекты, содержащие запрещенный контент, 
                    автоматически исключаются из поиска и недоступны для просмотра.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Фильтрация изображений:</strong> Изображения с запрещенной символикой 
                    автоматически заменяются на нейтральные заглушки.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Замена текста:</strong> Запрещенные термины автоматически заменяются 
                    на нейтральные символы в описаниях и названиях.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Блокировка организаций:</strong> Проекты от определенных организаций 
                    могут быть ограничены в доступе.
                  </div>
                </li>
              </ul>

              <div className="mt-8 bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border border-purple-600/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-300 mb-6 text-center">Статистика фильтрации контента</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl p-6 border border-red-600/30 hover:border-red-500/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-red-400 mb-2 animate-pulse-slow">
                        {BLACKLIST_PROJECTS.length}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">Заблокированных</div>
                      <div className="text-lg font-semibold text-white">Проектов</div>
                      <div className="mt-3 pt-3 border-t border-red-800/50">
                        <p className="text-xs text-red-300/80">Моды, плагины и другой контент</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-xl p-6 border border-orange-600/30 hover:border-orange-500/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-400 mb-2 animate-pulse-slow" style={{ animationDelay: '0.2s' }}>
                        {BLACKLIST_ORGANIZATIONS.length}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">Заблокированных</div>
                      <div className="text-lg font-semibold text-white">Организаций</div>
                      <div className="mt-3 pt-3 border-t border-orange-800/50">
                        <p className="text-xs text-orange-300/80">Разработчики с запрещенным контентом</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 rounded-xl p-6 border border-yellow-600/30 hover:border-yellow-500/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-yellow-400 mb-2 animate-pulse-slow" style={{ animationDelay: '0.4s' }}>
                        {BLACKLIST_PATTERNS.length}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">Заблокированных</div>
                      <div className="text-lg font-semibold text-white">Медиафайлов</div>
                      <div className="mt-3 pt-3 border-t border-yellow-800/50">
                        <p className="text-xs text-yellow-300/80">Изображения с запрещенной символикой</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-950/30 border border-purple-700/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-purple-200">
                  Все фильтры работают автоматически на стороне нашего сервера. Мы регулярно обновляем списки 
                  блокировок в соответствии с требованиями законодательства.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-2xl p-8 border border-orange-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Технический стек
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Проект построен с использованием современных веб-технологий:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-400">⚛️</span>
                    Next.js 14
                  </h4>
                  <p className="text-sm">React-фреймворк с серверным рендерингом</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-cyan-400">🎨</span>
                    Tailwind CSS
                  </h4>
                  <p className="text-sm">Современный CSS-фреймворк для UI</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-orange-400">▲</span>
                    Vercel
                  </h4>
                  <p className="text-sm">Глобальная сеть для быстрой загрузки страниц</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-green-400">🔓</span>
                    Open Source
                  </h4>
                  <p className="text-sm">Исходный код доступен на GitHub</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-2xl p-8 border border-red-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Важные уведомления
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <div className="bg-red-950/30 border border-red-700/50 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">⚠️ Официальное уведомление:</p>
                <p className="text-sm text-red-200">
                  Этот сайт НЕ является официальным сервисом Minecraft. 
                  Не одобрен и не связан с Mojang Studios или Microsoft Corporation.
                </p>
              </div>
              <div className="bg-yellow-950/30 border border-yellow-700/50 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">📋 Авторские права:</p>
                <p className="text-sm text-yellow-200">
                  Все модификации и их содержимое принадлежат их соответствующим авторам. 
                  Мы не претендуем на авторство контента и предоставляем только ссылки.
                </p>
              </div>
              <div className="bg-blue-950/30 border border-blue-700/50 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">🔗 Прямые ссылки:</p>
                <p className="text-sm text-blue-200">
                  При нажатии кнопки "Скачать" вы будете перенаправлены на серверы авторов модификаций. 
                  Файлы загружаются напрямую от разработчиков, минуя наши серверы.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-modrinth-green/20 to-green-800/20 rounded-2xl p-8 border border-green-700/50 shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Открытый исходный код</h2>
            <p className="text-gray-300 mb-6">
              Проект полностью открыт и доступен для изучения на GitHub
            </p>
            <a 
              href="https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 group font-medium shadow-lg hover:shadow-modrinth-green/30 hover:scale-105"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>Посмотреть на GitHub</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </section>

          <div className="text-center py-8 text-gray-500 text-sm">
            <p>Если у вас есть вопросы или предложения - создайте Issue на GitHub</p>
          </div>
        </div>
      </div>
    </div>
  )
}


