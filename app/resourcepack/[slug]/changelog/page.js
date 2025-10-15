import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, getTeamMembers, formatDownloads, formatDate } from '@/lib/modrinth'
import { filterModContent, filterTeamMembers, isProjectBlocked, isOrganizationBlocked, filterVersionChangelog } from '@/lib/contentFilter'
import DownloadModal from '@/app/components/DownloadModal'
import MobileDownloadButton from '@/app/components/MobileDownloadButton'
import ModSidebar from '@/app/components/ModSidebar'
import ContentNavigation from '@/app/components/ContentNavigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export async function generateMetadata({ params }) {
  try {
    const pack = await getMod(params.slug)
    return {
      title: `${pack.title} - Изменения | White Minecraft`,
    }
  } catch {
    return { title: 'Ресурспак не найден | White Minecraft' }
  }
}

export default async function ResourcepackChangelogPage({ params }) {
  const { slug } = params;
  if (isProjectBlocked(slug)) {
    return <div className="text-center py-16"><Link href="/resourcepacks" className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold">Вернуться</Link></div>
  }

  let pack, versions, teamMembers;
  try {
    [pack, versions, teamMembers] = await Promise.all([getMod(slug), getModVersions(slug), getTeamMembers(slug)]);
    pack = filterModContent(pack);
    teamMembers = filterTeamMembers(teamMembers);
    if (isOrganizationBlocked(pack.organization)) notFound()
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 md:mb-6 flex items-center gap-2 text-sm flex-wrap">
        <Link href="/resourcepacks" className="text-gray-400 hover:text-modrinth-green transition-colors duration-200 font-medium">Ресурспаки</Link>
        <span className="text-gray-600">/</span>
        <span className="text-white font-semibold truncate">{pack.title}</span>
      </div>

      <div className="border-b pb-4 md:pb-6 mb-6 md:mb-8" style={{ borderBottomColor: '#34363c' }}>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">
          <div className="flex gap-3 md:gap-4 flex-1">
            {pack.icon_url && (<img src={pack.icon_url} alt={pack.title} className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0" />)}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{pack.title}</h1>
              <p className="text-gray-300 mb-3 text-sm md:text-base">{pack.description}</p>
              <div className="hidden lg:flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(pack.downloads)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(pack.followers)}</span>
                </div>
                <div className="hidden sm:flex flex-wrap gap-1.5">
                  {pack.categories.slice(0, 4).map((cat) => (
                    <Link key={cat} href={`/resourcepacks?f=categories:${cat}`} className="px-2 py-0.5 text-xs font-semibold rounded-full hover:underline transition-all" style={{ backgroundColor: '#34363c', color: '#80878f' }}>
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:flex lg:items-center">
            <div className="hidden lg:block w-full lg:w-auto">
              <DownloadModal mod={pack} versions={versions} contentType="resourcepacks" />
            </div>
            
            <div className="lg:hidden flex items-center gap-3 justify-between">
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(pack.downloads)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(pack.followers)}</span>
                </div>
              </div>
              
              <MobileDownloadButton />
            </div>
          </div>
        </div>
      </div>

      <ContentNavigation slug={slug} contentType="resourcepack" versionsCount={versions.length} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="min-w-0">
          <div className="bg-modrinth-dark border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 md:p-6">
              {versions.slice(0, 5).map((version) => (
                <div key={version.id} className="mb-6 pb-6 border-b border-gray-800 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{version.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${version.version_type === 'release' ? 'bg-green-900 text-green-300' : version.version_type === 'beta' ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'}`}>{version.version_type}</span>
                    <span className="text-sm text-gray-500">{formatDate(version.date_published)}</span>
                  </div>
                  <div className="text-gray-300 text-sm prose prose-invert prose-sm max-w-none">
                    {version.changelog ? (<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{filterVersionChangelog(version.changelog)}</ReactMarkdown>) : (<p className="text-gray-500 italic">Нет описания изменений</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-4 lg:self-start">
          <ModSidebar mod={pack} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

