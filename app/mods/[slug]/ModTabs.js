'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { formatDate } from '@/lib/modrinth'
import { filterVersionChangelog } from '@/lib/contentFilter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function ModTabs({ mod, versions, initialTab = 'description', initialLoader = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Фильтры для версий
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMcVersion, setSelectedMcVersion] = useState('all')
  const [selectedLoader, setSelectedLoader] = useState(initialLoader)
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [showOnlyReleases, setShowOnlyReleases] = useState(true)

  // Функция для обновления URL
  const updateUrl = (tab, loader = selectedLoader) => {
    const params = new URLSearchParams()
    if (tab !== 'description') params.set('tab', tab)
    if (loader !== 'all') params.set('l', loader)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname
    
    router.push(newUrl, { scroll: false })
  }

  // Обработчик смены таба
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    updateUrl(tab)
  }

  // Обработчик смены загрузчика
  const handleLoaderChange = (loader) => {
    setSelectedLoader(loader)
    if (activeTab === 'versions') {
      updateUrl(activeTab, loader)
    }
  }

  // Получаем уникальные версии Minecraft и загрузчики из ВЕРСИЙ, не из мода
  const mcVersions = useMemo(() => {
    const versionsSet = new Set()
    versions.forEach(v => {
      v.game_versions.forEach(gv => versionsSet.add(gv))
    })
    // Сортируем версии
    const sorted = Array.from(versionsSet).sort((a, b) => {
      // Версии с цифрами впереди
      const aNum = parseFloat(a.match(/[\d.]+/)?.[0] || '0')
      const bNum = parseFloat(b.match(/[\d.]+/)?.[0] || '0')
      return bNum - aNum
    })
    return sorted
  }, [versions])

  const loaders = useMemo(() => {
    const loadersSet = new Set()
    versions.forEach(v => {
      v.loaders.forEach(l => loadersSet.add(l))
    })
    return Array.from(loadersSet)
  }, [versions])

  // Релизные версии Minecraft (без snapshots, pre, rc)
  const releaseVersions = useMemo(() => {
    return mcVersions.filter(v => {
      // Релиз если формат типа 1.21.1, 1.20, 1.19.4 и т.д.
      return /^\d+\.\d+(\.\d+)?$/.test(v)
    })
  }, [mcVersions])

  // Фильтрация версий
  const filteredVersions = useMemo(() => {
    return versions.filter(version => {
      // Поиск
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchName = version.name.toLowerCase().includes(query)
        const matchVersion = version.version_number?.toLowerCase().includes(query)
        if (!matchName && !matchVersion) return false
      }

      // Фильтр по MC версии
      if (selectedMcVersion !== 'all') {
        if (!version.game_versions.includes(selectedMcVersion)) return false
      }

      // Фильтр "только релизы MC"
      if (showOnlyReleases && selectedMcVersion === 'all') {
        const hasReleaseVersion = version.game_versions.some(v => releaseVersions.includes(v))
        if (!hasReleaseVersion) return false
      }

      // Фильтр по загрузчику
      if (selectedLoader !== 'all') {
        if (!version.loaders.includes(selectedLoader)) return false
      }

      // Фильтр по каналу (Release/Beta/Alpha)
      if (selectedChannel !== 'all') {
        if (version.version_type !== selectedChannel) return false
      }

      return true
    })
  }, [versions, searchQuery, selectedMcVersion, selectedLoader, selectedChannel, showOnlyReleases, releaseVersions])

  return (
    <div className="bg-modrinth-dark border border-gray-800 rounded-lg overflow-hidden">
      <div className="flex border-b border-gray-800 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => handleTabChange('description')}
          className={`px-4 md:px-6 py-2 md:py-3 font-semibold transition text-sm md:text-base whitespace-nowrap ${
            activeTab === 'description'
              ? 'bg-gray-800 text-modrinth-green border-b-2 border-modrinth-green'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          Описание
        </button>
        <button
          onClick={() => handleTabChange('changelog')}
          className={`px-4 md:px-6 py-2 md:py-3 font-semibold transition text-sm md:text-base whitespace-nowrap ${
            activeTab === 'changelog'
              ? 'bg-gray-800 text-modrinth-green border-b-2 border-modrinth-green'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          Changelog
        </button>
        <button
          onClick={() => handleTabChange('versions')}
          data-tab="versions"
          className={`px-4 md:px-6 py-2 md:py-3 font-semibold transition text-sm md:text-base whitespace-nowrap ${
            activeTab === 'versions'
              ? 'bg-gray-800 text-modrinth-green border-b-2 border-modrinth-green'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          Версии ({versions.length})
        </button>
      </div>

      <div className="p-4 md:p-6">
        {activeTab === 'description' && (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {mod.body}
            </ReactMarkdown>
          </div>
        )}

        {activeTab === 'changelog' && (
          <div>
            {versions.slice(0, 5).map((version) => (
              <div key={version.id} className="mb-6 pb-6 border-b border-gray-800 last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{version.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    version.version_type === 'release' ? 'bg-green-900 text-green-300' :
                    version.version_type === 'beta' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {version.version_type}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(version.date_published)}</span>
                </div>
                <div className="text-gray-300 text-sm prose prose-invert prose-sm max-w-none">
                  {version.changelog ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {filterVersionChangelog(version.changelog)}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-gray-500 italic">Нет описания изменений</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'versions' && (
          <div>
            <div className="space-y-3 md:space-y-4 mb-6 pb-4 border-b border-gray-800">
              {/* Поиск */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded text-sm border border-gray-700 focus:border-modrinth-green focus:outline-none"
                />
              </div>

              {/* Фильтры в ряд */}
              <div className="flex flex-wrap gap-2 md:gap-3 text-sm md:text-base">
                {/* Dropdown для MC версий */}
                <div className="relative">
                  <select
                    value={selectedMcVersion}
                    onChange={(e) => setSelectedMcVersion(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 pr-8 rounded text-sm border border-gray-700 focus:border-modrinth-green focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All MC versions</option>
                    {(showOnlyReleases ? releaseVersions : mcVersions).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Кнопка "Show all versions" */}
                <button
                  onClick={() => setShowOnlyReleases(!showOnlyReleases)}
                  className={`px-3 py-2 rounded text-sm border transition ${
                    showOnlyReleases
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-modrinth-green'
                      : 'bg-modrinth-green/10 border-modrinth-green text-modrinth-green'
                  }`}
                >
                  {showOnlyReleases ? 'Show all versions' : 'Showing all versions'}
                </button>

                {/* Channels (Release/Beta/Alpha) */}
                <div className="flex gap-1 bg-gray-800 rounded p-1">
                  <button
                    onClick={() => setSelectedChannel('all')}
                    className={`px-3 py-1 rounded text-sm transition ${
                      selectedChannel === 'all'
                        ? 'bg-modrinth-green text-black font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedChannel('release')}
                    className={`px-3 py-1 rounded text-sm transition ${
                      selectedChannel === 'release'
                        ? 'bg-green-600 text-white font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Release
                  </button>
                  <button
                    onClick={() => setSelectedChannel('beta')}
                    className={`px-3 py-1 rounded text-sm transition ${
                      selectedChannel === 'beta'
                        ? 'bg-yellow-600 text-white font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Beta
                  </button>
                  <button
                    onClick={() => setSelectedChannel('alpha')}
                    className={`px-3 py-1 rounded text-sm transition ${
                      selectedChannel === 'alpha'
                        ? 'bg-red-600 text-white font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Alpha
                  </button>
                </div>

                {/* Загрузчики */}
                {loaders.length > 1 && (
                  <div className="flex gap-1 bg-gray-800 rounded p-1">
                    <button
                      onClick={() => handleLoaderChange('all')}
                      className={`px-3 py-1 rounded text-sm transition capitalize ${
                        selectedLoader === 'all'
                          ? 'bg-modrinth-green text-black font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    {loaders.map(loader => (
                      <button
                        key={loader}
                        onClick={() => handleLoaderChange(loader)}
                        className={`px-3 py-1 rounded text-sm transition capitalize ${
                          selectedLoader === loader
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {loader}
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-sm text-gray-400 flex items-center ml-auto">
                  {filteredVersions.length} versions
                </div>
              </div>
            </div>
            
            {filteredVersions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No versions found</p>
            ) : (
              <div className="space-y-2">
                {filteredVersions.map((version) => (
                  <div
                    key={version.id}
                    className="border border-gray-700 rounded-lg p-3 hover:border-modrinth-green transition flex items-center gap-3"
                  >
                    {/* Иконка канала (R/B/A) */}
                    <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      version.version_type === 'release' ? 'bg-green-900 text-green-300' :
                      version.version_type === 'beta' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {version.version_type[0].toUpperCase()}
                    </div>

                    {/* Инфо о версии */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <h3 className="font-semibold text-sm">{version.version_number || version.name}</h3>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{version.name}</div>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {version.game_versions.slice(0, 1).map((v) => (
                          <span key={v} className="text-gray-400">{v}</span>
                        ))}
                        {version.loaders.map((loader) => (
                          <span key={loader} className="text-gray-400 capitalize">{loader}</span>
                        ))}
                      </div>
                    </div>

                    {/* Дата и скачивания */}
                    <div className="text-right flex-shrink-0 mr-3">
                      <div className="text-xs text-gray-500 mb-0.5">
                        {(() => {
                          const date = new Date(version.date_published)
                          const now = new Date()
                          const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
                          
                          if (diffDays === 0) return 'today'
                          if (diffDays === 1) return 'yesterday'
                          if (diffDays < 7) return `${diffDays} days ago`
                          if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
                          if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
                          return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`
                        })()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {version.downloads >= 1000 
                          ? `${(version.downloads / 1000).toFixed(1)}k`
                          : version.downloads
                        }
                      </div>
                    </div>

                    {/* Кнопка скачивания */}
                    {version.files.map((file) => (
                      <a
                        key={file.hashes.sha1}
                        href={file.url}
                        download
                        className="group relative flex-shrink-0"
                      >
                        <div className="bg-modrinth-green text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span className="text-sm">Download</span>
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
