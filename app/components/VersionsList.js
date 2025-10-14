'use client'

import { useState, useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { compressVersionRanges } from '@/lib/modrinth'
import VersionsDropdown from './VersionsDropdown'
import LoadersDropdown from './LoadersDropdown'
import ChannelsDropdown from './ChannelsDropdown'

export default function VersionsList({ versions, contentType, slug, initialLoader = 'all' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMcVersion, setSelectedMcVersion] = useState('all')
  const [selectedLoaders, setSelectedLoaders] = useState([])
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [showOnlyReleases, setShowOnlyReleases] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const versionsPerPage = 20

  const handleLoadersChange = (newLoaders) => {
    setSelectedLoaders(newLoaders)
    setCurrentPage(1)
  }

  const handleVersionChange = (version) => {
    setSelectedMcVersion(version)
    setCurrentPage(1)
  }

  const handleShowOnlyReleasesChange = (value) => {
    setShowOnlyReleases(value)
    setCurrentPage(1)
  }

  const handleChannelChange = (channel) => {
    setSelectedChannel(channel)
    setCurrentPage(1)
  }

  const mcVersions = useMemo(() => {
    const versionsSet = new Set()
    versions.forEach(v => {
      v.game_versions.forEach(gv => versionsSet.add(gv))
    })
    const sorted = Array.from(versionsSet).sort((a, b) => {
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

  const releaseVersions = useMemo(() => {
    return mcVersions.filter(v => {
      return /^\d+\.\d+(\.\d+)?$/.test(v)
    })
  }, [mcVersions])

  const filteredVersions = useMemo(() => {
    return versions.filter(version => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchName = version.name.toLowerCase().includes(query)
        const matchVersion = version.version_number?.toLowerCase().includes(query)
        if (!matchName && !matchVersion) return false
      }

      if (selectedMcVersion !== 'all') {
        if (!version.game_versions.includes(selectedMcVersion)) return false
      }

      if (showOnlyReleases && selectedMcVersion === 'all') {
        const hasReleaseVersion = version.game_versions.some(v => releaseVersions.includes(v))
        if (!hasReleaseVersion) return false
      }

      if (selectedLoaders.length > 0) {
        const hasSelectedLoader = version.loaders.some(l => selectedLoaders.includes(l))
        if (!hasSelectedLoader) return false
      }

      if (selectedChannel !== 'all') {
        if (version.version_type !== selectedChannel) return false
      }

      return true
    })
  }, [versions, searchQuery, selectedMcVersion, selectedLoaders, selectedChannel, showOnlyReleases, releaseVersions])

  const totalPages = Math.ceil(filteredVersions.length / versionsPerPage)
  const paginatedVersions = filteredVersions.slice(
    (currentPage - 1) * versionsPerPage,
    currentPage * versionsPerPage
  )

  return (
    <div className="bg-modrinth-dark border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-4 mb-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Поиск версий..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded text-sm border border-gray-700 focus:border-modrinth-green focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 text-sm md:text-base">
            <VersionsDropdown 
              versions={showOnlyReleases ? releaseVersions : mcVersions}
              selectedVersion={selectedMcVersion}
              onVersionChange={handleVersionChange}
              showOnlyReleases={showOnlyReleases}
              onShowOnlyReleasesChange={handleShowOnlyReleasesChange}
            />

            {loaders.length > 0 && (
              <LoadersDropdown 
                loaders={loaders}
                selectedLoaders={selectedLoaders}
                onLoadersChange={handleLoadersChange}
              />
            )}

            <ChannelsDropdown 
              selectedChannel={selectedChannel}
              onChannelChange={handleChannelChange}
            />


            <div className="text-sm text-gray-400 flex items-center ml-auto">
              {filteredVersions.length} версий
            </div>
          </div>
        </div>
        
        <div className="hidden sm:grid grid-cols-[40px_minmax(150px,1fr)_minmax(120px,180px)_minmax(100px,150px)_40px] xl:grid-cols-[40px_minmax(150px,1fr)_minmax(100px,200px)_minmax(100px,200px)_minmax(100px,150px)_minmax(80px,100px)_40px] gap-3 px-3 py-2 text-sm font-bold text-gray-300 border-b border-gray-800">
          <div></div>
          <div>Название</div>
          <div className="xl:hidden">Compatibility</div>
          <div className="xl:hidden">Стата</div>
          <div className="hidden xl:block">Версии игры</div>
          <div className="hidden xl:block">Платформы</div>
          <div className="hidden xl:block">Опубликовано</div>
          <div className="hidden xl:block">Загрузок</div>
          <div></div>
        </div>

        {filteredVersions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Версии не найдены</p>
        ) : (
          <>
            <div>
              {paginatedVersions.map((version, index) => {
              const primaryFile = version.files.find(f => f.primary) || version.files[0]
              const versionTypeColor = version.version_type === 'release' ? 'bg-green-900 text-green-300' :
                                      version.version_type === 'beta' ? 'bg-yellow-900 text-yellow-300' :
                                      'bg-red-900 text-red-300'
              
              return (
                <div key={version.id}>
                  <div className="group relative">
                    <Link 
                      href={`/${contentType}/${slug}/version/${encodeURIComponent(version.version_number)}`}
                      className="absolute before:absolute before:inset-0 before:transition-all before:content-[''] hover:before:backdrop-brightness-110"
                      style={{ inset: 'calc(-1rem - 2px) -2rem' }}
                    />
                  
                    <div className="px-3 py-2">
                      <div className="grid grid-cols-[40px_1fr_40px] max-[390px]:flex max-[390px]:flex-col max-[390px]:items-center sm:grid sm:grid-cols-[40px_minmax(150px,1fr)_minmax(120px,180px)_minmax(100px,150px)_40px] xl:grid-cols-[40px_minmax(150px,1fr)_minmax(100px,200px)_minmax(100px,200px)_minmax(100px,150px)_minmax(80px,100px)_40px] gap-3 items-center">
                        <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${versionTypeColor}`}>
                          {version.version_type[0].toUpperCase()}
                        </div>

                        <div className="relative z-10 pointer-events-none min-w-0 max-[390px]:text-center">
                          <div className="font-bold text-sm group-hover:underline">{version.version_number || version.name}</div>
                          <div className="text-xs font-medium text-gray-400 sm:hidden">{version.name}</div>
                          <div className="text-xs font-medium text-gray-400 hidden sm:block xl:hidden">{version.name}</div>
                        </div>

                      <div className="relative z-10 hidden sm:flex xl:hidden flex-wrap gap-1 items-start content-start">
                        {compressVersionRanges(version.game_versions).slice(0, 2).map((range, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                            style={{ backgroundColor: '#34363c', color: '#80878f' }}
                          >
                            {range}
                          </span>
                        ))}
                        {version.loaders.slice(0, 2).map((loader) => (
                          <span 
                            key={loader}
                            className="px-2 py-1 text-xs font-semibold rounded-full capitalize inline-flex items-center gap-1"
                            style={{ backgroundColor: '#34363c', color: '#80878f' }}
                          >
                            {loader}
                          </span>
                        ))}
                      </div>

                      <div className="relative z-10 hidden sm:flex xl:hidden flex-col gap-1 text-xs text-gray-400 font-medium">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2"></path>
                          </svg>
                          {(() => {
                            const date = new Date(version.date_published)
                            const now = new Date()
                            const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
                            const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
                            
                            if (diffHours < 1) return 'только что'
                            if (diffHours < 24) return `${diffHours}ч назад`
                            if (diffDays === 1) return 'вчера'
                            if (diffDays < 7) return `${diffDays}д назад`
                            if (diffDays < 30) return `${Math.floor(diffDays / 7)}нед назад`
                            return `${Math.floor(diffDays / 30)}мес назад`
                          })()}
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {version.downloads >= 1000 
                            ? `${(version.downloads / 1000).toFixed(1)}k`
                            : version.downloads
                          }
                        </div>
                      </div>

                      <div className="relative z-10 hidden xl:flex flex-wrap gap-1 items-start content-start">
                        {compressVersionRanges(version.game_versions).map((range, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                            style={{ backgroundColor: '#34363c', color: '#80878f' }}
                          >
                            {range}
                          </span>
                        ))}
                      </div>

                      <div className="relative z-10 hidden xl:flex flex-wrap gap-1 items-start content-start max-h-20 overflow-hidden">
                        {version.loaders.map((loader) => (
                          <span 
                            key={loader}
                            className="px-2 py-1 text-xs font-semibold rounded-full hover:underline cursor-pointer capitalize inline-flex items-center gap-1"
                            style={{ backgroundColor: '#34363c', color: '#80878f' }}
                          >
                            {loader === 'fabric' && (
                              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                              </svg>
                            )}
                            {loader}
                          </span>
                        ))}
                      </div>

                      <div className="relative z-10 pointer-events-none hidden xl:flex items-center gap-1 text-xs text-gray-400 font-medium">
                        {(() => {
                          const date = new Date(version.date_published)
                          const now = new Date()
                          const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
                          const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
                          
                          if (diffHours < 1) return 'только что'
                          if (diffHours < 24) return `${diffHours} час${diffHours > 1 ? (diffHours < 5 ? 'а' : 'ов') : ''} назад`
                          if (diffDays === 1) return 'вчера'
                          if (diffDays < 7) return `${diffDays} дн${diffDays > 1 ? (diffDays < 5 ? 'я' : 'ей') : 'ь'} назад`
                          if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед назад`
                          if (diffDays < 365) return `${Math.floor(diffDays / 30)} мес назад`
                          return `${Math.floor(diffDays / 365)} год назад`
                        })()}
                      </div>

                      <div className="relative z-10 pointer-events-none hidden xl:flex items-center gap-1 text-xs text-gray-400 font-medium">
                        {version.downloads >= 1000 
                          ? `${(version.downloads / 1000).toFixed(1)}k`
                          : version.downloads
                        }
                      </div>

                        <div className="relative z-10 sm:hidden flex flex-col gap-1 text-xs text-gray-400 font-medium mt-2 max-[390px]:items-center max-[390px]:justify-center min-[391px]:col-span-2">
                          <div className="flex flex-wrap gap-1 max-[390px]:justify-center">
                            {compressVersionRanges(version.game_versions).slice(0, 2).map((range, i) => (
                              <span key={i} className="px-2 py-0.5 text-xs rounded-full whitespace-nowrap" style={{ backgroundColor: '#34363c', color: '#80878f' }}>
                                {range}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1 max-[390px]:justify-center">
                            {version.loaders.slice(0, 3).map((loader) => (
                              <span key={loader} className="px-2 py-0.5 text-xs rounded-full capitalize" style={{ backgroundColor: '#34363c', color: '#80878f' }}>{loader}</span>
                            ))}
                          </div>
                          <div className="flex gap-2 max-[390px]:justify-center">
                            <span>{(() => {
                              const date = new Date(version.date_published)
                              const now = new Date()
                              const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
                              if (diffHours < 24) return `${diffHours}ч назад`
                              const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
                              if (diffDays < 7) return `${diffDays}д назад`
                              return `${Math.floor(diffDays / 7)}нед назад`
                            })()}</span>
                            <span>•</span>
                            <span>{version.downloads >= 1000 ? `${(version.downloads / 1000).toFixed(1)}k` : version.downloads}</span>
                          </div>
                        </div>

                        {primaryFile && (
                          <a
                            href={primaryFile.url}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-modrinth-green hover:text-black transition-all group/btn max-[390px]:mx-auto sm:mx-0"
                            title="Скачать"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {index < paginatedVersions.length - 1 && (
                    <div className="h-px w-full bg-gray-800 my-2" />
                  )}
                </div>
              )
            })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-800">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Назад
                </button>

                <div className="flex items-center gap-2">
                  {currentPage > 2 && (
                    <>
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
                      >
                        1
                      </button>
                      {currentPage > 3 && <span className="text-gray-500">...</span>}
                    </>
                  )}

                  {currentPage > 1 && (
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
                    >
                      {currentPage - 1}
                    </button>
                  )}

                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-modrinth-green text-black font-bold">
                    {currentPage}
                  </div>

                  {currentPage < totalPages && (
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
                    >
                      {currentPage + 1}
                    </button>
                  )}

                  {currentPage < totalPages - 1 && (
                    <>
                      {currentPage < totalPages - 2 && <span className="text-gray-500">...</span>}
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  Вперёд
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}


