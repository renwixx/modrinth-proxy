import { 
	isProjectBlocked as isBlocked,
	isOrganizationBlocked as isOrgBlocked,
	isUrlBlocked as isURLBlocked,
	replaceBlockedWords as replaceWords,
	BLACKLIST_PATTERNS,
	BLACKLIST_PROJECTS,
	BLACKLIST_ORGANIZATIONS,
	BLACKLIST_WORDS
} from './blacklistManager'

export { BLACKLIST_PATTERNS, BLACKLIST_PROJECTS, BLACKLIST_ORGANIZATIONS, BLACKLIST_WORDS }

export function isProjectBlocked(slug) {
  return isBlocked(slug)
}

export function isOrganizationBlocked(organization) {
  return isOrgBlocked(organization)
}

export function isUrlBlocked(url) {
  return isURLBlocked(url)
}

export function replaceBlockedWords(text) {
  return replaceWords(text)
}



export function convertModrinthUrl(url) {
  if (!url) return url
  
  const modRegex = /https?:\/\/(www\.)?modrinth\.com\/mod\/([^\/\?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?/i
  const modMatch = url.match(modRegex)
  
  if (modMatch) {
    const slug = modMatch[2]
    const path = modMatch[3] || ''
    const query = modMatch[4] || ''
    return `/mod/${slug}${path}${query}`
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
  
  const modpackRegex = /https?:\/\/(www\.)?modrinth\.com\/modpack\/([^\/\?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?/i
  const modpackMatch = url.match(modpackRegex)
  
  if (modpackMatch) {
    const slug = modpackMatch[2]
    const path = modpackMatch[3] || ''
    const query = modpackMatch[4] || ''
    return `/modpacks/${slug}${path}${query}`
  }
  
  return url
}


export function replaceModrinthLinks(content) {
  if (!content) return content
  
  let filtered = content.replace(/https?:\/\/(www\.)?modrinth\.com\/(mod|plugin|modpack|resourcepack|datapack|shader)\/[a-zA-Z0-9_-]+([\/\?#][^\s"'<>)]*)?/gi, 
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
      let host
      try { host = new URL(url).hostname } catch (e) { host = url }
      return `<div class="blocked-content inline-flex items-center gap-3 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200 shadow-lg">
  <svg class="w-5 h-5 text-red-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm1 5h-2v6h2V7zm0 8h-2v2h2v-2z"/></svg>
  <span>Изображение с ${host} заблокировано по требованию РКН</span>
</div>`
    }
    return match
  })
  
  filtered = filtered.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    if (isUrlBlocked(url)) {
      let host
      try { host = new URL(url).hostname } catch (e) { host = url }
      return `_[Изображение с ${host} заблокировано по требованию РКН]_`
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
  const originalCount = mods.length
  const filtered = mods
    .filter(mod => !isProjectBlocked(mod.slug))
    .filter(mod => !isOrganizationBlocked(mod.organization))
    .map(mod => ({
      ...mod,
      icon_url: isUrlBlocked(mod.icon_url) ? null : mod.icon_url,
      title: replaceBlockedWords(mod.title || ''),
      description: replaceBlockedWords(replaceModrinthLinks(mod.description || '')),
    }))
  
  return {
    hits: filtered,
    blockedCount: originalCount - filtered.length
  }
}


export function filterVersionChangelog(changelog) {
  if (!changelog) return changelog
  
  let filtered = changelog
  
  filtered = replaceModrinthLinks(filtered)
  filtered = filterImages(filtered)
  filtered = replaceBlockedWords(filtered)
  
  return filtered
}

