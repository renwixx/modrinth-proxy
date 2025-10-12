// Функции для работы с Modrinth API v2
const MODRINTH_API = 'https://api.modrinth.com/v2';

/**
 * Поиск модов с фильтрами
 */
export async function searchMods({ query = '', facets = [], limit = 20, offset = 0 }) {
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

  const response = await fetch(`${MODRINTH_API}/search?${params}`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Modrinth API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Получить информацию о конкретном моде по slug или ID
 */
export async function getMod(slugOrId) {
  const response = await fetch(`${MODRINTH_API}/project/${slugOrId}`, {
    headers: {
      'User-Agent': 'ModrinthProxyExample/1.0',
    },
    cache: 'no-store',
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
    cache: 'no-store',
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
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Categories not found: ${response.status}`);
  }

  return response.json();
}

/**
 * Форматировать число загрузок
 */
export function formatDownloads(downloads) {
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

