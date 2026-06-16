import { useEffect, useState } from 'react'

import { fetchPublicStats, formatSocialProofCount } from '#/lib/public-stats'

const AVATAR_COLORS = ['#facc15', '#f9a8d4', '#86efac'] as const
const AVATAR_INITIALS = ['JT', 'AM', 'KR'] as const

export default function SocialProof() {
  const [userCount, setUserCount] = useState<number | null>(null)

  useEffect(() => {
    fetchPublicStats()
      .then((stats) => setUserCount(stats.user_count))
      .catch(() => setUserCount(null))
  }, [])

  if (userCount === null || userCount < 1) {
    return null
  }

  const label = `Join ${formatSocialProofCount(userCount)} traders!`

  return (
    <div className="social-proof" aria-label={label}>
      <div className="social-proof-avatars" aria-hidden="true">
        {AVATAR_INITIALS.map((initials, index) => (
          <span
            key={initials}
            className="social-proof-avatar"
            style={{ backgroundColor: AVATAR_COLORS[index] }}
          >
            {initials}
          </span>
        ))}
      </div>
      <span className="social-proof-label">{label}</span>
    </div>
  )
}
