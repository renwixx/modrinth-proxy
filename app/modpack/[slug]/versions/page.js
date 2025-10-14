import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, getTeamMembers, formatDownloads, formatDate } from '@/lib/modrinth'
import { filterModContent, isProjectBlocked, isOrganizationBlocked } from '@/lib/contentFilter'
import DownloadModal from '@/app/components/DownloadModal'
import MobileDownloadButton from '@/app/components/MobileDownloadButton'
import ModSidebar from '@/app/components/ModSidebar'
import ContentNavigation from '@/app/components/ContentNavigation'
import VersionsList from '@/app/components/VersionsList'

export async function generateMetadata({ params }) {
  try {
    const modpack = await getMod(params.slug)
    return { title: `${modpack.title} - Версии | White Minecraft` }
  } catch {
    return { title: 'Модпак не найден | White Minecraft' }
  }
}

export default async function ModpackVersionsPage({ params, searchParams }) {
  const { slug } = params;
  if (isProjectBlocked(slug)) {
    return <div className="text-center py-16"><Link href="/modpacks" className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold">Вернуться</Link></div>
  }

  const initialLoader = searchParams.l || 'all'

  let modpack, versions, teamMembers;
  try {
    [modpack, versions, teamMembers] = await Promise.all([getMod(slug), getModVersions(slug), getTeamMembers(slug)]);
    modpack = filterModContent(modpack);
    if (isOrganizationBlocked(modpack.organization)) notFound()
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <nav className="text-sm text-gray-400 mb-4 md:mb-6">
        <Link href="/modpacks" className="hover:text-modrinth-green transition-colors">Модпаки</Link>
        <span className="mx-2">/</span>
        <span className="text-white font-semibold">{modpack.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
        <div className="flex gap-4 md:gap-6 flex-1">
          {modpack.icon_url && (<img src={modpack.icon_url} alt={modpack.title} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover" />)}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{modpack.title}</h1>
            <p className="text-gray-400 text-sm md:text-base mb-2">{modpack.description}</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>{formatDownloads(modpack.downloads)} загрузок</span>
              <span>{formatDownloads(modpack.followers)} подписчиков</span>
              <span>Обновлён {formatDate(modpack.updated)}</span>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:flex lg:items-center">
            <div className="hidden lg:block w-full lg:w-auto">
              <DownloadModal mod={modpack} versions={versions} contentType="modpacks" />
            </div>
            
            <div className="lg:hidden flex items-center gap-3 justify-between">
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(modpack.downloads)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(modpack.follows)}</span>
                </div>
              </div>
              
              <MobileDownloadButton />
            </div>
          </div>
        </div>
      </div>

      <ContentNavigation slug={slug} contentType="modpack" versionsCount={versions.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <VersionsList versions={versions} contentType="modpack" slug={slug} initialLoader={initialLoader} />
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <ModSidebar mod={modpack} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

