import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, getTeamMembers, formatDownloads, formatDate } from '@/lib/modrinth'
import { filterModContent, isProjectBlocked, isOrganizationBlocked, filterVersionChangelog } from '@/lib/contentFilter'
import DownloadModal from '@/app/components/DownloadModal'
import ModSidebar from '@/app/components/ModSidebar'
import ContentNavigation from '@/app/components/ContentNavigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export async function generateMetadata({ params }) {
  try {
    const modpack = await getMod(params.slug)
    return { title: `${modpack.title} - Изменения | White Minecraft` }
  } catch {
    return { title: 'Модпак не найден | White Minecraft' }
  }
}

export default async function ModpackChangelogPage({ params }) {
  const { slug } = params;
  if (isProjectBlocked(slug)) {
    return <div className="text-center py-16"><Link href="/modpacks" className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold">Вернуться</Link></div>
  }

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

          <div className="w-full md:w-auto">
            <DownloadModal mod={modpack} versions={versions} contentType="modpacks" />
          </div>
        </div>
      </div>

      <ContentNavigation slug={slug} contentType="modpack" versionsCount={versions.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
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
          <ModSidebar mod={modpack} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

