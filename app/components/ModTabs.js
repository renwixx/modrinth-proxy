'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMcVersion, setSelectedMcVersion] = useState('all')
  const [selectedLoader, setSelectedLoader] = useState(initialLoader)
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [showOnlyReleases, setShowOnlyReleases] = useState(true)

  const updateUrl = (tab, loader = selectedLoader) => {
    const params = new URLSearchParams()
    if (tab !== 'description') params.set('tab', tab)
    if (loader !== 'all') params.set('l', loader)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname
    
    router.push(newUrl, { scroll: false })
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    updateUrl(tab)
  }

  const handleLoaderChange = (loader) => {
    setSelectedLoader(loader)
    if (activeTab === 'versions') {
      updateUrl(activeTab, loader)
    }
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

      if (selectedLoader !== 'all') {
        if (!version.loaders.includes(selectedLoader)) return false
      }

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
          Изменения
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
            <div className="space-y-3 md:space-y-4 mb-6">
             
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

              <div className="flex flex-wrap gap-2 md:gap-3 text-sm md:text-base">
                
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
              <div>
                {filteredVersions.map((version, index) => {
                  const primaryFile = version.files.find(f => f.primary) || version.files[0]
                  const versionTypeColor = version.version_type === 'release' ? 'bg-green-900 text-green-300' :
                                          version.version_type === 'beta' ? 'bg-yellow-900 text-yellow-300' :
                                          'bg-red-900 text-red-300'
                  
                  return (
                    <div key={version.id}>
                      <div className="group relative">
                        <Link 
                          href={`${pathname}/version/${encodeURIComponent(version.version_number)}`}
                          className="absolute before:absolute before:inset-0 before:transition-all before:content-[''] hover:before:backdrop-brightness-110"
                          style={{ inset: 'calc(-1rem - 2px) -2rem' }}
                        />
                      
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${versionTypeColor}`}>
                          {version.version_type[0].toUpperCase()}
                        </div>

                        <div className="relative z-10 pointer-events-none flex-1 min-w-0">
                          <div className="font-bold text-sm group-hover:underline">{version.version_number || version.name}</div>
                          <div className="text-xs font-medium text-gray-400">{version.name}</div>
                        </div>

                        <div className="relative z-10 flex flex-wrap gap-1.5 items-center">
                          {version.game_versions.slice(0, 1).map((v) => (
                            <span 
                              key={v}
                              className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-semibold hover:underline cursor-pointer"
                            >
                              {v}
                            </span>
                          ))}
                          {version.loaders.map((loader) => (
                            <span 
                              key={loader}
                              className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-semibold hover:underline cursor-pointer capitalize inline-flex items-center gap-1"
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

                        <div className="relative z-10 pointer-events-none flex items-center gap-3 text-xs text-gray-400 font-medium">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2" />
                            </svg>
                            {(() => {
                              const date = new Date(version.date_published)
                              const now = new Date()
                              const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
                              const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
                              
                              if (diffHours < 1) return 'just now'
                              if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
                              if (diffDays === 1) return 'yesterday'
                              if (diffDays < 7) return `${diffDays} days ago`
                              if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
                              if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
                              return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`
                            })()}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {version.downloads >= 1000 
                              ? `${(version.downloads / 1000).toFixed(1)}k`
                              : version.downloads
                            }
                          </div>
                        </div>

                        {primaryFile && (
                          <a
                            href={primaryFile.url}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-modrinth-green hover:text-black transition-all group/btn"
                            title="Download"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {index < filteredVersions.length - 1 && (
                      <div className="h-px w-full bg-gray-800 my-2" />
                    )}
                  </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
