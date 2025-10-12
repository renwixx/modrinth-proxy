import Link from 'next/link'
import { searchMods, formatDownloads } from '@/lib/modrinth'
import { filterModsList } from '@/lib/contentFilter'
import DatapackSidebarFilters from './DatapackSidebarFilters'
import MobileMenu from './MobileMenu'

export const metadata = {
  title: 'Датапаки для Minecraft - Скачать бесплатно | White Minecraft',
  description: 'Скачать датапаки для Minecraft. Новые механики, миры, приключения. Тысячи датапаков для любой версии Minecraft.',
}

export default async function DatapacksPage({ searchParams }) {
  const query = searchParams.q || '';
  const version = searchParams.v || '';
  const categories = searchParams.c?.split(',').filter(Boolean) || [];
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const facets = [['project_type:datapack']];
  
  if (version) {
    facets.push([`versions:${version}`]);
  }
  
  if (categories.length > 0) {
    facets.push(categories.map(c => `categories:${c}`));
  }

  let data;
  try {
    data = await searchMods({ query, facets, limit, offset });
    data.hits = filterModsList(data.hits);
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
        <DatapackSidebarFilters />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Minecraft датапаки</h1>
              <p className="text-gray-400 text-sm md:text-base">
                {data.total_hits.toLocaleString('ru-RU')} датапаков найдено
              </p>
            </div>
            <form action="/datapacks" method="GET" className="w-full md:flex-1 md:max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Поиск датапаков..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-modrinth-green transition-colors"
                />
              </div>
            </form>
          </div>

      {data.hits.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">Датапаки не найдены</p>
        </div>
      ) : (
        <>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {page > 1 && (
                <Link
                  href={`/datapacks?q=${query}&page=${page - 1}`}
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
                  href={`/datapacks?q=${query}&page=${page + 1}`}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  Вперёд →
                </Link>
              )}
            </div>
          )}

          <div className="space-y-3">
            {data.hits.map((pack) => (
              <Link
                key={pack.project_id}
                href={`/datapacks/${pack.slug}`}
                className="bg-modrinth-dark border border-gray-800 rounded-lg p-3 md:p-4 card-hover flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {pack.icon_url && (
                    <img
                      src={pack.icon_url}
                      alt={pack.title}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0 sm:hidden">
                    <h3 className="text-lg font-bold mb-1 line-clamp-1">{pack.title}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400">📥 {formatDownloads(pack.downloads)}</span>
                      <span className="text-gray-400">❤️ {formatDownloads(pack.follows)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0 w-full sm:w-auto hidden sm:block">
                  <h3 className="text-lg md:text-xl font-bold mb-1">{pack.title}</h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                    {pack.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="text-gray-400 flex items-center gap-1">
                      📥 {formatDownloads(pack.downloads)}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      ❤️ {formatDownloads(pack.follows)}
                    </span>
                    <div className="hidden md:flex flex-wrap gap-1">
                      {pack.categories.slice(0, 3).map((cat) => (
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

                <div className="w-full sm:w-auto flex-shrink-0">
                  <div className="bg-modrinth-green text-black px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-green-400 transition text-center text-sm md:text-base">
                    Скачать
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {page > 1 && (
                <Link
                  href={`/datapacks?q=${query}&page=${page - 1}`}
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
                  href={`/datapacks?q=${query}&page=${page + 1}`}
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

