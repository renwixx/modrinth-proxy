import { redirect } from 'next/navigation'

export default function VersionsPage({ params, searchParams }) {
  const { slug } = params
  const loader = searchParams.l || ''
  
  const url = loader 
    ? `/datapacks/${slug}?tab=versions&l=${loader}`
    : `/datapacks/${slug}?tab=versions`
  
  redirect(url)
}

