// Функции для работы с Modrinth API v2
const MODRINTH_API = 'https://api.modrinth.com/v2';

/**
 * Поиск модов с фильтрами
 */
export async function searchMods({ query = '', facets = [], limit = 20, offset = 0, index }) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (query) {
    params.append('query', query);
  }

  // Facets для фильтрации (например, только моды для Fabric)
  if (facets.length > 0) {
    params.append('facets', JSON.stringify(facets));
  }

  if (index && index !== 'relevance') {
    params.append('index', index);
  }

  const url = `${MODRINTH_API}/search?${params}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ModrinthProxyExample/1.0',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Modrinth API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Modrinth API fetch error:', error);
    
    const retryResponse = await fetch(url, {
      headers: {
        'User-Agent': 'ModrinthProxyExample/1.0',
      },
      next: { revalidate: 300 },
    });

    if (!retryResponse.ok) {
      throw new Error(`Modrinth API error: ${retryResponse.status}`);
    }

    return retryResponse.json();
  }
}

/**
 * Получить информацию о конкретном моде по slug или ID
 */
export async function getMod(slugOrId) {
  const response = await fetch(`${MODRINTH_API}/project/${slugOrId}`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Mod not found: ${response.status}`);
  }

  return response.json();
}

/**
 * Получить версии мода (файлы для скачивания)
 */
export async function getModVersions(slugOrId) {
  const response = await fetch(`${MODRINTH_API}/project/${slugOrId}/version`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Versions not found: ${response.status}`);
  }

  return response.json();
}

/**
 * Получить категории/фасеты
 */
export async function getCategories() {
  const response = await fetch(`${MODRINTH_API}/tag/category`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Categories not found: ${response.status}`);
  }

  return response.json();
}

/**
 * Получить команду проекта (создателей)
 */
export async function getTeamMembers(projectId) {
  const response = await fetch(`${MODRINTH_API}/project/${projectId}/members`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

/**
 * Форматировать число загрузок
 */
export function formatDownloads(downloads) {
  if (!downloads && downloads !== 0) return '0';
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  }
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}K`;
  }
  return downloads.toString();
}

/**
 * Форматировать дату
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function getVersion(versionId) {
  const response = await fetch(`${MODRINTH_API}/version/${versionId}`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Version not found: ${response.status}`);
  }

  return response.json();
}

export async function getUser(userId) {
  const response = await fetch(`${MODRINTH_API}/user/${userId}`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KiB', 'MiB', 'GiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export function compressVersionRanges(versions) {
  if (!versions || versions.length === 0) return [];
  if (versions.length === 1) return [versions[0]];

  const sortedVersions = [...versions].sort((a, b) => {
    const aParts = a.split('.').map(n => parseInt(n) || 0);
    const bParts = b.split('.').map(n => parseInt(n) || 0);
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const diff = (aParts[i] || 0) - (bParts[i] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  });

  const isConsecutive = (v1, v2) => {
    const p1 = v1.split('.').map(n => parseInt(n) || 0);
    const p2 = v2.split('.').map(n => parseInt(n) || 0);
    
    if (p1[0] !== p2[0]) return false;
    if (p1[1] !== p2[1]) {
      return p1[1] + 1 === p2[1] && (p2[2] || 0) === 0;
    }
    return (p1[2] || 0) + 1 === (p2[2] || 0);
  };

  const groups = [];
  let currentGroup = [sortedVersions[0]];
  
  for (let i = 1; i < sortedVersions.length; i++) {
    if (isConsecutive(sortedVersions[i - 1], sortedVersions[i])) {
      currentGroup.push(sortedVersions[i]);
    } else {
      groups.push(currentGroup);
      currentGroup = [sortedVersions[i]];
    }
  }
  groups.push(currentGroup);

  return groups.map(group => {
    if (group.length === 1) return group[0];
    if (group.length === 2) return `${group[0]}, ${group[1]}`;
    return `${group[0]}–${group[group.length - 1]}`;
  });
}

