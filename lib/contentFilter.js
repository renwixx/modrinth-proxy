const BLACKLIST_PATTERNS = [
  'cdn.modrinth.com/data/AANobbMI/images/af966be7e960742619014059147cad1cdc4e2f2d.png',
]

const BLACKLIST_PROJECTS = [
  'simple-voice-chat',
]

const BLACKLIST_WORDS = [
  'lkasdlasasdasdasd',
]


export function isProjectBlocked(slug) {
  if (!slug) return false
  return BLACKLIST_PROJECTS.includes(slug)
}

export function isUrlBlocked(url) {
  if (!url) return false
  
  return BLACKLIST_PATTERNS.some(pattern => {
    if (typeof pattern === 'string') {
      return url.includes(pattern)
    }
    if (pattern instanceof RegExp) {
      return pattern.test(url)
    }
    return false
  })
}

export function replaceBlockedWords(text) {
  if (!text || !BLACKLIST_WORDS.length) return text
  
  let result = text
  BLACKLIST_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi')
    result = result.replace(regex, '✨')
  })
  
  return result
}


export function convertModrinthUrl(url) {
  if (!url) return url
  
  const modRegex = /https?:\/\/(www\.)?modrinth\.com\/mod\/([^\/\?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?/i
  const modMatch = url.match(modRegex)
  
  if (modMatch) {
    const slug = modMatch[2]
    const path = modMatch[3] || ''
    const query = modMatch[4] || ''
    return `/mods/${slug}${path}${query}`
  }
  
  const pluginRegex = /https?:\/\/(www\.)?modrinth\.com\/plugin\/([^\/\?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?/i
  const pluginMatch = url.match(pluginRegex)
  
  if (pluginMatch) {
    const slug = pluginMatch[2]
    const path = pluginMatch[3] || ''
    const query = pluginMatch[4] || ''
    return `/plugins/${slug}${path}${query}`
  }
  
  const resourcepackRegex = /https?:\/\/(www\.)?modrinth\.com\/resourcepack\/([^\/\?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?/i
  const resourcepackMatch = url.match(resourcepackRegex)
  
  if (resourcepackMatch) {
    const slug = resourcepackMatch[2]
    const path = resourcepackMatch[3] || ''
    const query = resourcepackMatch[4] || ''
    return `/resourcepacks/${slug}${path}${query}`
  }
  
  const datapackRegex = /https?:\/\/(www\.)?modrinth\.com\/datapack\/([^\/\?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?/i
  const datapackMatch = url.match(datapackRegex)
  
  if (datapackMatch) {
    const slug = datapackMatch[2]
    const path = datapackMatch[3] || ''
    const query = datapackMatch[4] || ''
    return `/datapacks/${slug}${path}${query}`
  }
  
  const shaderRegex = /https?:\/\/(www\.)?modrinth\.com\/shader\/([^\/\?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?/i
  const shaderMatch = url.match(shaderRegex)
  
  if (shaderMatch) {
    const slug = shaderMatch[2]
    const path = shaderMatch[3] || ''
    const query = shaderMatch[4] || ''
    return `/shaders/${slug}${path}${query}`
  }
  
  return url
}


export function replaceModrinthLinks(content) {
  if (!content) return content
  
  let filtered = content.replace(/https?:\/\/(www\.)?modrinth\.com\/(mod|plugin|resourcepack|datapack|shader)\/[a-zA-Z0-9_-]+([\/\?#][^\s"'<>)]*)?/gi, 
    (match) => {
      return convertModrinthUrl(match)
    }
  )
  
  return filtered
}


export function filterImages(content) {
  if (!content) return content
  
  let filtered = content.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (match, url) => {
    if (isUrlBlocked(url)) {
      return '<div class="blocked-content">🚫 Контент заблокирован</div>'
    }
    return match
  })
  
  filtered = filtered.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    if (isUrlBlocked(url)) {
      return '_[Изображение заблокировано]_'
    }
    return match
  })
  
  return filtered
}


export function filterModContent(mod) {
  if (!mod) return mod
  
  let body = mod.body
  let description = mod.description
  let title = mod.title
  
  body = replaceModrinthLinks(body)
  description = replaceModrinthLinks(description)
  
  body = filterImages(body)
  description = filterImages(description)
  
  body = replaceBlockedWords(body)
  description = replaceBlockedWords(description)
  title = replaceBlockedWords(title)
  
  return {
    ...mod,
    body,
    description,
    title,
  }
}

export function filterModsList(mods) {
  return mods
    .filter(mod => !isProjectBlocked(mod.slug))
    .map(mod => ({
      ...mod,
      icon_url: isUrlBlocked(mod.icon_url) ? null : mod.icon_url,
      title: replaceBlockedWords(mod.title || ''),
      description: replaceBlockedWords(replaceModrinthLinks(mod.description || '')),
    }))
}


export function filterVersionChangelog(changelog) {
  if (!changelog) return changelog
  
  let filtered = changelog
  
  filtered = replaceModrinthLinks(filtered)
  filtered = filterImages(filtered)
  filtered = replaceBlockedWords(filtered)
  
  return filtered
}

