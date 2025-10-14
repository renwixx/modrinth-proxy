import { notFound } from 'next/navigation'
import { getMod, getModVersions, getUser } from '@/lib/modrinth'
import VersionPage from '@/app/components/VersionPage'

export async function generateMetadata({ params }) {
  try {
    const modpack = await getMod(params.slug)
    const versions = await getModVersions(params.slug)
    const version = versions.find(v => v.version_number === decodeURIComponent(params.versionNumber))
    
    if (!version) throw new Error('Version not found')
    
    return {
      title: `${modpack.title} ${version.version_number} - Скачать версию | White Minecraft`,
      description: version.changelog ? version.changelog.slice(0, 150) : `Скачать версию ${version.version_number} модпака ${modpack.title}`,
    }
  } catch {
    return {
      title: 'Версия не найдена | White Minecraft',
      description: 'Запрашиваемая версия не найдена',
    }
  }
}

export default async function ModpackVersionPage({ params }) {
  let modpack, versions, version, author;
  
  try {
    [modpack, versions] = await Promise.all([
      getMod(params.slug),
      getModVersions(params.slug)
    ])
    
    version = versions.find(v => v.version_number === decodeURIComponent(params.versionNumber))
    
    if (!version) {
      notFound()
    }
    
    if (version.author_id) {
      author = await getUser(version.author_id)
    }
  } catch (error) {
    notFound()
  }

  return (
    <VersionPage 
      project={modpack}
      version={version}
      author={author}
      contentType="modpack"
      pluralName="modpacks"
      singularName="modpack"
    />
  )
}

