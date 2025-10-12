import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default function VersionsPage({ params, searchParams }) {
  const { slug } = params
  const loader = searchParams.l || ''
  
  const url = loader 
    ? `/shaders/${slug}?tab=versions&l=${loader}`
    : `/shaders/${slug}?tab=versions`
  
  redirect(url)
}

