const BLACKLIST_PATTERNS = [
  'cdn.modrinth.com/data/AANobbMI/images/af966be7e960742619014059147cad1cdc4e2f2d.png',
  'cdn.modrinth.com/data/74aTv108/images/071b0da4b0956d18fe61c0d1c37f3a92dc3a3f0a.webp'
]

const BLACKLIST_PROJECTS = [
  //mods
  'pride!',
  'pride-moths',
  'pride-furnaces',
  'pride-sheep',
  'pride-fishing-line',
  'pride-tags',
  'pride-year',
  'pride-flags',
  'pride-update',
  'pride-flagpoles',
  'pride-flags-(ashleys-fork)',
  'pride-sheep-',
  'pride-banner-trade',
  'pride-paintings',
  'pride-banners',
  'prideful-animals',
  'pridestrips',
  'pridemarkings',
  'pridepixels',
  'baked-with-pride',
  'autism-pride!',
  'happy-pride-moths!-+-mystics-biomes-compat',
  'allthecolorspridemod',
  'beebuddy',
  'joy',
  'hanas-blahaj',
  'cottagecraft-festive-eggs',
  'p-ride',
  'lgbtqdesignedtimer',
  'decorative-lgbt+-wall-flags',
  'pride-land',
  'pride-craft',
  'all-inclusive-hay-bales',
  //resourcepacks
  'lgbt-slime',
  'lgbtnt',
  'lgbtq+-flags',
  'lgbtq+happy-ghast',
  'pridepack',
  'pridegui',
  'pridegui-legacy',
  'pridebones',
  'pridegui-legacy-light',
  'pridegui-light',
  'prideful',
  'pridepack-legacy',
  'lgbeet',
  'os-pride-bookshelves',
  'gaytopia-server-pack',
  'lesbian-gui-texture-pack+',
  'os-lgbtq+-pride-cats',
  'pride-cb',
  'pride-title',
  'pridemclogo',
  'pride-harnesses',
  'pride-ghast',
  'pridestone-pride',
  'pridesniffer',
  'pridestone-transgender',
  'pridestone-gay',
  'pridestone-bisexual',
  'pridestone-lesbian',
  'pridestone-nonbinary',
  'pridestone-aroace',
  'pridestone-pansexual',
  'pridestone-genderfluid',
  'pridestone-asexual',
  'pridestone-aromantic',
  'pridestone-agender',
  'pridestone-intersex',
  'pridestone-genderqueer',
  'pridestone-demisexual',
  'vivillon-pride-patterns',
  'undopia-pride-bees',
  'undopia-pride-logo',
  'poetic-pride',
  'minimalist-pride-trans',
  'tooltip_transgender+5clr-frame-altbg',
  'rts-pride-bees',
  'minimalist-pride-rainbow',
  'tooltip_lesbian+7clr-full',
  'tooltip_transgender+5clr-full',
  'rainbow-pride-logo',
  'minimalist-pride-nonbinary',
  'tooltip_bisexual+3clr-full',
  'tooltip_pansexual+3clr-full',
  'tooltip_transgender+5clr-frame',
  'tooltip_genderfluid+5clr-full',
  'tooltip_transgender+3clr-full',
  'tooltip_bisexual+3clr-frame-altbg',
  'tooltip_genderfluid+5clr-frame-altbg',
  'tooltip_lesbian+7clr-frame-altbg',
  'tooltip_agender+7clr-frame-altbg',
  'tooltip_asexual+4clr-full',
  'tooltip_lesbian+5clr-full',
  'tooltip_transgender+3clr-frame-altbg',
  'tooltip_pansexual+3clr-frame',
  'tooltip_bigender+7clr-frame-altbg',
  'tooltip_genderqueer+3clr-frame',
  'tooltip_bisexual+3clr-frame',
  'tooltip_lesbian+5clr-frame',
  'tooltip_polysexual+3clr-full',
  'tooltip_transgender+3clr-frame',
  'tooltip_intersex+split-mono-bg-frame',
  'tooltip_agender+7clr-full',
  'tooltip_intersex+mono-frame',
  'tooltip_polyamory+5clr-frame',
  'tooltip_polyamory+5clr-full',
  'tooltip_bigender+7clr-frame',
  'tooltip_genderfluid+5clr-frame',
  'tooltip_genderqueer+3clr-frame-altbg',
  'tooltip_intersex+mono-frame-altbg',
  'tooltip_lesbian+7clr-frame',
  'tooltip_pansexual+3clr-frame-altbg',
  'tooltip_polyamory+5clr-frame-altbg',
  'tooltip_polysexual+3clr-frame',
  'tooltip_polysexual+3clr-frame-altbg',
  'tooltip_genderqueer+3clr-full',
  'tooltip_bigender+7clr-full',
  'tooltip_miaspec+5clr-full',
  'tooltip_lesbian+5clr-frame-altbg',
  'tooltip_fiaspec+5clr-frame',
  'tooltip_aromantic+5clr-full',
  'tooltip_miaspec+5clr-frame-altbg',
  'tooltip_asexual+4clr-frame',
  'tooltip_fiaspec+5clr-full',
  'tooltip_aromantic+5clr-frame-altbg',
  'tooltip_agender+7clr-frame',
  'tooltip_transgender+5clr-full-turned',
  'tooltip_fiaspec+5clr-frame-altbg',
  'tooltip_miaspec+5clr-frame',
  'tooltip_bisexual+3clr-full-turned',
  'tooltip_aromantic+5clr-frame',
  'tooltip_asexual+4clr-frame-altbg',
  'tooltip_lesbian+5clr-frame-altbg-turned',
  'tooltip_lesbian+7clr-full-turned',
  'tooltip_lesbian+7clr-frame-altbg-turned',
  'tooltip_lesbian+7clr-frame-turned',
  'tooltip_agender+7clr-frame-turned',
  'tooltip_transgender+5clr-frame-turned',
  'tooltip_pansexual+3clr-frame-altbg-turned',
  'tooltip_transgender+3clr-frame-turned',
  'tooltip_bisexual+3clr-frame-turned',
  'tooltip_lesbian+5clr-full-turned',
  'tooltip_aromantic+5clr-frame-altbg-turned',
  'tooltip_bisexual+3clr-frame-altbg-turned',
  'tooltip_pansexual+3clr-full-turned',
  'tooltip_genderfluid+5clr-frame-turned',
  'tooltip_bigender+7clr-frame-turned',
  'tooltip_genderqueer+3clr-full-turned',
  'tooltip_aromantic+5clr-frame-turned',
  'tooltip_transgender+3clr-full-turned',
  'tooltip_transgender+5clr-frame-altbg-turned',
  'tooltip_transgender+3clr-frame-altbg-turned',
  'tooltip_polysexual+3clr-frame-altbg-turned',
  'tooltip_bigender+7clr-full-turned',
  'tooltip_polyamory+5clr-frame-altbg-turned',
  'tooltip_miaspec+5clr-frame-altbg-turned',
  'tooltip_asexual+4clr-frame-turned',
  'tooltip_genderqueer+3clr-frame-altbg-turned',
  'tooltip_polysexual+3clr-frame-turned',
  'tooltip_pansexual+3clr-frame-turned',
  'tooltip_miaspec+5clr-frame-turned',
  'tooltip_agender+7clr-frame-altbg-turned',
  'tooltip_polysexual+3clr-full-turned',
  'tooltip_asexual+4clr-full-turned',
  'tooltip_lesbian+5clr-frame-turned',
  'tooltip_polyamory+5clr-frame-turned',
  'tooltip_asexual+4clr-frame-altbg-turned',
  'tooltip_miaspec+5clr-full-turned',
  'tooltip_fiaspec+5clr-frame-turned',
  'tooltip_bigender+7clr-frame-altbg-turned',
  'tooltip_genderfluid+5clr-full-turned',
  'tooltip_genderfluid+5clr-frame-altbg-turned',
  'tooltip_polyamory+5clr-full-turned',
  'tooltip_aromantic+5clr-full-turned',
  'tooltip_fiaspec+5clr-frame-altbg-turned',
  'tooltip_genderqueer+3clr-frame-turned',
  'tooltip_agender+7clr-full-turned',
  'tooltip_fiaspec+5clr-full-turned',
  'cpft',
  'ashen-bumblezone-pride-bees',
  'trans-jian',
  'lesbian-xiphos',
  'blades-of-pride-03-nonbinary-hand-and-a-half',
  'tooltip_gay-mlm+7clr-full',
  'tooltip_gay-mlm+7clr-frame',
  'tooltip_aroace+5clr-frame-altbg',
  'tooltip_aroace+5clr-full',
  'tooltip_aromantic-spectrum+5clr-frame-altbg-turned',
  'tooltip_aromantic-spectrum+5clr-frame',
  'tooltip_asexual-spectrum+4clr-frame-altbg',
  'tooltip_gay-mlm+5clr-frame',
  'tooltip_gay-mlm+7clr-frame-altbg',
  'tooltip_gay-mlm+5clr-frame-altbg',
  'tooltip_gay-mlm+5clr-full',
  'tooltip_aroace+5clr-frame',
  'tooltip_aromantic-spectrum+5clr-frame-altbg',
  'tooltip_asexual-spectrum+4clr-frame',
  'tooltip_asexual-spectrum+4clr-full',
  'tooltip_aromantic-spectrum+5clr-full',
  'tooltip_gay-mlm+7clr-frame-turned',
  'tooltip_gay-mlm+5clr-full-turned',
  'tooltip_gay-mlm+5clr-frame-turned',
  'tooltip_aromantic-spectrum+5clr-full-turned',
  'tooltip_aroace+5clr-full-turned',
  'tooltip_gay-mlm+7clr-frame-altbg-turned',
  'tooltip_gay-mlm+5clr-frame-altbg-turned',
  'tooltip_gay-mlm+7clr-full-turned',
  'tooltip_aroace+5clr-frame-turned',
  'tooltip_asexual-spectrum+4clr-frame-altbg-turned',
  'tooltip_asexual-spectrum+4clr-frame-turned',
  'tooltip_aroace+5clr-frame-altbg-turned',
  'tooltip_aromantic-spectrum+5clr-frame-turned',
  'tooltip_asexual-spectrum+4clr-full-turned',
  'intersex-glow-berries',
  'rainbow-shields',
  'asexual_hearts',
  'trans-hotbar-and-xp-bar',
  'bi-hotbar-and-xp-bar',
  'mlm-hotbar-and-xp-bar',
  'ace-hotbar-and-xp-bar',
  'tooltip_rainbow+7clr-full',
  'tooltip_rainbow+7clr-frame',
  'tooltip_rainbow+7clr-frame-turned',
  'tooltip_rainbow+7clr-full-turned',
  'winters-banner-tweaks',
  'lesbian-pride-logo',
  //datapacks
  'lgbtqia+-flag-banners',
  'lgbtqdesignedtimer',
  'hanas-cobblemon-pride-blahaj',
  'pride-sheep',
  'pride-flag-trails',
  'pride-tandemaus',
  'vivillon-pride-patterns',
  //modpacks
  'pride-monthpack',
  'pride-collaboration-universe-(minimal)',
  'pride-collaboration-universe-(full)',
  'pride-plus',
]

const BLACKLIST_ORGANIZATIONS = [
  'pridecraft',
]

const BLACKLIST_WORDS = [
  'LGBT', 
  'LGBTQIA', 
  'LGBT+', 
  'LGBTQ', 
  'LGBTI', 
  'LGBTQI', 
  'LGBTQ2', 
  'LGBTQ+', 
  'GLBT', 
  'LGBTQIA+',
  'lgbt',
  'pride',
  'rainbow',
]


export function isProjectBlocked(slug) {
  if (!slug) return false
  return BLACKLIST_PROJECTS.includes(slug)
}

export function isOrganizationBlocked(organization) {
  if (!organization) return false
  return BLACKLIST_ORGANIZATIONS.includes(organization)
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

