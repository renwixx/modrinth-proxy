import Link from 'next/link'
import { searchMods, formatDownloads } from '@/lib/modrinth'
import { filterModsList } from '@/lib/contentFilter'
import ShaderSidebarFilters from './ShaderSidebarFilters'
import MobileMenu from './MobileMenu'

export const metadata = {
  title: 'Шейдеры для Minecraft - Скачать бесплатно | White Minecraft',
  description: 'Скачать шейдеры для Minecraft. Iris, OptiFine, Canvas. Реалистичная графика, тени, отражения для любой версии Minecraft.',
}

export default async function ShadersPage({ searchParams }) {
  const query = searchParams.q || '';
  let version = searchParams.v || '';
  let categories = searchParams.c?.split(',').filter(Boolean) || [];
  let features = searchParams.f?.split(',').filter(Boolean) || [];
  const performance = searchParams.p?.split(',').filter(Boolean) || [];
  let loaders = searchParams.l?.split(',').filter(Boolean) || [];
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  if (searchParams.f) {
    const rawFeatures = searchParams.f.split(',');
    const parsedFeatures = [];
    const shadersLoaderSet = ['iris', 'optifine', 'canvas'];
    
    rawFeatures.forEach(item => {
      if (item.includes(':')) {
        const [type, value] = item.split(':');
        if (type === 'categories') {
          if (shadersLoaderSet.includes(value.toLowerCase())) {
            if (!loaders.includes(value)) loaders.push(value);
          } else {
            if (!categories.includes(value)) categories.push(value);
          }
        } else if (type === 'versions' && !version) {
          version = value;
        }
      } else {
        parsedFeatures.push(item);
      }
    });
    
    features = parsedFeatures;
  }

  const facets = [['project_type:shader']];
  
  if (version) {
    facets.push([`versions:${version}`]);
  }
  
  if (categories.length > 0) {
    facets.push(categories.map(c => `categories:${c}`));
  }
  
  if (features.length > 0) {
    facets.push(features.map(f => `categories:${f}`));
  }
  
  if (performance.length > 0) {
    facets.push(performance.map(p => `categories:${p}`));
  }
  
  if (loaders.length > 0) {
    facets.push(loaders.map(l => `categories:${l}`));
  }

  let data, blockedCount = 0;
  try {
    data = await searchMods({ query, facets, limit, offset });
    const filtered = filterModsList(data.hits);
    data.hits = filtered.hits;
    blockedCount = filtered.blockedCount;
  } catch (error) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Ошибка</h1>
        <p className="text-gray-400">{error.message}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total_hits / limit);

  return (
    <>
      <MobileMenu />
      <div className="flex gap-6">
        <ShaderSidebarFilters />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Minecraft шейдеры</h1>
              <p className="text-gray-400 text-sm md:text-base">
                {data.total_hits.toLocaleString('ru-RU')} шейдеров найдено
                {blockedCount > 0 && (
                  <span className="text-red-400 ml-2">
                    (из них {blockedCount} заблокировано по требованиям РКН)
                  </span>
                )}
              </p>
            </div>
            <form action="/shaders" method="GET" className="w-full md:flex-1 md:max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Поиск шейдеров..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-modrinth-green transition-colors"
                />
              </div>
            </form>
          </div>

      {data.hits.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">Шейдеры не найдены</p>
        </div>
      ) : (
        <>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {page > 1 && (
                <Link
                  href={`/shaders?q=${query}&page=${page - 1}`}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  ← Назад
                </Link>
              )}
              
              <span className="px-4 py-2 bg-modrinth-dark border border-modrinth-green rounded-lg">
                {page} / {totalPages}
              </span>

              {page < totalPages && (
                <Link
                  href={`/shaders?q=${query}&page=${page + 1}`}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  Вперёд →
                </Link>
              )}
            </div>
          )}

          <div className="space-y-3">
            {data.hits.map((shader) => (
              <Link
                key={shader.project_id}
                href={`/shader/${shader.slug}`}
                className="bg-modrinth-dark border border-gray-800 rounded-lg p-3 md:p-4 card-hover flex items-start gap-3 md:gap-4"
              >
                {shader.icon_url && (
                  <img
                    src={shader.icon_url}
                    alt={shader.title}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-lg md:text-xl font-bold">{shader.title}</h3>
                    <span className="text-xs text-gray-500">от {shader.author}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {shader.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {formatDownloads(shader.downloads)}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {formatDownloads(shader.follows)}
                    </span>
                    <div className="hidden md:flex flex-wrap gap-1">
                      {shader.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-0.5 bg-gray-800 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {page > 1 && (
                <Link
                  href={`/shaders?q=${query}&page=${page - 1}`}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  ← Назад
                </Link>
              )}
              
              <span className="px-4 py-2 bg-modrinth-dark border border-modrinth-green rounded-lg">
                {page} / {totalPages}
              </span>

              {page < totalPages && (
                <Link
                  href={`/shaders?q=${query}&page=${page + 1}`}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  Вперёд →
                </Link>
              )}
            </div>
          )}
        </>
      )}
        </div>
      </div>
    </>
  )
}


