import { redirect } from 'next/navigation'

export default function ResourcepackVersionsRedirect({ params }) {
  redirect(`/resourcepack/${params.slug}?tab=versions`)
}

