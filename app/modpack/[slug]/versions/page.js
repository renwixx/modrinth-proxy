import { redirect } from 'next/navigation'

export default function ModpackVersionsRedirect({ params }) {
  redirect(`/modpack/${params.slug}?tab=versions`)
}

