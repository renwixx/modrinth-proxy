import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, getTeamMembers, formatDownloads, formatDate } from '@/lib/modrinth'
import { filterModContent, isProjectBlocked, isOrganizationBlocked } from '@/lib/contentFilter'
import ModTabs from '../../components/ModTabs'
import DownloadModal from '../../components/DownloadModal'
import ModSidebar from '../../components/ModSidebar'

export async function generateMetadata({ params }) {
  try {
    const modpack = await getMod(params.slug)
    return {
      title: `${modpack.title} - Скачать модпак для Minecraft | White Minecraft`,
      description: modpack.description || `Скачать ${modpack.title} для Minecraft. ${formatDownloads(modpack.downloads)} загрузок. Поддержка версий: ${modpack.game_versions?.slice(0, 3).join(', ')}.`,
    }
  } catch {
    return {
      title: 'Модпак не найден | White Minecraft',
      description: 'Запрашиваемый модпак не найден',
    }
  }
}

export default async function ModpackPage({ params, searchParams }) {
  const { slug } = params;
  
  if (isProjectBlocked(slug)) {
    return (
      <div className="text-center py-16 max-w-2xl mx-auto">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-3xl font-bold text-red-500 mb-4">Доступ ограничен</h1>
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-6 mb-6 text-left">
            <p className="text-gray-300 mb-3">
              Данный проект недоступен в соответствии с региональными ограничениями и требованиями Роскомнадзора.
            </p>
            <p className="text-gray-400 text-sm">
              К сожалению, некоторые проекты были заблокированы на территории Российской Федерации по решению регулирующих органов. Мы вынуждены ограничить доступ к этому контенту для соблюдения действующего законодательства.
            </p>
          </div>
        </div>
        <Link 
          href="/modpacks"
          className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Вернуться к модпакам</span>
        </Link>
      </div>
    );
  }

  let modpack, versions, teamMembers;
  
  try {
    [modpack, versions, teamMembers] = await Promise.all([
      getMod(slug),
      getModVersions(slug),
      getTeamMembers(slug),
    ]);

    if (isOrganizationBlocked(modpack.organization)) {
      return (
        <div className="text-center py-16 max-w-2xl mx-auto">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-3xl font-bold text-red-500 mb-4">Доступ ограничен</h1>
            <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-6 mb-6 text-left">
              <p className="text-gray-300 mb-3">
                Данный проект недоступен в соответствии с региональными ограничениями и требованиями Роскомнадзора.
              </p>
              <p className="text-gray-400 text-sm">
                К сожалению, некоторые проекты были заблокированы на территории Российской Федерации по решению регулирующих органов. Мы вынуждены ограничить доступ к этому контенту для соблюдения действующего законодательства.
              </p>
            </div>
          </div>
          <Link 
            href="/modpacks"
            className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Вернуться к модпакам</span>
          </Link>
        </div>
      );
    }

    modpack = filterModContent(modpack);
  } catch (error) {
    notFound()
  }

  const initialTab = searchParams.tab || 'description';
  const initialLoader = searchParams.l || 'all';

  return (
    <div className="max-w-7xl mx-auto">
      <nav className="text-sm text-gray-400 mb-4 md:mb-6">
        <Link href="/modpacks" className="hover:text-modrinth-green transition-colors">
          Модпаки
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{modpack.title}</span>
      </nav>

      <div className="border-b pb-4 md:pb-6 mb-6 md:mb-8" style={{ borderBottomColor: '#34363c' }}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <img
            src={modpack.icon_url || '/placeholder.png'}
            alt={modpack.title}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 break-words">{modpack.title}</h1>
            <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">{modpack.description}</p>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                {formatDownloads(modpack.downloads)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {formatDownloads(modpack.follows)}
              </span>
              <span>Обновлён {formatDate(modpack.updated)}</span>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <DownloadModal mod={modpack} versions={versions} contentType="modpacks" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <ModTabs 
            mod={modpack} 
            versions={versions}
            initialTab={initialTab}
            initialLoader={initialLoader}
          />
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <ModSidebar mod={modpack} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}
