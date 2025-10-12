'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const MC_VERSIONS = [
  '1.21.10', '1.21.9', '1.21.8', '1.21.7', '1.21.6', '1.21.5', '1.21.4', '1.21.3', '1.21.2', '1.21.1', '1.21',
  '1.20.6', '1.20.5', '1.20.4', '1.20.3', '1.20.2', '1.20.1', '1.20',
  '1.19.4', '1.19.3', '1.19.2', '1.19.1', '1.19',
  '1.18.2', '1.18.1', '1.18',
  '1.17.1', '1.17',
  '1.16.5', '1.16.4', '1.16.3', '1.16.2', '1.16.1', '1.16',
  '1.15.2', '1.15.1', '1.15',
  '1.14.4', '1.14.3', '1.14.2', '1.14.1', '1.14',
  '1.13.2', '1.13.1', '1.13',
  '1.12.2', '1.12.1', '1.12',
  '1.11.2', '1.11.1', '1.11',
  '1.10.2', '1.10.1', '1.10',
  '1.9.4', '1.9.3', '1.9.2', '1.9.1', '1.9',
  '1.8.9', '1.8.8', '1.8.7', '1.8.6', '1.8.5', '1.8.4', '1.8.3', '1.8.2', '1.8.1', '1.8',
  '1.7.10', '1.7.9', '1.7.8', '1.7.7', '1.7.6', '1.7.5', '1.7.4', '1.7.3', '1.7.2',
  '1.6.4', '1.6.2', '1.6.1',
  '1.5.2', '1.5.1',
  '1.4.7', '1.4.6', '1.4.5', '1.4.4', '1.4.2',
  '1.3.2', '1.3.1',
  '1.2.5', '1.2.4', '1.2.3', '1.2.2', '1.2.1',
  '1.1', '1.0'
]

const CATEGORIES = [
  { id: 'cartoon', name: 'Мультяшный' },
  { id: 'cursed', name: 'Проклятый' },
  { id: 'fantasy', name: 'Фэнтези' },
  { id: 'realistic', name: 'Реалистичный' },
  { id: 'semi-realistic', name: 'Полуреалистичный' },
  { id: 'vanilla-like', name: 'Ванильный' },
]

const FEATURES = [
  { id: 'atmosphere', name: 'Атмосфера' },
  { id: 'bloom', name: 'Bloom' },
  { id: 'colored-lighting', name: 'Цветное освещение' },
  { id: 'foliage', name: 'Листва' },
  { id: 'path-tracing', name: 'Path Tracing' },
  { id: 'pbr', name: 'PBR' },
  { id: 'reflections', name: 'Отражения' },
  { id: 'shadows', name: 'Тени' },
]

const PERFORMANCE = [
  { id: 'high', name: 'Высокая нагрузка', color: 'bg-red-600' },
  { id: 'medium', name: 'Средняя нагрузка', color: 'bg-yellow-600' },
  { id: 'low', name: 'Низкая нагрузка', color: 'bg-green-600' },
  { id: 'potato', name: 'Для слабых ПК', color: 'bg-blue-600' },
  { id: 'screenshot', name: 'Для скриншотов', color: 'bg-purple-600' },
]

const LOADERS = [
  { id: 'canvas', name: 'Canvas', color: 'bg-pink-600' },
  { id: 'iris', name: 'Iris', color: 'bg-indigo-600' },
  { id: 'optifine', name: 'OptiFine', color: 'bg-red-600' },
  { id: 'vanilla', name: 'Vanilla', color: 'bg-gray-600' },
]

export default function ShaderSidebarFilters({ onFilterChange, isMobile = false }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedVersion, setSelectedVersion] = useState(searchParams.get('v') || '')
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('c')?.split(',').filter(Boolean) || []
  )
  const [selectedFeatures, setSelectedFeatures] = useState(
    searchParams.get('f')?.split(',').filter(Boolean) || []
  )
  const [selectedPerformance, setSelectedPerformance] = useState(
    searchParams.get('p')?.split(',').filter(Boolean) || []
  )
  const [selectedLoaders, setSelectedLoaders] = useState(
    searchParams.get('l')?.split(',').filter(Boolean) || []
  )

  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams)
    
    if (updates.q !== undefined) {
      if (updates.q) params.set('q', updates.q)
      else params.delete('q')
    }
    
    if (updates.v !== undefined) {
      if (updates.v) params.set('v', updates.v)
      else params.delete('v')
    }
    
    if (updates.c !== undefined) {
      if (updates.c.length > 0) params.set('c', updates.c.join(','))
      else params.delete('c')
    }
    
    if (updates.f !== undefined) {
      if (updates.f.length > 0) params.set('f', updates.f.join(','))
      else params.delete('f')
    }
    
    if (updates.p !== undefined) {
      if (updates.p.length > 0) params.set('p', updates.p.join(','))
      else params.delete('p')
    }
    
    if (updates.l !== undefined) {
      if (updates.l.length > 0) params.set('l', updates.l.join(','))
      else params.delete('l')
    }

    params.delete('page')
    
    router.push(`/shaders?${params.toString()}`)
    onFilterChange?.()
  }

  const toggleCategory = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(newCategories)
    updateFilters({ c: newCategories })
  }

  const toggleFeature = (featureId) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(f => f !== featureId)
      : [...selectedFeatures, featureId]
    setSelectedFeatures(newFeatures)
    updateFilters({ f: newFeatures })
  }

  const togglePerformance = (performanceId) => {
    const newPerformance = selectedPerformance.includes(performanceId)
      ? selectedPerformance.filter(p => p !== performanceId)
      : [...selectedPerformance, performanceId]
    setSelectedPerformance(newPerformance)
    updateFilters({ p: newPerformance })
  }

  const toggleLoader = (loaderId) => {
    const newLoaders = selectedLoaders.includes(loaderId)
      ? selectedLoaders.filter(l => l !== loaderId)
      : [...selectedLoaders, loaderId]
    setSelectedLoaders(newLoaders)
    updateFilters({ l: newLoaders })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateFilters({ q: searchQuery })
  }

  return (
    <div className={isMobile ? "w-full" : "hidden lg:block w-80 flex-shrink-0 sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar"}>
      <div className={isMobile ? "space-y-6" : "bg-modrinth-dark border border-gray-800 rounded-xl p-6 space-y-6"}>
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Версия игры
          </h3>
          <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar pr-2">
            {MC_VERSIONS.map(version => (
              <button
                key={version}
                onClick={() => {
                  const newVersion = selectedVersion === version ? '' : version
                  setSelectedVersion(newVersion)
                  updateFilters({ v: newVersion })
                }}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                  selectedVersion === version
                    ? 'bg-modrinth-green text-black font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {version}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Категории
          </h3>
          <div className="space-y-1.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-modrinth-green text-black font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Особенности
          </h3>
          <div className="space-y-1.5">
            {FEATURES.map(feature => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                  selectedFeatures.includes(feature.id)
                    ? 'bg-modrinth-green text-black font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {feature.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Производительность
          </h3>
          <div className="space-y-2">
            {PERFORMANCE.map(perf => (
              <button
                key={perf.id}
                onClick={() => togglePerformance(perf.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedPerformance.includes(perf.id)
                    ? `${perf.color} text-white shadow-lg`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  selectedPerformance.includes(perf.id) ? 'bg-white' : 'bg-gray-600'
                }`}></div>
                {perf.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            Загрузчик
          </h3>
          <div className="space-y-2">
            {LOADERS.map(loader => (
              <button
                key={loader.id}
                onClick={() => toggleLoader(loader.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedLoaders.includes(loader.id)
                    ? `${loader.color} text-white shadow-lg`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  selectedLoaders.includes(loader.id) ? 'bg-white' : 'bg-gray-600'
                }`}></div>
                {loader.name}
              </button>
            ))}
          </div>
        </div>

        {(selectedVersion || selectedCategories.length > 0 || selectedFeatures.length > 0 || selectedPerformance.length > 0 || selectedLoaders.length > 0 || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedVersion('')
              setSelectedCategories([])
              setSelectedFeatures([])
              setSelectedPerformance([])
              setSelectedLoaders([])
              router.push('/shaders')
            }}
            className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-red-600/30"
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    </div>
  )
}

