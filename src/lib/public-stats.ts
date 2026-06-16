const API_BASE = import.meta.env.VITE_RECEIVER_API_URL || 'http://localhost:8000'

export type PublicStats = {
  user_count: number
}

export function formatSocialProofCount(count: number): string {
  if (count >= 1000) {
    const rounded = Math.floor(count / 100) * 100
    return `${rounded.toLocaleString()}+`
  }
  if (count >= 100) {
    const rounded = Math.floor(count / 10) * 10
    return `${rounded.toLocaleString()}+`
  }
  return count.toLocaleString()
}

export async function fetchPublicStats(): Promise<PublicStats> {
  const res = await fetch(`${API_BASE}/v1/stats/public`)
  if (!res.ok) {
    throw new Error('Failed to load stats')
  }
  return res.json() as Promise<PublicStats>
}
