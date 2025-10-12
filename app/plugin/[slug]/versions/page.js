import { redirect } from 'next/navigation'

export default function PluginVersionsRedirect({ params }) {
  redirect(`/plugin/${params.slug}?tab=versions`)
}

