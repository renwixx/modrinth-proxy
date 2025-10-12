import { redirect } from 'next/navigation'

export default function ModVersionsPage({ params, searchParams }) {
  const loader = searchParams.l
  const redirectUrl = loader 
    ? `/mod/${params.slug}?tab=versions&l=${loader}`
    : `/mod/${params.slug}?tab=versions`
  
  redirect(redirectUrl)
}

