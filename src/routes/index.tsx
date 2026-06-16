import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import type { Review } from '#/lib/review-types'
import ReviewCard from '#/components/reviews/ReviewCard'
import Hero from '#/components/marketing/Hero'
import FeaturesSection from '#/components/marketing/FeaturesSection'
import HowItWorks from '#/components/marketing/HowItWorks'
import FaqSection from '#/components/marketing/FaqSection'
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
        {reviews.length ? (
          <ul className="review-link-list">
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} compact />
              </li>
            ))}
          </ul>
        ) : (
          <p className="marketing-empty">Reviews from paying customers will appear here.</p>
        )}
        <p className="marketing-section-link">
          <Link to="/reviews">See all reviews →</Link>
        </p>
      </section>
      <FaqSection />
      <FinalCta />
    </main>
  )
}
