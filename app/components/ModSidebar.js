'use client'

import Link from 'next/link'

export default function ModSidebar({ mod, teamMembers = [] }) {
  const gameVersions = mod.game_versions || []
  const links = mod.body_url || mod.wiki_url || mod.source_url || mod.discord_url || mod.donation_urls
  
  const versionRanges = groupVersions(gameVersions)
  
  return (
    <div className="space-y-4">
      {gameVersions.length > 0 && (
        <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Совместимость
          </h3>
          <p className="text-xs text-gray-400 mb-2">Minecraft: Java Edition</p>
          <div className="flex flex-wrap gap-1.5">
            {versionRanges.map((version, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors">
                {version}
              </span>
            ))}
          </div>
        </div>
      )}

      {(mod.discord_url || mod.source_url || mod.wiki_url || mod.issues_url || (mod.donation_urls && mod.donation_urls.length > 0)) && (
        <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Ссылки
          </h3>
          <div className="space-y-2">
            {mod.discord_url && (
              <a href={mod.discord_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-300 hover:text-blue-400 transition-colors group">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="group-hover:underline">Сервер Discord</span>
              </a>
            )}
            {mod.donation_urls && mod.donation_urls.map((donation, idx) => (
              <a key={idx} href={donation.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-300 hover:text-green-400 transition-colors group">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="group-hover:underline">{donation.platform}</span>
              </a>
            ))}
            {mod.source_url && (
              <a href={mod.source_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-300 hover:text-purple-400 transition-colors group">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span className="group-hover:underline">Исходный код</span>
              </a>
            )}
            {mod.wiki_url && (
              <a href={mod.wiki_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-300 hover:text-orange-400 transition-colors group">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="group-hover:underline">Wiki</span>
              </a>
            )}
            {mod.issues_url && (
              <a href={mod.issues_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-300 hover:text-red-400 transition-colors group">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="group-hover:underline">Сообщить о проблеме</span>
              </a>
            )}
          </div>
        </div>
      )}

      {teamMembers.length > 0 && (
        <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Создатели
          </h3>
          <div className="space-y-2">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex items-start gap-2">
                {member.user.avatar_url ? (
                  <img 
                    src={member.user.avatar_url} 
                    alt={member.user.username}
                    className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-modrinth-green to-green-400 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {member.user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm text-white font-medium">{member.user.username}</p>
                  <p className="text-xs text-gray-400">{translateRole(member.role)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Детали
        </h3>
        <div className="space-y-2 text-xs">
          {mod.license && mod.license.id && (
            <div>
              <span className="text-gray-400">Лицензия:</span>
              <span className="text-white ml-1 font-medium">{mod.license.id}</span>
            </div>
          )}
          {mod.published && (
            <div>
              <span className="text-gray-400">Опубликован:</span>
              <span className="text-white ml-1">{formatTimeAgo(mod.published)}</span>
            </div>
          )}
          {mod.updated && (
            <div>
              <span className="text-gray-400">Обновлён:</span>
              <span className="text-white ml-1">{formatTimeAgo(mod.updated)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function translateRole(role) {
  const roles = {
    'Owner': 'Владелец',
    'Developer': 'Разработчик',
    'Artist': 'Художник',
    'Maintainer': 'Поддержка',
    'Contributor': 'Участник'
  }
  return roles[role] || role
}

function groupVersions(versions) {
  if (!versions || versions.length === 0) return []
  
  const sorted = versions
    .filter(v => v.match(/^\d+\.\d+/))
    .sort((a, b) => {
      const aParts = a.split('.').map(n => parseInt(n) || 0)
      const bParts = b.split('.').map(n => parseInt(n) || 0)
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        if ((bParts[i] || 0) !== (aParts[i] || 0)) {
          return (bParts[i] || 0) - (aParts[i] || 0)
        }
      }
      return 0
    })

  const ranges = []
  let i = 0
  
  while (i < sorted.length) {
    const current = sorted[i]
    const major = current.split('.')[0]
    const minor = current.split('.')[1]
    
    let rangeEnd = i
    while (rangeEnd + 1 < sorted.length) {
      const next = sorted[rangeEnd + 1]
      const nextMajor = next.split('.')[0]
      const nextMinor = next.split('.')[1]
      
      if (nextMajor === major && Math.abs(parseInt(minor) - parseInt(nextMinor)) <= 1) {
        rangeEnd++
      } else {
        break
      }
    }
    
    if (rangeEnd > i) {
      ranges.push(`${sorted[rangeEnd]}–${current}`)
      i = rangeEnd + 1
    } else {
      ranges.push(current)
      i++
    }
  }
  
  return ranges.slice(0, 15)
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  const intervals = [
    { label: 'год', seconds: 31536000, plural: 'года', many: 'лет' },
    { label: 'месяц', seconds: 2592000, plural: 'месяца', many: 'месяцев' },
    { label: 'неделю', seconds: 604800, plural: 'недели', many: 'недель' },
    { label: 'день', seconds: 86400, plural: 'дня', many: 'дней' },
    { label: 'час', seconds: 3600, plural: 'часа', many: 'часов' },
    { label: 'минуту', seconds: 60, plural: 'минуты', many: 'минут' },
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      const word = count === 1 ? interval.label : 
                   count < 5 ? interval.plural : 
                   interval.many
      return `${count} ${word} назад`
    }
  }
  
  return 'только что'
}


