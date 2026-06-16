import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import { useSession } from '#/lib/auth-client'
import type { Review } from '#/lib/review-types'
import ReviewForm from '#/components/reviews/ReviewForm'
import ReviewsList from '#/components/reviews/ReviewsList'
import UpgradeBanner from '#/components/UpgradeBanner'

export const Route = createFileRoute('/reviews')({ component: ReviewsPage })

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [myReview, setMyReview] = useState<Review | null>(null)
  const [canTrade, setCanTrade] = useState(false)
  const { data: session } = useSession()
  const loggedIn = Boolean(session?.user)

  async function refresh() {
    const list = await api.reviews()
    setReviews(list)
    if (loggedIn) {
      setMyReview(await api.myReview())
      const billing = await api.billing()
      setCanTrade(billing.can_process_trades)
    }
  }

  useEffect(() => {
    refresh().catch(() => {})
  }, [loggedIn])

  return (
    <main className="page-wrap space-y-8 px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold text-[var(--sea-ink)]">Customer reviews</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--sea-ink-soft)]">
          Real feedback from paying subscribers. Anyone can read reviews; only active customers can leave one.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--sea-ink)]">What customers say</h2>
        <ReviewsList reviews={reviews} />
      </section>

      <section className="max-w-lg">
        {loggedIn && canTrade && <ReviewForm existing={myReview} onSaved={refresh} />}
        {loggedIn && !canTrade && <UpgradeBanner />}
        {!loggedIn && (
          <div className="island-shell rounded-2xl p-5 text-sm text-[var(--sea-ink-soft)]">
            <p className="mb-3">Active subscribers can leave a review.</p>
            <Link to="/login" className="font-semibold text-[var(--lagoon-deep)] no-underline">
              Log in
            </Link>
            {' · '}
            <Link to="/signup" className="font-semibold text-[var(--lagoon-deep)] no-underline">
              Sign up
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
