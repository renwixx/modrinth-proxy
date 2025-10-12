import { redirect } from 'next/navigation'

export default function ShaderVersionsRedirect({ params }) {
  redirect(`/shader/${params.slug}?tab=versions`)
}

