import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import type { Review } from '#/lib/review-types'
import ReviewCard from '#/components/reviews/ReviewCard'
import Hero from '#/components/marketing/Hero'
import FeaturesSection from '#/components/marketing/FeaturesSection'
import HowItWorks from '#/components/marketing/HowItWorks'
import FinalCta from '#/components/marketing/FinalCta'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    api.reviews(3).then(setReviews).catch(() => {})
  }, [])

  return (
    <main className="marketing-page">
      <div className="page-wrap px-4">
        <Hero />
      </div>
      <FeaturesSection />
      <HowItWorks />
      <section className="marketing-section page-wrap px-4">
        <h2 className="marketing-section-title">Customer reviews</h2>
        <p className="marketing-section-subtitle">What paying subscribers say about the platform.</p>
        {reviews.length ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-[var(--sea-ink-soft)]">
            Reviews from paying customers will appear here.
          </p>
        )}
        <p className="mt-6 text-center">
          <Link to="/reviews" className="text-sm font-semibold text-[var(--lagoon-deep)] no-underline">
            See all reviews →
          </Link>
        </p>
      </section>
      <FinalCta />
    </main>
  )
}
