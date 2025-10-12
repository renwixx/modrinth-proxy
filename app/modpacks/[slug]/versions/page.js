import { redirect } from 'next/navigation'

export default function ModpackVersionsPage({ params, searchParams }) {
  const loader = searchParams.l
  const redirectUrl = loader 
    ? `/modpacks/${params.slug}?tab=versions&l=${loader}`
    : `/modpacks/${params.slug}?tab=versions`
  
  redirect(redirectUrl)
}

