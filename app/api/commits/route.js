export const revalidate = 1800

export async function GET() {
  try {
    const res = await fetch(
      'https://api.github.com/repos/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy/commits',
      {
        next: { revalidate: 1800 },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    )
    
    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch commits' }, { status: 500 })
    }
    
    const commits = await res.json()
    
    if (!Array.isArray(commits)) {
      return Response.json({ error: 'Invalid response from GitHub' }, { status: 500 })
    }
    
    return Response.json(commits, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
      }
    })
  } catch (error) {
    console.error('Error fetching commits:', error)
    return Response.json({ error: 'Failed to fetch commits' }, { status: 500 })
  }
}

