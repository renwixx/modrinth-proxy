import { redirect } from 'next/navigation'

export default function DatapackVersionsRedirect({ params }) {
  redirect(`/datapack/${params.slug}?tab=versions`)
}

