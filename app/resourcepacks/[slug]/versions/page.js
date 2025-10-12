import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default function VersionsPage({ params, searchParams }) {
  const { slug } = params
  const loader = searchParams.l || ''
  
  const url = loader 
    ? `/resourcepacks/${slug}?tab=versions&l=${loader}`
    : `/resourcepacks/${slug}?tab=versions`
  
  redirect(url)
}

